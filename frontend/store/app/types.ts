import { User } from '@/typedefs';
import { PropsWithChildren } from 'react';

export interface AppContextState {
  user: User | null;
}

export type AppContextAction = { type: 'SET_AUTHENTICATED_USER'; payload: User | null } | { type: 'RESET_STORE' };

export type AppContextProviderProps = PropsWithChildren;
