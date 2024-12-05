import Layout from '@/components/layout/Layout';
import { BankingQuickActions } from '@/modules/account/components';
import { AccountSnapshot } from '@/modules/dashboard/components';

export default function Home() {
  return (
    <Layout>
      <BankingQuickActions />
      <AccountSnapshot />
    </Layout>
  );
}
