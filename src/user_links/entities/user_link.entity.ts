import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity()
export class UserLink {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  // Many-to-one relationship with User
  @ManyToOne(() => User, (user) => user.links, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' }) 
  user: User;

  @Column()
  url_name: string;

  @Column()
  url_link: string;
}
