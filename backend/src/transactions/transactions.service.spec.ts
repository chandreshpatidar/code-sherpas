import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { TransactionService } from './transactions.service';
import { PrismaService } from '../prisma/prisma.service';

interface PrismaMock {
  account: {
    findUnique: jest.Mock;
    update: jest.Mock;
  };
  transaction: {
    create: jest.Mock;
  };
  $transaction: jest.Mock;
}

describe('TransactionService', () => {
  let service: TransactionService;
  let prisma: PrismaService & PrismaMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionService, PrismaService],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
    prisma = module.get<PrismaService & PrismaMock>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const accountMock = {
    id: 'account1',
    balance: 1000,
    type: 'IBAN',
  };

  const transactionMock = {
    id: 'transaction1',
    amount: 500,
    balance_after_transaction: 1500,
    type: 'DEPOSIT',
    account_id: 'account1',
    description: 'Deposit made to account',
    created_at: new Date(),
  };

  const prismaMock = {
    account: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    transaction: {
      create: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  beforeEach(() => {
    (prisma.account as any) = prismaMock.account;
    (prisma.transaction as any) = prismaMock.transaction;
    prisma.$transaction = prismaMock.$transaction;
  });

  describe('deposit', () => {
    it('should successfully deposit into an account', async () => {
      prisma.account.findUnique.mockResolvedValue(accountMock);
      prisma.transaction.create.mockResolvedValue(transactionMock);

      const result = await service.deposit('account1', 500);

      expect(result).toEqual(transactionMock);
      expect(prisma.account.findUnique).toHaveBeenCalledWith({
        where: { id: 'account1' },
      });
      expect(prisma.transaction.create).toHaveBeenCalledWith({
        data: {
          amount: 500,
          balance_after_transaction: 1500,
          type: 'DEPOSIT',
          account_id: 'account1',
          description: 'Deposit made to account',
        },
      });
      expect(prisma.account.update).toHaveBeenCalledWith({
        where: { id: 'account1' },
        data: { balance: 1500 },
      });
    });

    it('should throw an error if deposit amount is <= 0', async () => {
      await expect(service.deposit('account1', -100)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw an error if account does not exist', async () => {
      prisma.account.findUnique.mockResolvedValue(null);

      await expect(service.deposit('invalidAccount', 500)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('withdraw', () => {
    it('should successfully withdraw from an account', async () => {
      prisma.account.findUnique.mockResolvedValue(accountMock);
      prisma.transaction.create.mockResolvedValue(transactionMock);

      const result = await service.withdraw('account1', 500);

      expect(result).toEqual(transactionMock);
      expect(prisma.account.findUnique).toHaveBeenCalledWith({
        where: { id: 'account1' },
      });
      expect(prisma.transaction.create).toHaveBeenCalledWith({
        data: {
          amount: 500,
          balance_after_transaction: 500,
          type: 'WITHDRAWAL',
          account_id: 'account1',
          description: 'Withdrawal made from account',
        },
      });
      expect(prisma.account.update).toHaveBeenCalledWith({
        where: { id: 'account1' },
        data: { balance: 500 },
      });
    });

    it('should throw an error if withdrawal amount is <= 0', async () => {
      await expect(service.withdraw('account1', 0)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw an error if account does not exist', async () => {
      prisma.account.findUnique.mockResolvedValue(null);

      await expect(service.withdraw('invalidAccount', 500)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw an error if insufficient funds', async () => {
      prisma.account.findUnique.mockResolvedValue({
        ...accountMock,
        balance: 300,
      });

      await expect(service.withdraw('account1', 500)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('transfer', () => {
    const toAccountIBanMock = { id: 'account2', balance: 2000, type: 'IBAN' };
    const toAccountNonIBanMock = {
      id: 'account3',
      balance: 2000,
      type: 'NON_IBAN',
    };
    const transferOutTransactionMock = {
      id: 'txnOut',
      amount: 500,
      balance_after_transaction: 500,
      type: 'TRANSFER_OUT',
      account_id: 'account1',
      description: 'Transfer to account account2',
    };
    const transferInTransactionMock = {
      id: 'txnIn',
      amount: 500,
      balance_after_transaction: 2500,
      type: 'TRANSFER_IN',
      account_id: 'account2',
      description: 'Transfer from account account1',
    };

    it('should successfully transfer between IBAN accounts', async () => {
      prisma.account.findUnique
        .mockResolvedValueOnce(accountMock)
        .mockResolvedValueOnce(toAccountIBanMock);
      prisma.$transaction.mockResolvedValueOnce({
        transferOut: transferOutTransactionMock,
        transferIn: transferInTransactionMock,
      });

      const result = await service.transfer('account1', 'account2', 500);

      expect(result).toEqual([
        transferOutTransactionMock,
        transferInTransactionMock,
      ]);
      expect(prisma.account.findUnique).toHaveBeenCalledTimes(2);
      expect(prisma.$transaction).toHaveBeenCalled();
    });

    it('should fail to transfer between NON_IBAN accounts', async () => {
      prisma.account.findUnique
        .mockResolvedValueOnce(accountMock)
        .mockResolvedValueOnce(toAccountNonIBanMock);

      await expect(
        service.transfer('account1', 'account3', 500),
      ).rejects.toThrow(BadRequestException);
    });

    it('should fail to transfer to same account', async () => {
      prisma.account.findUnique
        .mockResolvedValueOnce(accountMock)
        .mockResolvedValueOnce(accountMock);

      await expect(
        service.transfer('account1', 'account1', 500),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw an error if source account does not exist', async () => {
      prisma.account.findUnique.mockResolvedValueOnce(null);

      await expect(
        service.transfer('invalidAccount', 'account2', 500),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw an error if destination account does not exist', async () => {
      prisma.account.findUnique
        .mockResolvedValueOnce(accountMock)
        .mockResolvedValueOnce(null);

      await expect(
        service.transfer('account1', 'invalidAccount', 500),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw an error if insufficient funds in source account', async () => {
      prisma.account.findUnique.mockResolvedValueOnce({
        ...accountMock,
        balance: 300,
      });

      await expect(
        service.transfer('account1', 'account2', 500),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
