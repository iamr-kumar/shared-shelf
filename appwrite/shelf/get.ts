import { Query } from 'node-appwrite';
import { appwriteConfig } from '../config';
import { Constants } from '../constants';
import { Shelf } from './model';
import { getBooksByIds } from '../book/get';
import { User } from '../users/model';

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

export async function getShelfById(
  id: string,
  authUserId: string
): Promise<Shelf | null> {
  const { db } = appwriteConfig;

  try {
    const shelf = await db.getDocument<Shelf>(
      Constants.DB_NAME,
      Constants.SHELF_COLLECTION,
      id
    );
    if (!shelf) {
      throw new Error('Failed to get shelf');
    }
    if (shelf.createdBy !== authUserId && shelf.isPrivate) {
      throw new Error('Shelf is private');
    }
    const books = await getBooksByIds(shelf.bookIds);
    if (!books) {
      shelf.books = [];
    } else {
      shelf.books = books;
    }

    return shelf;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getShelfByUserId(
  userId: string,
  authUserId: string
): Promise<Shelf[] | null> {
  const { db } = appwriteConfig;

  const whereClause = [Query.equal('createdBy', userId)];
  if (userId !== authUserId) {
    whereClause.push(Query.equal('isPrivate', false));
  }

  try {
    const shelfs = await db.listDocuments<Shelf>(
      Constants.DB_NAME,
      Constants.SHELF_COLLECTION,
      whereClause
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

export async function getShelfSharedWithUser(
  userId: string
): Promise<Shelf[] | null> {
  const { db } = appwriteConfig;
  try {
    const user = await db.getDocument<User>(
      Constants.DB_NAME,
      Constants.USERS_COLLECTION,
      userId
    );
    if (!user) {
      throw new Error('Failed to get user');
    }

    const shelfIds = user.accessToShelfIds;

    if (!shelfIds || shelfIds.length === 0) {
      return [];
    }

    const shelfs = await db.listDocuments<Shelf>(
      Constants.DB_NAME,
      Constants.SHELF_COLLECTION,
      [Query.equal('$id', shelfIds)]
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
