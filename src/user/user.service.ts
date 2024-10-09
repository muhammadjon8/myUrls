import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Res,
  UnauthorizedException,
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
import { CheckValidation } from './dto/checkValidation.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userModelRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  private async getTokens(user: User) {
    const payload = {
      id: user.id,
      username: user.username,
    };

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
      path: "/",
      sameSite: "none",
    });

    return { tokens, message: 'Login successful' };
  }

  async register(createUserDto: CreateUserDto) {
    try {
      const user = await this.userModelRepository.findOne({
        where: { username: createUserDto.username },
      });

      if (user) {
        throw new BadRequestException('User already exists');
      }

      const newUser = this.userModelRepository.create(createUserDto);
      await this.userModelRepository.save(newUser);

      return { message: 'User created successfully' };
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async logout(refreshToken: string, res: Response) {
    try {
      const userData = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      if (!userData) {
        throw new BadRequestException('User not verified');
      }

      const user = await this.userModelRepository.findOne({
        where: { id: userData.id },
      });

      if (!user) {
        throw new BadRequestException('User not found');
      }

      user.refreshToken = null;

      // Hash the refresh token (assuming you have a property `hashed_refresh_token` in your Admin entity)
      const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
      user.refreshToken = hashedRefreshToken;
      await this.userModelRepository.save(user);
      res.clearCookie('refresh_token');

      const response = {
        message: 'User logged out successfully',
      };

      return response;
    } catch (error) {
      throw new BadRequestException('Failed to logout');
    }
  }
  async checkLogin(refreshToken: string): Promise<string> {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      return;
    }
    const user = await this.userModelRepository.findOne({
      where: { id: userData.id },
    });
    if (!user) {
      return;
    }
    return user.username;
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
      // user not found, return the error
      return userModelRepository;
    }
    return this.userModelRepository.remove([userModelRepository]);
  }

  async findByUsername(username: string) {
    try {
      const user = await this.userModelRepository.findOne({
        where: { username: username },
      });
      if (!user) {
        throw new NotFoundException(`user with this Username not found`);
      }
      return user;
    } catch (e) {
      return { error: e.message };
    }
  }

  async checkValidity(
    refreshToken: string,
    username: CheckValidation,
  ): Promise<boolean> {
    try {
      // Verify and decode the refresh token
      const userData = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      if (!userData) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      // Check if the username matches the one in the token
      if (userData.username != username.username) {
        throw new BadRequestException('Username is incorrect');
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException("error: " + error.message);
    }
  }
}
