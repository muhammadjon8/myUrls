import { PartialType } from '@nestjs/swagger';
import { CreateUserLinkDto } from './create-user_link.dto';

export class UpdateUserLinkDto extends PartialType(CreateUserLinkDto) {}
