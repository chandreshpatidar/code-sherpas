import { create } from 'zustand';
import { depositMoney, fetchAccountsByUserId, transferMoney, withdrawMoney } from '../services';
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
  fetchUserAccounts: (userId: string) => Promise<void>;
  fetchTransactions: (limit: number, options?: { refetch?: boolean; cursor?: string }) => Promise<void>;
  deposit: (body: DepositMoneyInput) => Promise<DepositApiError | void>;
  withdraw: (body: WithdrawMoneyInput) => Promise<WithdrawApiError | void>;
  transfer: (body: TransferMoneyInput) => Promise<TransferApiError | void>;
  resetAccountStore: () => void;
};

export const useAccountStore = create<AccountStoreState>((set, get) => ({
  accounts: [],
  activeAccount: null,
  paginatedTransaction: { transactions: [] },
  setActiveAccount: (account: Account | null) => {
    set({ activeAccount: account });
  },
  fetchUserAccounts: async (userId: string) => {
    const res = await fetchAccountsByUserId(userId);

    if (res.error) {
      set({ accounts: [] });
    } else {
      const userAccounts = res.data?.filter((account: Account) => account.owner.id === userId);
      set({ accounts: userAccounts });
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
        set((state) => ({
          activeAccount: {
            ...(state.activeAccount || {}),
            balance: state.activeAccount?.balance + res.data.amount,
          } as Account,
          paginatedTransaction: {
            ...state.paginatedTransaction,
            transactions: [res.data, ...state.paginatedTransaction.transactions],
          },
        }));
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
        set((state) => ({
          activeAccount: {
            ...(state.activeAccount || {}),
            balance: (state.activeAccount?.balance as number) - res.data.amount,
          } as Account,
          paginatedTransaction: {
            ...state.paginatedTransaction,
            transactions: [res.data, ...state.paginatedTransaction.transactions],
          },
        }));
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
        const transaction = res.data?.find((transactionData: Transaction) => transactionData.type === 'TRANSFER_OUT');

        set((state) => ({
          activeAccount: {
            ...(state.activeAccount || {}),
            balance: (state.activeAccount?.balance as number) - res.data.amount,
          } as Account,
          paginatedTransaction: {
            ...state.paginatedTransaction,
            transactions: [transaction, ...state.paginatedTransaction.transactions],
          },
        }));
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
