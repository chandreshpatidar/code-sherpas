import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        id: 'user1',
        name: 'Chandresh',
        email: 'chandresh@example.com',
        created_at: new Date(),
      },
      {
        id: 'user2',
        name: 'Sumit',
        email: 'sumit@example.com',
        created_at: new Date(),
      },
      {
        id: 'user3',
        name: 'Vishal',
        email: 'vishal@example.com',
        created_at: new Date(),
      },
    ],
  });

  await prisma.account.createMany({
    data: [
      {
        id: 'acc1',
        iban: 'IBAN123456',
        type: 'IBAN',
        balance: 2500,
        owner_id: 'user1',
        created_at: new Date(),
      },
      {
        id: 'acc2',
        iban: null,
        type: 'NON_IBAN',
        balance: 3500,
        owner_id: 'user1',
        created_at: new Date(),
      },
      {
        id: 'acc3',
        iban: 'IBAN654321',
        type: 'IBAN',
        balance: 2700,
        owner_id: 'user2',
        created_at: new Date(),
      },
      {
        id: 'acc4',
        iban: null,
        type: 'NON_IBAN',
        balance: 4300,
        owner_id: 'user3',
        created_at: new Date(),
      },
    ],
  });

  await prisma.transaction.createMany({
    data: [
      {
        id: 'txn1',
        amount: 500,
        balance_after_transaction: 2500,
        type: 'DEPOSIT',
        created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        account_id: 'acc1',
        description: 'Initial deposit',
      },
      {
        id: 'txn2',
        amount: 300,
        balance_after_transaction: 2200,
        type: 'WITHDRAWAL',
        created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        account_id: 'acc1',
        description: 'ATM withdrawal',
      },
      {
        id: 'txn3',
        amount: 400,
        balance_after_transaction: 1800,
        type: 'TRANSFER_OUT',
        created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        account_id: 'acc1',
        description: 'Transfer to acc3',
        linked_transaction_id: 'txn6',
      },
      {
        id: 'txn4',
        amount: 700,
        balance_after_transaction: 3500,
        type: 'DEPOSIT',
        created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
        account_id: 'acc2',
        description: 'Savings deposit',
      },
      {
        id: 'txn5',
        amount: 300,
        balance_after_transaction: 3200,
        type: 'WITHDRAWAL',
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        account_id: 'acc2',
        description: 'Grocery expense',
      },
      {
        id: 'txn6',
        amount: 400,
        balance_after_transaction: 3100,
        type: 'TRANSFER_IN',
        created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        account_id: 'acc3',
        description: 'Received from acc1',
        linked_transaction_id: 'txn3',
      },
      {
        id: 'txn7',
        amount: 200,
        balance_after_transaction: 3300,
        type: 'DEPOSIT',
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        account_id: 'acc3',
        description: 'Salary addition',
      },
      {
        id: 'txn8',
        amount: 500,
        balance_after_transaction: 4300,
        type: 'DEPOSIT',
        created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        account_id: 'acc4',
        description: 'Savings deposit',
      },
      {
        id: 'txn9',
        amount: 200,
        balance_after_transaction: 4100,
        type: 'WITHDRAWAL',
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        account_id: 'acc4',
        description: 'Utility bills',
      },
      {
        id: 'txn10',
        amount: 500,
        balance_after_transaction: 1300,
        type: 'TRANSFER_OUT',
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        account_id: 'acc3',
        description: 'Transfer to acc1',
        linked_transaction_id: 'txn11',
      },
      {
        id: 'txn11',
        amount: 500,
        balance_after_transaction: 3000,
        type: 'TRANSFER_IN',
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        account_id: 'acc1',
        description: 'Received from acc3',
        linked_transaction_id: 'txn10',
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seed data inserted successfully!');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
