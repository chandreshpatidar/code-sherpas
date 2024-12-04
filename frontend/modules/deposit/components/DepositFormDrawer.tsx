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

export interface DepositFormDrawerProps extends React.PropsWithChildren {
  open: boolean;
  onClose: () => void;
}

export const DepositFormDrawer: React.FC<DepositFormDrawerProps> = ({ children, open, onClose }) => {
  return (
    <Drawer
      open={open}
      onClose={onClose}
    >
      <DrawerContent>
        <div className='mx-auto w-full max-w-xl'>
          <DrawerHeader>
            <DrawerTitle className='text-center'>Deposit Money</DrawerTitle>
            <DrawerDescription className='text-center'>Add funds to your account securely.</DrawerDescription>
          </DrawerHeader>

          <div className='p-4'>{children}</div>

          <DrawerFooter></DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
