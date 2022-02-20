import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { walletProviders } from './wallet.providers';
import { WalletService } from './wallet.service';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [...walletProviders, WalletService],
})
export class WalletModule {}
