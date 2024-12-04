import { User } from '@/typedefs';

export const ActionTypes = {
  RESET_STORE: 'RESET_STORE',
  SET_AUTHENTICATED_USER: 'SET_AUTHENTICATED_USER',
} as const;

export const setAuthenticatedUser = (user: User | null) => ({
  type: ActionTypes.SET_AUTHENTICATED_USER,
  payload: user,
});

export const resetStore = () => ({
  type: ActionTypes.RESET_STORE,
});
