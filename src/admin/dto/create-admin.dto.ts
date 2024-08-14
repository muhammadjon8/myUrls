import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'hello8', description: 'Amdin Name' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ example: 'qwerty', description: 'Amdin Password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'qwerty', description: 'Amdin Confirm Password' })
  confirm_password: string;

  @ApiProperty({ example: '+998901006706', description: 'Admin Phone Number' })
  phone: string;
}
