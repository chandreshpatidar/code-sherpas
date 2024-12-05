import { ArrowDown, ArrowUp, MoveDownLeft, MoveUpRight } from 'lucide-react';
import { TransactionType } from '../types';
import { useMemo } from 'react';
import dayjs from 'dayjs';

export interface TransactionItemProps {
  type: TransactionType;
  amount: number;
  created_at: string;
  balance_after_transaction: number;
}

const TransactionItem = ({ type, amount, created_at, balance_after_transaction }: TransactionItemProps) => {
  const icon = useMemo(() => {
    switch (type) {
      case 'DEPOSIT':
        return (
          <ArrowDown
            data-testid='arrow-down-icon'
            className='text-green-500'
            size={18}
          />
        );
      case 'WITHDRAWAL':
        return (
          <ArrowUp
            data-testid='arrow-up-icon'
            className='text-red-500'
            size={18}
          />
        );
      case 'TRANSFER_IN':
        return (
          <MoveDownLeft
            data-testid='move-down-left-icon'
            className='text-blue-500'
            size={18}
          />
        );

      case 'TRANSFER_OUT':
        return (
          <MoveUpRight
            data-testid='move-up-right-icon'
            className='text-blue-500'
            size={18}
          />
        );
      default:
        return null;
    }
  }, [type]);

  return (
    <div className='grid grid-cols-[minmax(100px,1fr)_1fr_1fr] items-center bg-white dark:bg-gray-800 shadow-md rounded-lg gap-2 md:gap-4 p-3 mb-1'>
      <div>
        <label className='text-sm text-gray-100'>{dayjs(created_at).format('DD/MM/YYYY')}</label>
      </div>
      <div className='flex items-center gap-2  text-sm text-gray-400'>
        {icon}
        {amount}
      </div>
      <div className='text-sm text-gray-400 font-medium text-end self-end'>{balance_after_transaction}</div>
    </div>
  );
};

export default TransactionItem;
