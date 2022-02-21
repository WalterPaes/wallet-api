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
}
