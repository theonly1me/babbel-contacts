import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Babbel.com | Fullstack Test',
  description:
    'Babble.com Senior Fullstack Engineer test solution by @theonly1me',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + ' text-gray-900'}>
        <Header />
        {children}
      </body>
    </html>
  );
}
