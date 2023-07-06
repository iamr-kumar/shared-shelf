import { Models } from 'appwrite';

export interface Book extends Models.Document {
  id: string;
  userId: string;
  title: string;
  authors: string[];
  description: string;
  thumbnail?: string;
  categories?: string[];
}
