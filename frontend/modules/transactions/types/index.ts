export type TransactionType = 'deposit' | 'withdraw' | 'transfer';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  date: string;
  balance: number;
}
