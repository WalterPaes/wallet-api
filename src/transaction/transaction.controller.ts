import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Transaction } from './transaction.entity';
import { TransactionService } from './transaction.service';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  listAll(@Request() req): Promise<Transaction[]> {
    return this.transactionService.listByUser(req.user);
  }

  @ApiParam({
    name: 'id',
    description: 'Transaction ID',
    required: true,
    type: [String],
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  find(@Param() params): Promise<Transaction> {
    return this.transactionService.find(params.id);
  }
}
