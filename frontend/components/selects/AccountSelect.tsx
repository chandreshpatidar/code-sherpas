import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export const AccountSelect = () => {
  return (
    <Select>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Select an account' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='1'>Account 1</SelectItem>
        <SelectItem value='2'>Account 2</SelectItem>
        <SelectItem value='3'>Account 3</SelectItem>
        <SelectItem value='4'>Account 4</SelectItem>
      </SelectContent>
    </Select>
  );
};
