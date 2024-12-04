'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';
import { setAuthenticatedUser, useAppContext } from '@/store/app';
import { useRouter } from 'next/navigation';

const UserProfileDropdown = () => {
  const router = useRouter();
  const {
    state: { user },
    dispatch,
  } = useAppContext();

  const logout = () => {
    dispatch(setAuthenticatedUser(null));
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
            {user?.image ? (
              <AvatarImage
                src={user.image}
                alt={user.name}
              />
            ) : (
              <AvatarFallback>{user?.name[0] || 'CP'}</AvatarFallback>
            )}
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-48'
        align='end'
      >
        <div className='flex flex-col gap-0.5 p-2.5'>
          <label className='text-sm'>{user?.name || 'Chandresh Patidar'}</label>
          <label className='text-xs text-gray-400'>{user?.email || 'F6lGy@example.com'}</label>
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
