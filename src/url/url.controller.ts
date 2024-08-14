import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUrlDto } from './dto/create-url.dto';
import { UrlService } from './url.service';
import { UpdateUrlDto } from './dto/update-url.dto';

@ApiTags('urls') // This will categorize your controller in Swagger UI
@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new shortened URL' })
  @ApiResponse({
    status: 201,
    description: 'The URL has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createUrlDto: CreateUrlDto) {
    return this.urlService.create(createUrlDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all URLs' })
  @ApiResponse({ status: 200, description: 'Return all URLs.' })
  findAll() {
    return this.urlService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific URL by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the URL with the specified ID.',
  })
  @ApiResponse({ status: 404, description: 'URL not found.' })
  findOne(@Param('id') id: string) {
    return this.urlService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a URL by ID' })
  @ApiResponse({
    status: 200,
    description: 'The URL has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'URL not found.' })
  update(@Param('id') id: string, @Body() updateUrlDto: UpdateUrlDto) {
    return this.urlService.update(+id, updateUrlDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a URL by ID' })
  @ApiResponse({
    status: 200,
    description: 'The URL has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'URL not found.' })
  remove(@Param('id') id: string) {
    return this.urlService.remove(+id);
  }
}
