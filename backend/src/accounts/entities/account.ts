import { AccountType } from '@prisma/client';
import { User } from '../../user/entities/user';

export interface Account {
  id: string;
  balance: number;
  iban: string;
  type: AccountType;
  owner: User;
}
