import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Admin } from './admin/entities/admin.entity';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/entities/admin.entity';
import { UrlModule } from './url/url.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Url } from './url/entities/url.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Admin, User, Url],
      synchronize: true,
      logging: false,
    }),
    AdminModule,
    UserModule,
    UrlModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
