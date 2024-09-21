import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { Url } from '../../url/entities/url.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  link: string;

  @Column({ nullable: true })
  refreshToken: string;

  @OneToMany(() => Url, (url) => url.user)
  urls: Url[];
}
