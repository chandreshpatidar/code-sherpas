import Layout from '@/components/layout/Layout';
import { BankingQuickActions } from '@/modules/banking/components';
import { AccountSnapshot } from '@/modules/dashboard/components';

export default function Home() {
  return (
    <Layout>
      <BankingQuickActions />
      <AccountSnapshot />
    </Layout>
  );
}
