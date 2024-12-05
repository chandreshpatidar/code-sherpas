'use client';
import { AccountSelect } from '@/components/selects/AccountSelect';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useAccountStore } from '@/modules/account/store/accountStore';
import { RecentTransactions } from '@/modules/transactions/components';
import { useAppContext } from '@/store/app';
import React from 'react';

export const AccountSnapshot = () => {
  const {
    state: { user },
  } = useAppContext();
  const { activeAccount } = useAccountStore();

  return (
    <>
      <h2 className='text-2xl'>Welcome {user?.name}</h2>

      <div className='mt-8 w-full flex flex-col lg:flex-row flex-wrap gap-6 lg:gap-10'>
        <div className='flex-1 lg:max-w-lg flex flex-col gap-6'>
          <AccountSelect />

          <Card
            className={cn('h-fit transition-all', {
              'opacity-40': !activeAccount?.id,
              'opacity-100': activeAccount?.id,
            })}
          >
            <CardHeader>
              <CardDescription>Current Balance</CardDescription>
              <CardTitle>{activeAccount?.id ? `$${activeAccount.balance}` : '$0.00'}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <RecentTransactions />
      </div>
    </>
  );
};
