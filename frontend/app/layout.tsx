import type { Metadata } from 'next';
import './globals.css';
import { AppContextProvider } from '@/store/app';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Code Sherpas',
  description: 'Code Sherpas is a platform for banking.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={'antialiased dark scrollbar'}>
        <Toaster />
        <AppContextProvider>{children}</AppContextProvider>
      </body>
    </html>
  );
}
