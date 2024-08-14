import { ApiProperty } from '@nestjs/swagger';

export class CreateUrlDto {
  @ApiProperty({
    description: 'The name of the shortened URL',
    example: 'My URL',
  })
  name: string;

  @ApiProperty({
    description: 'The original URL to be shortened',
    example: 'https://example.com',
  })
  url: string;
}
