import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { TransactionService } from './transactions.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { Transaction } from '@prisma/client'; // Prisma-generated types
import { DepositDto, TransferDto, WithdrawDto } from './dto/transaction.dto';

@ApiTags('Accounts')
@ApiParam({ name: 'accountId', type: 'string', example: 'acc1' })
@Controller('accounts/:accountId')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('history')
  @ApiOperation({ summary: 'Get transaction history of an account' })
  @ApiQuery({ name: 'limit', type: 'number', example: 30 })
  @ApiQuery({ name: 'cursor', type: 'string', required: false })
  async getTransactionHistory(
    @Param('accountId') accountId: string,
    @Query('limit', ParseIntPipe) limit: number = 30,
    @Query('cursor') cursor?: string,
  ) {
    return this.transactionService.getTransactionHistory(
      accountId,
      limit,
      cursor,
    );
  }

  @Post('deposit')
  @ApiOperation({ summary: 'Deposit money into an account' })
  @ApiResponse({
    status: 200,
    description: 'Deposit successful.',
  })
  async deposit(
    @Param('accountId') accountId: string,
    @Body() transactionDto: DepositDto,
  ): Promise<Transaction> {
    return this.transactionService.deposit(accountId, transactionDto.amount);
  }

  @Post('withdraw')
  @ApiOperation({ summary: 'Withdraw money from an account' })
  @ApiResponse({
    status: 200,
    description: 'Withdrawal successful.',
  })
  async withdraw(
    @Param('accountId') accountId: string,
    @Body() transactionDto: WithdrawDto,
  ): Promise<Transaction> {
    return this.transactionService.withdraw(accountId, transactionDto.amount);
  }

  @Post('transfer')
  @ApiOperation({ summary: 'Transfer money between two accounts' })
  @ApiResponse({
    status: 200,
    description: 'Transfer successful.',
  })
  async transfer(
    @Param('accountId') fromAccountId: string,
    @Body() transferDto: TransferDto,
  ): Promise<Transaction[]> {
    return this.transactionService.transfer(
      fromAccountId,
      transferDto.toAccountId,
      transferDto.amount,
    );
  }
}
