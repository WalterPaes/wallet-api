import { Injectable, Inject } from '@nestjs/common';
import { WalletService } from 'src/wallet/wallet.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private walletService: WalletService,
  ) {}

  async create(user: User): Promise<User> {
    let newUser = this.userRepository.save(user);
    newUser.then((data) => {
      this.walletService.create(data);
    });
    return newUser;
  }

  async find(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }
}
