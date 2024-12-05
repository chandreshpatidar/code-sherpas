'use client';
import React, { useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TransactionItem from './TransactionItem';
import { useAccountStore } from '@/modules/account/store/accountStore';
import { cn } from '@/lib/utils';

export const RecentTransactions = () => {
  const { activeAccount, paginatedTransaction, fetchTransactions } = useAccountStore();

  useEffect(() => {
    if (activeAccount?.id) {
      fetchTransactions(15, { refetch: true });
    }
  }, [activeAccount?.id]);

  return (
    <Card
      className={cn('flex-1 max-h-[500px] overflow-y-auto scrollbar transition-all', {
        'opacity-40': !activeAccount?.id,
        'opacity-100': activeAccount?.id,
      })}
    >
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className=''>
        {!activeAccount?.id ? (
          <p className='text-center text-muted-foreground'>Please select an account</p>
        ) : (
          <>
            <div className='grid grid-cols-[minmax(100px,1fr)_1fr_1fr] items-center gap-2 md:gap-4 p-3 mb-1 text-gray-100 font-semibold text-sm'>
              <div>Date</div>
              <div>Amount</div>
              <div className='text-end'>Balance</div>
            </div>

            {paginatedTransaction.transactions?.slice(0, 5)?.map((transaction, index) => (
              <TransactionItem
                key={index}
                {...transaction}
              />
            ))}
          </>
        )}
      </CardContent>
      {!!activeAccount?.id && paginatedTransaction.transactions?.length > 5 && (
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
      )}
    </Card>
  );
};
