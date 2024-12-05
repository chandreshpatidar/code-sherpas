import { create } from 'zustand';
import { fetchUsers as fetchUsersService } from '../services';
import { User } from '../types';

export type UserStoreState = {
  users: User[];
  fetchUsers: () => Promise<void>;
};

export const useUserStore = create<UserStoreState>((set) => ({
  users: [],
  fetchUsers: async () => {
    const res = await fetchUsersService();
    if (res.error) {
      set({ users: [] });
    } else {
      set({ users: res.data });
    }
  },
}));
