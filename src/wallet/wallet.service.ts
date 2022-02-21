import { Injectable, Inject } from '@nestjs/common';
import { Transaction } from 'src/transaction/transaction.entity';
import { TransactionService } from 'src/transaction/transaction.service';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Wallet } from './wallet.entity';

@Injectable()
export class WalletService {
  constructor(
    @Inject('WALLET_REPOSITORY')
    private walletRepository: Repository<Wallet>,
    private transactionService: TransactionService,
  ) {}

  async create(user: User): Promise<Wallet> {
    let wallet = new Wallet();
    wallet.user = user;
    return this.walletRepository.save(wallet);
  }

  async deposit(user: User, amount: number) {
    let wallet = user.wallet;
    if (amount > 0) {
      wallet.amount += amount;
      let result = this.walletRepository.save(wallet);
      result.then(() => {
        this.transactionService.create(
          new Transaction(amount, 'deposit', new Date().toLocaleString(), user),
        );
      });
    }
  }

  async withdraw(user: User, amount: number) {
    let wallet = user.wallet;
    if (wallet.amount >= amount) {
      wallet.amount -= amount;
      let result = this.walletRepository.save(wallet);
      result.then(() => {
        this.transactionService.create(
          new Transaction(
            amount,
            'withdraw',
            new Date().toLocaleString(),
            user,
          ),
        );
      });
    }
  }
}
