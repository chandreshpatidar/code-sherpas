'use client';
import React, { useEffect, useState } from 'react';
import { FixedSizeList as List, ListOnScrollProps } from 'react-window';
import { Transaction } from '../types';
import TransactionItem from './TransactionItem';

const itemSize = 60;
const listHeight = 400;

export const PaginatedTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchTransactions(currentPage);
  }, [currentPage]);

  const fetchTransactions = async (page: number) => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/transactions?page=${page}`);
      const data = await response.json();

      if (data.transactions.length === 0) {
        setHasMore(false); // No more data
      } else {
        setTransactions((prev) => [...prev, ...data.transactions]);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = ({ scrollOffset }: ListOnScrollProps) => {
    const threshold = transactions.length * itemSize - listHeight;
    // Check if the user has scrolled near the bottom (100px buffer)
    if (scrollOffset >= threshold - 100 && !loading && hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div>
      <List
        height={400}
        itemCount={transactions.length}
        itemSize={60}
        width='100%'
        onScroll={handleScroll}
      >
        {({ index, style }) => {
          const transaction = transactions[index];
          return (
            <div style={style}>
              <TransactionItem
                amount={transaction.amount}
                balance={transaction.balance}
                date={transaction.date}
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
