'use client';
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface UserSelectProps {
  onChange: (value: string) => void;
}

export const UserSelect: React.FC<UserSelectProps> = ({ onChange }) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Select a user' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='1'>User 1</SelectItem>
        <SelectItem value='2'>User 2</SelectItem>
        <SelectItem value='3'>User 3</SelectItem>
        <SelectItem value='4'>User 4</SelectItem>
        <SelectItem value='5'>User 5</SelectItem>
      </SelectContent>
    </Select>
  );
};
