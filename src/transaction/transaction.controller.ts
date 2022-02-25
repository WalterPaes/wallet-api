import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Transaction } from './transaction.entity';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  listAll(@Request() req): Promise<Transaction[]> {
    return this.transactionService.listByUser(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  find(@Request() req): Promise<Transaction> {
    return this.transactionService.find(req.id);
  }
}
