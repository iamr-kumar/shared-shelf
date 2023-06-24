import { ID } from 'node-appwrite';
import { appwriteConfig } from '../config';
import { Constants } from '../constants';
import { Shelf } from './model';

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

export async function createStarterShelfs(userId: string): Promise<void> {
  const toReadShelf: Partial<Shelf> = {
    name: 'To Read',
    isPrivate: true,
    sharedWith: [],
    createdBy: userId,
  };

  const readingShelf: Partial<Shelf> = {
    name: 'Reading',
    isPrivate: true,
    sharedWith: [],
    createdBy: userId,
  };

  const readShelf: Partial<Shelf> = {
    name: 'Read',
    isPrivate: true,
    sharedWith: [],
    createdBy: userId,
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