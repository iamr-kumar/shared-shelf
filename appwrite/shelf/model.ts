import { Models } from 'appwrite';
import { Book } from '../book/model';

export interface Shelf extends Models.Document {
  name: string;
  createdBy: string;
  isPrivate: boolean;
  bannerUrl: string;
  description: string;
  sharedWith: string[];
  bookIds: string[];
  books?: Book[];
}
