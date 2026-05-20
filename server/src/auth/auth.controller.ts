import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UnauthorizedException,
  Req,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as express from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  async getMe(@Req() req: any) {
    const user = await this.authService.getUserById(req.user.userId);
    return { user };
  }

  private setCookies(res: express.Response, tokens: { accessToken: string; refreshToken: string }) {
    const isProd = process.env.NODE_ENV === 'production';
    
    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000, // 1 hour (matches JWT_ACCESS_EXPIRATION)
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @HttpCode(201)
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    return { user };
  }

  @Post('login')
  @ApiOperation({ summary: 'Authenticate user and get tokens' })
  @ApiResponse({ status: 200, description: 'User successfully logged in' })
  @HttpCode(200)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const result = await this.authService.login(loginDto);
    this.setCookies(res, result.tokens);
    return result; // contains { user, tokens }
  }

  @Post('refresh')
  @HttpCode(200)
  async refresh(
    @Req() req: express.Request,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) throw new UnauthorizedException('No refresh token');

    try {
       // Refresh logic
       throw new UnauthorizedException('Session expired');
    } catch (e) {
       throw new UnauthorizedException('Invalid session');
    }
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Res({ passthrough: true }) res: express.Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return {};
  }
}
