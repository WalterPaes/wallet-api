import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Transaction {
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
  @ApiProperty({ description: 'Transaction amount' })
  amount: number;

  @Column()
  @ApiProperty({ description: 'Transaction type' })
  type: string;

  @Column()
  @ApiProperty({ description: 'Transaction date' })
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
