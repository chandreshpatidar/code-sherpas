import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Transaction } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async getTransactionHistory(
    accountId: string,
    limit: number,
    cursor?: string,
  ): Promise<{ transactions: Transaction[]; nextCursor?: string }> {
    if (limit <= 0) {
      throw new NotFoundException('Limit must be greater than 0.');
    }

    const transactions = await this.prisma.transaction.findMany({
      where: { account_id: accountId },
      orderBy: { created_at: 'desc' },
      take: limit + 1,
      ...(cursor
        ? {
            cursor: { id: cursor },
          }
        : {}),
    });

    let nextCursor: string | undefined = null;
    if (transactions.length > limit) {
      nextCursor = transactions[limit].id;
      transactions.pop();
    }

    return { transactions, nextCursor };
  }

  async deposit(accountId: string, amount: number): Promise<Transaction> {
    if (amount <= 0) {
      throw new BadRequestException(
        'Deposit amount must be greater than zero.',
      );
    }

    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      throw new NotFoundException('Account not found.');
    }

    const updatedBalance = account.balance + amount;

    const transaction = await this.prisma.transaction.create({
      data: {
        amount,
        balance_after_transaction: updatedBalance,
        type: 'DEPOSIT',
        account_id: accountId,
        description: 'Deposit made to account',
      },
    });

    await this.prisma.account.update({
      where: { id: accountId },
      data: { balance: updatedBalance },
    });

    return transaction;
  }

  async withdraw(accountId: string, amount: number): Promise<Transaction> {
    if (amount <= 0) {
      throw new BadRequestException(
        'Withdrawal amount must be greater than zero.',
      );
    }

    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      throw new NotFoundException('Account not found.');
    }

    if (account.balance < amount) {
      throw new BadRequestException('Insufficient balance.');
    }

    const updatedBalance = account.balance - amount;

    const transaction = await this.prisma.transaction.create({
      data: {
        amount,
        balance_after_transaction: updatedBalance,
        type: 'WITHDRAWAL',
        account_id: accountId,
        description: 'Withdrawal made from account',
      },
    });

    await this.prisma.account.update({
      where: { id: accountId },
      data: { balance: updatedBalance },
    });

    return transaction;
  }

  async transfer(fromAccountId: string, toAccountId: string, amount: number) {
    const fromAccount = await this.prisma.account.findUnique({
      where: { id: fromAccountId },
    });
    const toAccount = await this.prisma.account.findUnique({
      where: { id: toAccountId },
    });

    if (!fromAccount || !toAccount) {
      throw new BadRequestException('One or both accounts do not exist.');
    }

    if (fromAccount.id === toAccount.id) {
      throw new BadRequestException(
        'Transfer can not be made to the same account. The source and destination accounts cannot be the same.',
      );
    }

    if (fromAccount.type !== 'IBAN' || toAccount.type !== 'IBAN') {
      throw new BadRequestException(
        'One or both accounts are not IBAN accounts.',
      );
    }

    if (fromAccount.balance < amount) {
      throw new BadRequestException(
        'Insufficient balance in the source account.',
      );
    }

    const { transferOut, transferIn } = await this.prisma.$transaction(
      async (prisma) => {
        await prisma.account.update({
          where: { id: fromAccountId },
          data: { balance: { decrement: amount } },
        });

        await prisma.account.update({
          where: { id: toAccountId },
          data: { balance: { increment: amount } },
        });

        const transferOut = await prisma.transaction.create({
          data: {
            amount,
            balance_after_transaction: fromAccount.balance - amount,
            type: 'TRANSFER_OUT',
            account_id: fromAccountId,
            description: `Transfer to account ${toAccountId}`,
          },
        });

        const transferIn = await prisma.transaction.create({
          data: {
            amount,
            balance_after_transaction: toAccount.balance + amount,
            type: 'TRANSFER_IN',
            account_id: toAccountId,
            linked_transaction_id: transferOut.id,
            description: `Transfer from account ${fromAccountId}`,
          },
        });

        return { transferOut, transferIn };
      },
    );

    return [transferOut, transferIn];
  }
}
