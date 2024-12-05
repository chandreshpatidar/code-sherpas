import Layout from '@/components/layout/Layout';
import { BankingQuickActions } from '@/modules/banking/components';
import { PaginatedTransactions } from '@/modules/transactions/components/PaginatedTransactions';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TransactionPage() {
  return (
    <Layout>
      <BankingQuickActions />
      <div className='container mx-auto'>
        <Link
          href={'/'}
          className='flex items-center gap-3'
        >
          <ArrowLeft size={24} /> Back to dashboard
        </Link>
        <PaginatedTransactions />
      </div>
    </Layout>
  );
}
