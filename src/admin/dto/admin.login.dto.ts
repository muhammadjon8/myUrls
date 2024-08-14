import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({ example: 'hello8', description: 'Amdin Name' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ example: 'qwerty', description: 'Amdin Password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
