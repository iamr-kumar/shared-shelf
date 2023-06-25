import { Models } from 'appwrite';

export interface Shelf extends Models.Document {
  name: string;
  createdBy: string;
  isPrivate: boolean;
  bannerUrl: string;
  description: string;
  sharedWith: string[];
}
