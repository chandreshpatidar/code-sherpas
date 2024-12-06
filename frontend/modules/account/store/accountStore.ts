import { create } from 'zustand';
import { depositMoney, fetchAccounts as fetchAccountsService, transferMoney, withdrawMoney } from '../services';
import {
  Account,
  DepositApiError,
  DepositMoneyInput,
  TransferApiError,
  TransferMoneyInput,
  WithdrawApiError,
  WithdrawMoneyInput,
} from '../types';
import { fetchTransactions as fetchTransactionsService } from '../services/index';
import { Transaction } from '@/modules/transactions/types';

export type AccountStoreState = {
  accounts: Account[];
  activeAccount: Account | null;
  paginatedTransaction: { transactions: Transaction[]; nextCursor?: string };
  setActiveAccount: (account: Account | null) => void;
  fetchAccounts: (userId: string) => Promise<void>;
  fetchTransactions: (limit: number, options?: { refetch?: boolean; cursor?: string }) => Promise<void>;
  deposit: (body: DepositMoneyInput) => Promise<DepositApiError | void>;
  withdraw: (body: WithdrawMoneyInput) => Promise<WithdrawApiError | void>;
  transfer: (body: TransferMoneyInput) => Promise<TransferApiError | void>;
  resetAccountStore: () => void;
};

const updateAccountBalance = (accounts: Account[], activeAccountId?: string, balance?: number) => {
  if (activeAccountId && typeof balance === 'number') {
    return accounts.map((account) => (account.id === activeAccountId ? { ...account, balance } : account));
  }
  return accounts;
};

export const useAccountStore = create<AccountStoreState>((set, get) => ({
  accounts: [],
  activeAccount: null,
  paginatedTransaction: { transactions: [] },
  setActiveAccount: (account: Account | null) => {
    set({ activeAccount: account });
  },
  fetchAccounts: async () => {
    const res = await fetchAccountsService();

    if (res.error) {
      set({ accounts: [] });
    } else {
      set({ accounts: res.data || [] });
    }
  },
  fetchTransactions: async (limit: number, options?: { refetch?: boolean; cursor?: string }) => {
    const accountId = get()?.activeAccount?.id;

    if (accountId) {
      const res = await fetchTransactionsService(accountId, limit, options?.cursor);

      if (res.error) {
        set({ paginatedTransaction: { transactions: [] } });
      } else {
        set((state) => ({
          paginatedTransaction: {
            transactions: options?.refetch
              ? res.data?.transactions
              : state.paginatedTransaction.transactions.concat(res.data?.transactions),
            nextCursor: res.data?.nextCursor,
          },
        }));
      }
    }
  },
  deposit: async (body: DepositMoneyInput): Promise<DepositApiError | void> => {
    const accountId = get()?.activeAccount?.id;

    if (accountId) {
      const res = await depositMoney(accountId, body);

      if (res.error) {
        return res.error as DepositApiError;
      } else {
        set((state) => {
          const balance = state.activeAccount?.balance + res.data.amount;

          return {
            activeAccount: {
              ...(state.activeAccount || {}),
              balance,
            } as Account,
            accounts: updateAccountBalance(state.accounts, state.activeAccount?.id, balance),
            paginatedTransaction: {
              ...state.paginatedTransaction,
              transactions: [res.data, ...state.paginatedTransaction.transactions],
            },
          };
        });
      }
    }
  },
  withdraw: async (body: WithdrawMoneyInput): Promise<WithdrawApiError | void> => {
    const accountId = get()?.activeAccount?.id;

    if (accountId) {
      const res = await withdrawMoney(accountId, body);

      if (res.error) {
        return res.error as WithdrawApiError;
      } else {
        set((state) => {
          const balance = (state.activeAccount?.balance as number) - res.data.amount;

          return {
            activeAccount: {
              ...(state.activeAccount || {}),
              balance,
            } as Account,
            accounts: updateAccountBalance(state.accounts, state.activeAccount?.id, balance),
            paginatedTransaction: {
              ...state.paginatedTransaction,
              transactions: [res.data, ...state.paginatedTransaction.transactions],
            },
          };
        });
      }
    }
  },
  transfer: async (body: TransferMoneyInput): Promise<TransferApiError | void> => {
    const accountId = get()?.activeAccount?.id;

    if (accountId) {
      const res = await transferMoney(accountId, body);

      if (res.error) {
        return res.error as TransferApiError;
      } else {
        const transactionOut = res.data?.find(
          (transactionData: Transaction) => transactionData.type === 'TRANSFER_OUT'
        );

        set((state) => {
          const balance = (state.activeAccount?.balance as number) - transactionOut.amount;
          const accounts = [...state.accounts];

          res.data?.forEach((transactionData: Transaction) => {
            const accountIndex = accounts.findIndex((account) => account.id === transactionData.account_id);

            if (accountIndex !== -1) {
              accounts[accountIndex].balance =
                transactionData.type === 'TRANSFER_OUT'
                  ? accounts[accountIndex].balance - transactionData.amount
                  : accounts[accountIndex].balance + transactionData.amount;
            }
          });

          return {
            accounts,
            activeAccount: {
              ...(state.activeAccount || {}),
              balance,
            } as Account,
            paginatedTransaction: {
              ...state.paginatedTransaction,
              transactions: [transactionOut, ...state.paginatedTransaction.transactions],
            },
          };
        });
      }
    }
  },
  resetAccountStore: () => {
    set({
      accounts: [],
      activeAccount: null,
      paginatedTransaction: { transactions: [] },
    });
  },
}));
