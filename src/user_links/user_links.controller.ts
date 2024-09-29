import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UserLinksService } from './user_links.service';
import { CreateUserLinkDto } from './dto/create-user_link.dto';
import { UpdateUserLinkDto } from './dto/update-user_link.dto';
import { Cookiegetter } from '../decorators/cookie_getter.decorator';
import { Response } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserLink } from './entities/user_link.entity';

@ApiTags('User Links') // Groups endpoints under 'User Links' in Swagger
@Controller('user-links')
export class UserLinksController {
  constructor(private readonly userLinksService: UserLinksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user link' })
  @ApiResponse({ status: 201, description: 'User link created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(
    @Body() createUserLinkDto: CreateUserLinkDto,
  ) {
    return this.userLinksService.create(createUserLinkDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all user links' })
  @ApiResponse({ status: 200, description: 'Success' })
  findAll() {
    return this.userLinksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve all user links' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'User links not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  findUserLinks(@Param('id') id: string): Promise<UserLink[]> {
    return this.userLinksService.userLinks(+id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific user link by ID' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'User link not found.' })
  findOne(@Param('id') id: string) {
    return this.userLinksService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user link by ID' })
  @ApiResponse({ status: 200, description: 'User link updated successfully.' })
  @ApiResponse({ status: 404, description: 'User link not found.' })
  update(
    @Param('id') id: string,
    @Body() updateUserLinkDto: UpdateUserLinkDto,
  ) {
    return this.userLinksService.update(+id, updateUserLinkDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user link by ID' })
  @ApiResponse({ status: 200, description: 'User link deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User link not found.' })
  remove(@Param('id') id: string) {
    return this.userLinksService.removeUserLink(+id);
  }
}
