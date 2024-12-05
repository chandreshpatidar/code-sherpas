'use client';

import { createContext, useContext, useReducer, Dispatch, useMemo, useEffect } from 'react';
import initialAppContextState, { AppContextReducer } from './reducer';
import { AppContextProviderProps, AppContextState, AppContextAction } from './types';
import { useRouter } from 'next/navigation';

const AppContext = createContext<
  | {
      state: AppContextState;
      dispatch: Dispatch<AppContextAction>;
    }
  | undefined
>(undefined);

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(AppContextReducer, initialAppContextState);

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );

  useEffect(() => {
    if (state.user?.id === undefined) {
      router.replace('/sign-in');
    }
  }, [state.user?.id]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }

  return context;
};
