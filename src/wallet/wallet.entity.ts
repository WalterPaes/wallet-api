import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsDecimal } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  @Exclude({
    toPlainOnly: true,
  })
  id: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    transformer: {
      to: (data: number): number => data,
      from: (data: string): number => parseFloat(data),
    },
  })
  @IsDecimal()
  private _amount: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  constructor() {
    this._amount = 0;
  }

  public deposit(amount: number) {
    if (amount > 0) {
      this._amount += amount;
    }
  }

  public withdraw(amount: number) {
    if (this._amount >= amount) {
      this._amount -= amount;
    }
  }

  public get amount(): number {
    return this._amount;
  }
}
