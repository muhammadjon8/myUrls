import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UserLoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { Cookiegetter } from '../decorators/cookie_getter.decorator';
import { CheckValidation } from './dto/checkValidation.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreateUserDto })
  registerUser(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.register(createUserDto);
  }

  @ApiOperation({ summary: 'bu yerda login  qilinadi' })
  @ApiResponse({
    status: 201,
    description: 'The login  created.',
  })
  @Post('login')
  login(
    @Body() loginDto: UserLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.login(loginDto, res);
  }

  @Post('logout')
  logout(
    @Cookiegetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.logout(refreshToken, res);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the user with the given ID.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get('profile/:username')
  @ApiOperation({ summary: 'Retrieve a user by username' })
  @ApiResponse({
    status: 200,
    description: 'Return the user with the given username.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiParam({ name: 'username', type: String, description: 'User username' })
  findUsername(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiBody({ type: UpdateUserDto })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('username')
  checkLogin(@Cookiegetter('refresh_token') refreshToken: string) {
    return this.userService.checkLogin(refreshToken);
  }

  @Post('customize')
  checkValidity(
    @Body() checkValidation: CheckValidation,
    @Cookiegetter('refresh_token') refreshToken: string,
  ) {
    return this.userService.checkValidity(refreshToken, checkValidation);
  }
}
