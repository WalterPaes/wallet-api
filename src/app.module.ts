import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { transactionProviders } from './transaction/transaction.providers';
import { TransactionService } from './transaction/transaction.service';
import { UserController } from './user/user.controller';
import { userProviders } from './user/user.providers';
import { UserService } from './user/user.service';
import { walletProviders } from './wallet/wallet.providers';
import { WalletService } from './wallet/wallet.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    ...userProviders,
    UserService,
    ...walletProviders,
    WalletService,
    ...transactionProviders,
    TransactionService,
  ],
})
export class AppModule {}
