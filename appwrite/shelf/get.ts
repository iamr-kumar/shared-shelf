import { Query } from 'node-appwrite';
import { appwriteConfig } from '../config';
import { Constants } from '../constants';
import { Shelf } from './model';

export async function getAllPublicShelfs(): Promise<Shelf[] | null> {
  const { db } = appwriteConfig;

  try {
    const shelfs = await db.listDocuments<Shelf>(
      Constants.DB_NAME,
      Constants.SHELF_COLLECTION,
      [Query.equal('isPrivate', false)]
    );
    if (!shelfs) {
      throw new Error('Failed to get shelfs');
    }
    return shelfs.documents;
  } catch (err) {
    console.error(err);
    return null;
  }
}
