import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
// import { User } from './user.entity';

@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @ManyToOne(() => User, (user) => user.urls)
  @JoinColumn({ name: 'user_id' }) // This defines the foreign key column
  user: User; // This defines the relationship to the User entity
}
