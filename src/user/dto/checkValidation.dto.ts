import { ApiProperty } from '@nestjs/swagger';

export class CheckValidation {
  @ApiProperty({
    description: 'Username for the user',
    example: 'johndoe',
  })
  username: string;
}
