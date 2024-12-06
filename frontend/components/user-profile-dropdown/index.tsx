'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';
import { resetStore, useAppContext } from '@/store/app';
import { useRouter } from 'next/navigation';
import { useAccountStore } from '@/modules/account/store/accountStore';

const UserProfileDropdown = () => {
  const router = useRouter();
  const {
    state: { user },
    dispatch,
  } = useAppContext();
  const { resetAccountStore } = useAccountStore();

  const logout = () => {
    dispatch(resetStore());
    resetAccountStore();
    router.replace('/sign-in');
  };

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='flex items-center space-x-2 focus:outline-none'>
          <Avatar>
            <AvatarFallback>{user?.name[0]}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-48'
        align='end'
      >
        <div className='flex flex-col gap-0.5 p-2.5'>
          <label className='text-sm'>{user?.name}</label>
          <label className='text-xs text-gray-400'>{user?.email}</label>
        </div>

        <hr className='bg-slate-700 my-1' />

        <DropdownMenuItem
          className='cursor-pointer'
          onClick={logout}
        >
          <LogOut />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileDropdown;
