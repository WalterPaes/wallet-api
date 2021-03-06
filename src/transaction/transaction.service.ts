import { Injectable, Inject } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('TRANSACTION_REPOSITORY')
    private transactionRepository: Repository<Transaction>,
  ) {}

  async create(transaction: Transaction): Promise<Transaction> {
    return this.transactionRepository.save(transaction);
  }

  async find(id: string): Promise<Transaction> {
    return this.transactionRepository.findOne(id);
  }

  async listByUser(user: User): Promise<Transaction[]> {
    return await this.transactionRepository.find({ user });
  }
}
