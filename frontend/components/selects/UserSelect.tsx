'use client';
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUserStore } from '@/modules/user/store/userStore';

interface UserSelectProps {
  onChange: (value: string) => void;
}

export const UserSelect: React.FC<UserSelectProps> = ({ onChange }) => {
  const { users } = useUserStore();

  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Select a user' />
      </SelectTrigger>
      <SelectContent>
        {users.map((user) => (
          <SelectItem
            key={user.id}
            value={user.id}
          >
            {user.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
