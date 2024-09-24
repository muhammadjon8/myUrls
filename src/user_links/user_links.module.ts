import { Module } from '@nestjs/common';
import { UserLinksService } from './user_links.service';
import { UserLinksController } from './user_links.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLink } from './entities/user_link.entity';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserLink, User]), JwtModule.register({})],
  controllers: [UserLinksController],
  providers: [UserLinksService],
})
export class UserLinksModule {}
