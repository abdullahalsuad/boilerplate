import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // Register a new user with hashed password
  async register(registerDto: RegisterDto) {
    const { name, email, password } = registerDto;

    // Check if user already exists
    const userExists = await this.prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      // Remove password from returned object
      const { password: _, ...result } = user;
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Error creating user');
    }
  }

  // Authenticate user and return access and refresh tokens
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.is_active) {
      throw new UnauthorizedException('Account is inactive');
    }

    // Generate tokens
    const tokens = await this.getTokens(user.id, user.email, user.role);

    // Update last login
    await this.prisma.user.update({
      where: { id: user.id },
      data: { last_login: new Date() },
    });

    // Save refresh token to database
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      tokens,
    };
  }

  // Revoke all refresh tokens for a user
  async logout(userId: string) {
    await this.prisma.refreshToken.deleteMany({
      where: { user_id: userId },
    });
  }

  // Issue new tokens using a valid refresh token
  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.is_active) {
      throw new UnauthorizedException('Access Denied');
    }

    // Find the refresh token in the database
    const tokenRecord = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!tokenRecord || tokenRecord.expires_at < new Date()) {
      throw new UnauthorizedException('Refresh token invalid or expired');
    }

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  // Store or update refresh token in the database
  private async updateRefreshToken(userId: string, refreshToken: string) {
    // Set expiry
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Default 7 days, should match process.env.JWT_REFRESH_EXPIRATION

    // In a real app, you might want to handle rotation or limit number of tokens
    await this.prisma.refreshToken.upsert({
      where: { token: refreshToken }, // Note: token should be unique in DB
      update: {
        token: refreshToken,
        expires_at: expiresAt,
      },
      create: {
        user_id: userId,
        token: refreshToken,
        expires_at: expiresAt,
      },
    });

    // Cleanup old tokens (optional but recommended)
    await this.prisma.refreshToken.deleteMany({
      where: {
        user_id: userId,
        expires_at: { lt: new Date() },
      },
    });
  }

  // Generate a pair of JWT access and refresh tokens
  private async getTokens(userId: string, email: string, role: string) {
    const payload = {
      sub: userId,
      email,
      role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('jwt.secret'),
        expiresIn: this.configService.get('jwt.expiresIn'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('jwt.refreshSecret'),
        expiresIn: this.configService.get('jwt.refreshExpiresIn'),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) return null;
    const { password, ...result } = user;
    return result;
  }
}
