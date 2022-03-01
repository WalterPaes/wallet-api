import { Transaction } from 'src/transaction/transaction.entity';
import { Wallet } from 'src/wallet/wallet.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'User Name', required: true, type: [String] })
  name: string;

  @Column({ unique: true })
  @IsEmail()
  @ApiProperty({ description: 'User Email', required: true, type: [String] })
  email: string;

  @Column()
  @IsNotEmpty()
  @Exclude({
    toPlainOnly: true,
  })
  @ApiProperty({ description: 'User Password', required: true, type: [String] })
  password: string;

  @OneToOne(() => Wallet, (wallet) => wallet.user)
  wallet: Wallet;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
}
