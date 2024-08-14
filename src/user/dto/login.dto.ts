import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({
    description: 'Username for the user',
    example: 'johndoe',
  })
  username: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'StrongPassword123',
  })
  password: string;
}
