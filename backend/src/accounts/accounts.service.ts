import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Account } from './entities/account';

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService) {}

  getAllAccounts(): Promise<Account[]> {
    return this.prisma.account.findMany({
      include: {
        owner: true,
      },
    });
  }
}
