'use client';
import SpeedDial from '@/components/ui/speed-dial';
import React from 'react';
import { bankingQuickActionOptions } from '../constants';
import { TransactionType } from '@/modules/transactions/types';
import { WithdrawForm, WithdrawFormDrawer } from '@/modules/withdraw/components';
import { DepositForm, DepositFormDrawer } from '@/modules/deposit/components';
import { TransferFormDrawer } from '@/modules/transfer/components/TransformFormDrawer';
import { TransferForm } from '@/modules/transfer/components/TransferForm';
import { useAccountStore } from '../store/accountStore';

export const BankingQuickActions = () => {
  const [selected, setSelected] = React.useState<TransactionType | null>(null);
  const { activeAccount } = useAccountStore();

  if (!activeAccount?.id) {
    return null;
  }

  return (
    <>
      <SpeedDial
        actions={bankingQuickActionOptions}
        onClick={(value) => setSelected(value as TransactionType)}
      />

      <DepositFormDrawer
        onClose={() => setSelected(null)}
        open={selected === 'DEPOSIT'}
      >
        <DepositForm
          onCancel={() => setSelected(null)}
          onSuccess={() => setSelected(null)}
        />
      </DepositFormDrawer>

      <WithdrawFormDrawer
        onClose={() => setSelected(null)}
        open={selected === 'WITHDRAWAL'}
      >
        <WithdrawForm
          onCancel={() => setSelected(null)}
          onSuccess={() => setSelected(null)}
        />
      </WithdrawFormDrawer>

      <TransferFormDrawer
        onClose={() => setSelected(null)}
        open={selected === 'TRANSFER_OUT'}
      >
        <TransferForm
          onCancel={() => setSelected(null)}
          onSuccess={() => setSelected(null)}
        />
      </TransferFormDrawer>
    </>
  );
};
