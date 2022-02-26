import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Wallet } from './wallet.entity';
import { WalletService } from './wallet.service';

@Controller()
export class WalletController {
  constructor(private walletService: WalletService) {}

  @UseGuards(JwtAuthGuard)
  @Post('wallet/deposit')
  async deposit(@Request() req, @Body() wallet: Wallet) {
    return this.walletService.deposit(req.user, wallet.amount);
  }

  @UseGuards(JwtAuthGuard)
  @Post('wallet/withdraw')
  async withdraw(@Request() req, @Body() wallet: Wallet) {
    return this.walletService.withdraw(req.user, wallet.amount);
  }

  @UseGuards(JwtAuthGuard)
  @Get('wallet/balance')
  async balance(@Request() req) {
    return this.walletService.getWallet(req.user);
  }
}
