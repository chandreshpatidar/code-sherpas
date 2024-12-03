import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Transaction } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

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
