import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { UserLink } from '../../user_links/entities/user_link.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  refreshToken: string;

  @OneToMany(() => UserLink, (userLink) => userLink.user, { cascade: true })
  links: UserLink[];
}
