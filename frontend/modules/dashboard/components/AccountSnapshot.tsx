'use client';
import { AccountSelect } from '@/components/selects/AccountSelect';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RecentTransactions } from '@/modules/transactions/components';
import { useAppContext } from '@/store/app';
import React from 'react';

export const AccountSnapshot = () => {
  const {
    state: { user },
  } = useAppContext();

  return (
    <>
      <h2 className='text-2xl'>Welcome {user?.name}</h2>

      <div className='mt-8 w-full flex flex-col lg:flex-row flex-wrap gap-10'>
        <div className='flex-1 max-w-lg flex flex-col gap-4'>
          <AccountSelect />

          <Card className='h-fit'>
            <CardHeader>
              <CardDescription>Current Balance</CardDescription>
              <CardTitle>$123</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <RecentTransactions />
      </div>
    </>
  );
};
