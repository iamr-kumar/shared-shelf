import { checkAndCreateUser } from '@/appwrite/utils/users';
import { AuthStoreInitializer } from '@/components/AuthStoreInitializer';
import { useAuth } from '@/store/auth';
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

  useAuth.setState(user);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthStoreInitializer user={user} />
        <Navbar isAuthenticated={user !== null} />

        {children}
      </body>
    </html>
  );
}
