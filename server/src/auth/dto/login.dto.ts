import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'suad@gmail.com', description: 'User email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'P@ssword123', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
