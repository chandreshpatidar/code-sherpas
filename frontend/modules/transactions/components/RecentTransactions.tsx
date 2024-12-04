'use client';
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TransactionItem, { TransactionItemProps } from './TransactionItem';

const transactions: TransactionItemProps[] = [
  { type: 'deposit', amount: 250, date: 'Aug 20, 2024', balance: 5000 },
  { type: 'withdraw', amount: 50, date: 'Aug 18, 2024', balance: 5000 },
  { type: 'transfer', amount: 100, date: 'Aug 17, 2024', balance: 5000 },
];

export const RecentTransactions = () => {
  return (
    <Card className='flex-1 max-h-[500px] overflow-y-auto scrollbar'>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.map((transaction, index) => (
          <TransactionItem
            key={index}
            {...transaction}
          />
        ))}
      </CardContent>
      <CardFooter className='justify-start'>
        <Link
          href='/transactions'
          className='flex items-center gap-4'
        >
          <Button variant='secondary'>
            View all <ArrowRight size={20} />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
