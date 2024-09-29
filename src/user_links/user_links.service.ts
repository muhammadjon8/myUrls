import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLink } from './entities/user_link.entity';
import { CreateUserLinkDto } from './dto/create-user_link.dto';
import { UpdateUserLinkDto } from './dto/update-user_link.dto';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class UserLinksService {
  constructor(
    @InjectRepository(UserLink)
    private readonly userLinkRepo: Repository<UserLink>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserLinkDto: CreateUserLinkDto) {
    try {
      const newLink = this.userLinkRepo.create(createUserLinkDto);
      await this.userLinkRepo.save(newLink);
      return { message: 'User link created successfully' };
    } catch (e) {
      return { error: e.message };
    }
  }

  async findAll() {
    return this.userLinkRepo.find();
  }

  async findOne(id: number) {
    try {
      const user_links = await this.userLinkRepo.findOne({
        where: { id },
      });
      if (!user_links) {
        throw new NotFoundException(`user_links with ID ${id} not found`);
      }
      return user_links;
    } catch (e) {
      return { error: e.message };
    }
  }

  async update(id: number, updateUserLinksDto: UpdateUserLinkDto) {
    try {
      await this.userLinkRepo.update({ id }, updateUserLinksDto);
      return this.findOne(id);
    } catch (e) {
      return { error: e.message };
    }
  }

  async removeUserLink(id: number) {
    const userLinkRepo = await this.findOne(id);
    if ('error' in userLinkRepo) {
      // DeliveryOrder not found, return the error
      return userLinkRepo;
    }
    return this.userLinkRepo.remove([userLinkRepo]);
  }

  async userLinks(id: number) {
    try {
      const userLinks = await this.userLinkRepo.find({
        where: { user_id: id },
      });
      console.log(userLinks);

      if (userLinks.length === 0) {
        throw new NotFoundException(`No links found for user with ID ${id}`);
      }

      return userLinks;
    } catch (error) {
      throw new BadRequestException('Error getting user links');
    }
  }
}
