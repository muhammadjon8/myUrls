import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UserLoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userModelRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  private async getTokens(user: User) {
    const payload = { id: user.id };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async login(loginDto: UserLoginDto, @Res() res: Response) {
    const user = await this.userModelRepository.findOne({
      where: { username: loginDto.username },
    });

    if (!user || loginDto.password != user.password) {
      throw new BadRequestException('Invalid credentials');
    }

    const tokens = await this.getTokens(user);

    await this.userModelRepository.update(user.id, {
      refreshToken: tokens.refreshToken,
    });

    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return { tokens, message: 'Login successful' };
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const deliveryOrder = this.userModelRepository.create(createUserDto);
      return this.userModelRepository.save(deliveryOrder);
    } catch (e) {
      return { error: e.message };
    }
  }

  async findAll() {
    return this.userModelRepository.find();
  }

  async findOne(id: number) {
    try {
      const user = await this.userModelRepository.findOne({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException(`user with ID ${id} not found`);
      }
      return user;
    } catch (e) {
      return { error: e.message };
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      await this.userModelRepository.update({ id }, updateUserDto);
      return this.findOne(id);
    } catch (e) {
      return { error: e.message };
    }
  }

  async remove(id: number) {
    const userModelRepository = await this.findOne(id);
    if ('error' in userModelRepository) {
      // DeliveryOrder not found, return the error
      return userModelRepository;
    }
    return this.userModelRepository.remove([userModelRepository]);
  }
}
