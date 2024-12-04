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

export interface TransferFormDrawerProps extends React.PropsWithChildren {
  open: boolean;
  onClose: () => void;
}

export const TransferFormDrawer: React.FC<TransferFormDrawerProps> = ({ children, open, onClose }) => {
  return (
    <Drawer
      open={open}
      onClose={onClose}
    >
      <DrawerContent>
        <div className='mx-auto w-full max-w-xl'>
          <DrawerHeader>
            <DrawerTitle className='text-center'>Transfer Money</DrawerTitle>
            <DrawerDescription className='text-center'>Quickly transfer funds between accounts.</DrawerDescription>
          </DrawerHeader>

          <div className='p-4'>{children}</div>

          <DrawerFooter></DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
