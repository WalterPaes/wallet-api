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

  @Column('decimal', {
    precision: 10,
    scale: 2,
    transformer: {
      to: (data: number): number => data,
      from: (data: string): number => parseFloat(data),
    },
  })
  private _amount: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  constructor() {
    this._amount = 0;
  }

  public get amount(): number {
    return this._amount;
  }

  public set amount(amount: number) {
    this._amount = amount;
  }

  public deposit(amount: number) {
    console.log(this._amount, typeof this._amount, amount);
    if (amount > 0) {
      this._amount += amount;
      console.log(this._amount, amount);
    }
  }

  public withdraw(amount: number) {
    if (this._amount >= amount) {
      this._amount -= amount;
    }
  }
}
