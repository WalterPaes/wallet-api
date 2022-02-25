import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { WalletService } from './wallet.service';

@Controller()
export class WalletController {
  constructor(private walletService: WalletService) {}

  @UseGuards(JwtAuthGuard)
  @Post('wallet/deposit')
  async deposit(@Request() req) {
    return this.walletService.deposit(req.user, req.body['amount']);
  }

  @UseGuards(JwtAuthGuard)
  @Post('wallet/withdraw')
  async withdraw(@Request() req) {
    return this.walletService.withdraw(req.user, req.body['amount']);
  }

  @UseGuards(JwtAuthGuard)
  @Get('wallet/balance')
  async balance(@Request() req) {
    return this.walletService.getWallet(req.user);
  }
}