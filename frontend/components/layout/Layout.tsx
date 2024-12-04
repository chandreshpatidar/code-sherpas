import Header from './Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen bg-background text-foreground'>
      {/* TODO: Render sidebar */}
      <div className='flex flex-col flex-1'>
        <Header />
        <main className='p-6 flex-1 overflow-auto'>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
