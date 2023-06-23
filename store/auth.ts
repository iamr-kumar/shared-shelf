import { User } from '@/appwrite/users/model';
import { create } from 'zustand';

export const useAuth = create<User | null>((set) => null);
