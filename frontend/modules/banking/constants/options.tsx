import { ArrowDownCircle, ArrowUpCircle, MoveHorizontal } from 'lucide-react';

export const bankingQuickActionOptions = [
  {
    label: 'Deposit',
    icon: (
      <ArrowDownCircle
        size={24}
        className='text-green-500'
      />
    ),
    value: 'deposit',
  },
  {
    label: 'Withdraw',
    icon: (
      <ArrowUpCircle
        size={24}
        className='text-red-500'
      />
    ),
    value: 'withdraw',
  },
  {
    label: 'Transfer',
    icon: (
      <MoveHorizontal
        size={24}
        className='text-blue-500'
      />
    ),
    value: 'transfer',
  },
];
