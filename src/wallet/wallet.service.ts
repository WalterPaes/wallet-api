import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Wallet } from './wallet.entity';

@Injectable()
export class WalletService {
  constructor(
    @Inject('WALLET_REPOSITORY')
    private walletRepository: Repository<Wallet>,
  ) {}

  async create(wallet: Wallet): Promise<Wallet> {
    return this.walletRepository.save(wallet);
  }

  async find(id: string): Promise<Wallet> {
    return this.walletRepository.findOne(id);
  }
}
