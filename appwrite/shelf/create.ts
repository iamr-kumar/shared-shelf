import { ID } from 'node-appwrite';
import { appwriteConfig } from '../config';
import { Constants } from '../constants';
import { Shelf } from './model';
import { getShelfById } from './get';

export async function createShelf(
  params: Partial<Shelf>
): Promise<Shelf | null> {
  const { db } = appwriteConfig;

  try {
    if (!params.name) {
      throw new Error('Shelf name is required');
    }

    if (!params.createdBy) {
      throw new Error('User ID is required');
    }

    if (!params.bannerUrl) {
      params.bannerUrl = Constants.DEFAULT_BANNER_URL;
    }

    const id = ID.unique();

    const shelf = await db.createDocument<Shelf>(
      Constants.DB_NAME,
      Constants.SHELF_COLLECTION,
      id,
      params
    );

    if (!shelf) {
      throw new Error('Failed to create shelf');
    }

    return shelf;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function addBookToShelf(
  shelfId: string,
  bookId: string
): Promise<Shelf | null> {
  const { db } = appwriteConfig;
  try {
    const shelf = await db.getDocument<Shelf>(
      Constants.DB_NAME,
      Constants.SHELF_COLLECTION,
      shelfId
    );
    if (!shelf) {
      throw new Error('Shelf does not exist');
    }
    const { bookIds } = shelf;
    const updatedShelf = await db.updateDocument<Shelf>(
      Constants.DB_NAME,
      Constants.SHELF_COLLECTION,
      shelfId,
      {
        bookIds: [...bookIds, bookId],
      }
    );
    return updatedShelf;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function createStarterShelfs(userId: string): Promise<void> {
  const toReadShelf: Partial<Shelf> = {
    name: 'To Read',
    isPrivate: true,
    sharedWith: [],
    createdBy: userId,
    description: 'This shelf keeps track of all the books you wish to read.',
  };

  const readingShelf: Partial<Shelf> = {
    name: 'Reading',
    isPrivate: true,
    sharedWith: [],
    createdBy: userId,
    description:
      'This shelf keeps track of all the books you are currently reading.',
  };

  const readShelf: Partial<Shelf> = {
    name: 'Read',
    isPrivate: true,
    sharedWith: [],
    createdBy: userId,
    description: 'This shelf keeps track of all the books you have read.',
  };

  try {
    const shelfs = await Promise.all([
      createShelf(toReadShelf),
      createShelf(readingShelf),
      createShelf(readShelf),
    ]);

    if (shelfs.some((shelf) => shelf === null)) {
      throw new Error('Failed to create some starter shelfs');
    }
  } catch (err) {
    console.error(err);
  }
}
