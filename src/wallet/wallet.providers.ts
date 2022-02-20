import { Connection } from 'typeorm';
import { Wallet } from './wallet.entity';

export const walletProviders = [
  {
    provide: 'WALLET_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Wallet),
    inject: ['DATABASE_CONNECTION'],
  },
];
