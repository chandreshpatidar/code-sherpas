'use client';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import React from 'react';

export interface WithdrawFormDrawerProps extends React.PropsWithChildren {
  open: boolean;
  onClose: () => void;
}

export const WithdrawFormDrawer: React.FC<WithdrawFormDrawerProps> = ({ children, open, onClose }) => {
  return (
    <Drawer
      open={open}
      onClose={onClose}
    >
      <DrawerContent>
        <div className='mx-auto w-full max-w-xl'>
          <DrawerHeader>
            <DrawerTitle className='text-center'>Withdraw Money</DrawerTitle>
            <DrawerDescription className='text-center'>Easily withdraw funds from your bank.</DrawerDescription>
          </DrawerHeader>

          <div className='p-4'>{children}</div>

          <DrawerFooter></DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
