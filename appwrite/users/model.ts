import { Models } from 'appwrite';

export interface User extends Models.Document {
  id: string;
  email: string;
  accessToShelfIds: string[];
}
