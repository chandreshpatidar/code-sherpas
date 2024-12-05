import { User } from '@/modules/user/types';

export interface Account {
  id: string;
  balance: number;
  iban: string;
  type: AccountType;
  owner: User;
}

export enum AccountType {
  IBAN = 'IBAN',
  NON_IBAN = 'NON_IBAN',
}

export interface DepositMoneyInput {
  amount: number;
}

export interface DepositApiError {
  message: string;
}

export interface WithdrawMoneyInput {
  amount: number;
}

export type WithdrawApiError = {
  message?: string;
};

export interface TransferMoneyInput {
  toAccountId: string;
  amount: number;
}

export type TransferApiError = {
  message?: string;
};
