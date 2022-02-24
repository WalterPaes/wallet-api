import { Injectable, Inject } from '@nestjs/common';
import { Transaction } from 'src/transaction/transaction.entity';
import { TransactionService } from 'src/transaction/transaction.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
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
    let wallet = this.getWallet(user);

    wallet
      .then((w) => {
        if (amount > 0) {
          w.amount += amount;
          let result = this.walletRepository.save(w);
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
        }
      })
      .catch((e) => {
        console.log('oekeo', e.message);
      });
  }

  async withdraw(user: User, amount: number) {
    let wallet = this.getWallet(user);

    wallet
      .then((w) => {
        if (w.amount >= amount) {
          w.amount -= amount;
          let result = this.walletRepository.save(w);
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
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  private async getWallet(user: User): Promise<Wallet> {
    const wallet = await this.walletRepository.findOne({
      user: user,
    });
    return wallet;
  }
}
