import { Injectable, Inject } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Wallet } from './wallet.entity';

@Injectable()
export class WalletService {
  constructor(
    @Inject('WALLET_REPOSITORY')
    private walletRepository: Repository<Wallet>,
  ) {}

  async create(user: User): Promise<Wallet> {
    let wallet = new Wallet();
    wallet.user = user;
    return this.walletRepository.save(wallet);
  }

  async find(id: string): Promise<Wallet> {
    return this.walletRepository.findOne(id);
  }
}
