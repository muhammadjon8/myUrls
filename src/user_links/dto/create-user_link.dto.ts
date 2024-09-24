import { ApiProperty } from '@nestjs/swagger';

export class CreateUserLinkDto {
  @ApiProperty({
    example: 'Instagram',
    description: 'URL name',
  })
  url_name: string;

  @ApiProperty({
    example: 'https://instagram.com/realmuhammadjon',
    description: 'URL',
  })
  url_link: string;
}
