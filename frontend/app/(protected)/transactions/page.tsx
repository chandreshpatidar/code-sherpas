import { PaginatedTransactions } from '@/modules/transactions/components/PaginatedTransactions';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TransactionPage() {
  return (
    <div className='container mx-auto max-w-xl'>
      <Link
        href={'/'}
        className='flex items-center gap-3 mb-5 md:mb-8'
      >
        <ArrowLeft size={24} /> Back to dashboard
      </Link>
      <PaginatedTransactions />
    </div>
  );
}
