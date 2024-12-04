'use client';
import Link from 'next/link';
import UserProfileDropdown from '../user-profile-dropdown';

const Header = () => {
  return (
    <header className='w-full py-4 px-6 flex justify-between items-center border-b'>
      <Link
        href='/'
        className='text-xl font-semibold'
      >
        Code Sherpas
      </Link>
      <UserProfileDropdown />
    </header>
  );
};

export default Header;
