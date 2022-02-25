import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TransactionController } from 'src/transaction/transaction.controller';
import { transactionProviders } from 'src/transaction/transaction.providers';
import { TransactionService } from 'src/transaction/transaction.service';
import { WalletController } from 'src/wallet/wallet.controller';
import { walletProviders } from 'src/wallet/wallet.providers';
import { WalletService } from 'src/wallet/wallet.service';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController, WalletController, TransactionController],
  providers: [
    ...userProviders,
    UserService,
    ...walletProviders,
    WalletService,
    ...transactionProviders,
    TransactionService,
  ],
  exports: [UserService],
})
export class UserModule {}
