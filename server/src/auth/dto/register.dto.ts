import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'John Doe', description: 'User full name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'suad@gmail.com', description: 'User email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'P@ssword123', description: 'Strong password' })
  @IsString()
  @MinLength(8)
  password: string;
}
