import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  private amount: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  constructor() {
    this.amount = 0;
  }
}
