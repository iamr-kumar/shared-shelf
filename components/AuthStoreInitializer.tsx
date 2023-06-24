'use client';

import { User } from '@/appwrite/users/model';
import { useAuth } from '@/store/auth';
import { useRef } from 'react';

export function AuthStoreInitializer({ user }: { user: User | null }) {
  const initialized = useRef(false);

  if (!initialized.current && user !== null) {
    useAuth.setState(user);
    initialized.current = true;
  }

  return null;
}
