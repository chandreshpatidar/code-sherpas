import React, { useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useAppContext } from '@/store/app';
import { useAccountStore } from '@/modules/account/store/accountStore';

export const AccountSelect = () => {
  const { state } = useAppContext();
  const { fetchUserAccounts, setActiveAccount, activeAccount, accounts } = useAccountStore();

  const onValueChange = (id: string) => {
    const account = accounts.find((account) => account.id === id)!;

    setActiveAccount(account);
  };

  useEffect(() => {
    if (state.user?.id) {
      fetchUserAccounts(state.user.id);
    }
  }, [state.user?.id]);

  return (
    <Select
      value={activeAccount?.id}
      onValueChange={onValueChange}
    >
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Select an account' />
      </SelectTrigger>
      <SelectContent>
        {accounts.map((account) => (
          <SelectItem
            key={account.id}
            value={account.id}
          >
            <div className='w-full flex items-center'>
              <label className='capitalize'>{account.id}</label>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
