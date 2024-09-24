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

@ApiTags('User Links') // Groups endpoints under 'User Links' in Swagger
@Controller('user-links')
export class UserLinksController {
  constructor(private readonly userLinksService: UserLinksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user link' })
  // @ApiBearerAuth() // Enables JWT Bearer Authentication in Swagger
  @ApiResponse({ status: 201, description: 'User link created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(
    @Body() createUserLinkDto: CreateUserLinkDto,
    @Cookiegetter('refresh_token') refreshToken: string,
  ) {
    return this.userLinksService.create(createUserLinkDto, refreshToken);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all user links' })
  @ApiResponse({ status: 200, description: 'Success' })
  findAll() {
    return this.userLinksService.findAll();
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
    return this.userLinksService.remove(+id);
  }
}
