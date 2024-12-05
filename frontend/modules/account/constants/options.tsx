import { ArrowDownToDot, ChevronsRight, HandCoins } from 'lucide-react';

export const bankingQuickActionOptions = [
  {
    label: 'Deposit',
    icon: (
      <ArrowDownToDot
        size={24}
        className='text-green-500'
      />
    ),
    value: 'DEPOSIT',
  },
  {
    label: 'Withdraw',
    icon: (
      <HandCoins
        size={24}
        className='text-red-500'
      />
    ),
    value: 'WITHDRAWAL',
  },
  {
    label: 'Transfer',
    icon: (
      <ChevronsRight
        size={24}
        className='text-blue-500'
      />
    ),
    value: 'TRANSFER_OUT',
  },
];
