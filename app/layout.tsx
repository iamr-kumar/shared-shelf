import './globals.css';
import { Inter } from 'next/font/google';
import { Navbar } from '../components/layout/Navbar';
import { getAuthenticatedUserFromSession } from '@/utils/passage';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Shared Shelf',
  description: 'Sharing book recommendations with friends.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = await getAuthenticatedUserFromSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
