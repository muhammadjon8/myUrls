import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  full_name: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  email: string;

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

  @ApiProperty({
    description: 'Confirm password for the user account',
    example: 'StrongPassword123',
  })
  confirm_password: string;
}
