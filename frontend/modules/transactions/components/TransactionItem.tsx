import { ArrowDownCircle, ArrowUpCircle, MoveHorizontal } from 'lucide-react';
import { TransactionType } from '../types';
import { useMemo } from 'react';

export interface TransactionItemProps {
  type: TransactionType;
  amount: number;
  date: string;
  balance: number;
}

const TransactionItem = ({ type, amount, date, balance }: TransactionItemProps) => {
  const icon = useMemo(() => {
    switch (type) {
      case 'deposit':
        return (
          <ArrowDownCircle
            className='text-green-500'
            size={24}
          />
        );
      case 'withdraw':
        return (
          <ArrowUpCircle
            className='text-red-500'
            size={24}
          />
        );
      case 'transfer':
        return (
          <MoveHorizontal
            className='text-blue-500'
            size={24}
          />
        );
      default:
        return null;
    }
  }, [type]);

  return (
    <div className='flex items-center bg-white dark:bg-gray-800 shadow-md rounded-lg gap-2 md:gap-4 p-3 md:p-4 mb-0.5'>
      <div className='flex-shrink-0'>{icon}</div>
      <div className='flex-grow'>
        <label className='text-sm text-gray-100'>{date}</label>
      </div>
      <div className='flex-shrink-0 flex-grow'>
        <label className='text-sm text-gray-400'>
          {type === 'deposit' ? '+ ' : '- '}
          {amount}
        </label>
      </div>
      <div className='flex-shrink-0'>
        <label className='text-sm text-gray-400 font-medium'>{balance}</label>
      </div>
    </div>
  );
};

export default TransactionItem;
