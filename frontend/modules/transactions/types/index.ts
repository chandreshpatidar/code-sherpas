export type TransactionType = 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER_OUT' | 'TRANSFER_IN';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  balance_after_transaction: number;
  created_at: string;
  account_id: string;
  description?: string;
  linked_transaction_id: string;
}
