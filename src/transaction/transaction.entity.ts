import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column()
  type: string;

  @Column()
  date: string;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;

  constructor(amount: number, type: string, date: string, user: User) {
    this.amount = amount;
    this.type = type;
    this.date = date;
    this.user = user;
  }
}
