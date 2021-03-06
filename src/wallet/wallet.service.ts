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
    const wallet = new Wallet();
    wallet.user = user;
    return this.walletRepository.save(wallet);
  }

  async deposit(user: User, amount: number) {
    const wallet = this.getWallet(user);

    wallet
      .then((w) => {
        w.deposit(amount);
        const result = this.walletRepository.save(w);
        result.then(() => {
          this.transactionService.create(
            new Transaction(
              amount,
              'deposit',
              new Date().toLocaleString(),
              user,
            ),
          );
        });
      })
      .catch((e) => {
        throw new Error(e.message);
      });
  }

  async withdraw(user: User, amount: number) {
    const wallet = this.getWallet(user);

    wallet
      .then((w) => {
        w.withdraw(amount);
        const result = this.walletRepository.save(w);
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
      })
      .catch((e) => {
        throw new Error(e.message);
      });
  }

  async getWallet(user: User): Promise<Wallet> {
    const wallet = await this.walletRepository.findOne({
      user: user,
    });
    return wallet;
  }
}
