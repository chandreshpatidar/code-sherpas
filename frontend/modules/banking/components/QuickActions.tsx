'use client';
import SpeedDial from '@/components/ui/speed-dial';
import React from 'react';
import { bankingQuickActionOptions } from '../constants';
import { TransactionType } from '@/modules/transactions/types';
import { WithdrawForm, WithdrawFormDrawer } from '@/modules/withdraw/components';
import { DepositForm, DepositFormDrawer } from '@/modules/deposit/components';
import { TransferFormDrawer } from '@/modules/transfer/components/TransformFormDrawer';
import { TransferForm } from '@/modules/transfer/components/TransferForm';

export const BankingQuickActions = () => {
  const [selected, setSelected] = React.useState<TransactionType | null>(null);

  return (
    <>
      <SpeedDial
        actions={bankingQuickActionOptions}
        onClick={(value) => setSelected(value as TransactionType)}
      />

      <DepositFormDrawer
        onClose={() => setSelected(null)}
        open={selected === 'deposit'}
      >
        <DepositForm onCancel={() => setSelected(null)} />
      </DepositFormDrawer>

      <WithdrawFormDrawer
        onClose={() => setSelected(null)}
        open={selected === 'withdraw'}
      >
        <WithdrawForm onCancel={() => setSelected(null)} />
      </WithdrawFormDrawer>

      <TransferFormDrawer
        onClose={() => setSelected(null)}
        open={selected === 'transfer'}
      >
        <TransferForm onCancel={() => setSelected(null)} />
      </TransferFormDrawer>
    </>
  );
};
