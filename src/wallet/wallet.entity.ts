import { User } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Wallet {
  @Column()
  amount: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
