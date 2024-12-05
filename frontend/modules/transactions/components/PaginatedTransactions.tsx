'use client';
import React, { useState } from 'react';
import { FixedSizeList as List, ListOnScrollProps } from 'react-window';
import TransactionItem from './TransactionItem';
import { useAccountStore } from '@/modules/account/store/accountStore';

const itemSize = 60;
const listHeight = 400;

export const PaginatedTransactions = () => {
  const [loading, setLoading] = useState(false);
  const { fetchTransactions, paginatedTransaction } = useAccountStore();

  const handleScroll = async ({ scrollOffset }: ListOnScrollProps) => {
    if (loading) return null;

    setLoading(true);
    const threshold = paginatedTransaction.transactions.length * itemSize - listHeight;
    // Check if the user has scrolled near the bottom (100px buffer)
    if (scrollOffset >= threshold - 100 && paginatedTransaction.nextCursor) {
      await fetchTransactions(15, { cursor: paginatedTransaction.nextCursor });
    }
    setLoading(false);
  };

  return (
    <div>
      <div className='grid grid-cols-[minmax(100px,1fr)_1fr_1fr] items-center gap-2 md:gap-4 p-3 mb-1 text-gray-100 font-semibold text-sm'>
        <div>Date</div>
        <div>Amount</div>
        <div className='text-end'>Balance</div>
      </div>

      <List
        height={400}
        itemCount={paginatedTransaction.transactions.length}
        itemSize={52}
        width='100%'
        onScroll={handleScroll}
        className='scrollbar'
      >
        {({ index, style }) => {
          const transaction = paginatedTransaction.transactions?.[index];
          return (
            <div style={style}>
              <TransactionItem
                amount={transaction.amount}
                balance_after_transaction={transaction.balance_after_transaction}
                created_at={transaction.created_at}
                type={transaction.type}
              />
            </div>
          );
        }}
      </List>
      {loading && <div className='text-center mt-2'>Loading...</div>}
    </div>
  );
};
