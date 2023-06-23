import { checkAndCreateUser } from '@/appwrite/utils/users';
import { Inter } from 'next/font/google';
import { Navbar } from '../components/layout/Navbar';
import './globals.css';

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
  const user = await checkAndCreateUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar isAuthenticated={user !== null} />
        {children}
      </body>
    </html>
  );
}
