import { Injectable, Inject } from '@nestjs/common';
import { WalletService } from 'src/wallet/wallet.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private walletService: WalletService,
  ) {}

  async create(user: User): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = this.userRepository.save(user);
    newUser.then((data) => {
      this.walletService.create(data);
    });
    return newUser;
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ email });
  }
}
