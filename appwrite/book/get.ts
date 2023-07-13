import { Query } from 'node-appwrite';
import { appwriteConfig } from '../config';
import { Constants } from '../constants';
import { Book } from './model';

export async function getBookById(id: string): Promise<Book | null> {
  const { db } = appwriteConfig;
  try {
    const book = await db.getDocument<Book>(
      Constants.DB_NAME,
      Constants.BOOK_COLLECTION,
      id
    );
    if (!book) {
      throw new Error('Book not found');
    }
    return book;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getBooksByIds(bookIds: string[]): Promise<Book[] | null> {
  if (!bookIds || !bookIds.length) {
    return [];
  }

  const { db } = appwriteConfig;
  try {
    const response = await db.listDocuments<Book>(
      Constants.DB_NAME,
      Constants.BOOK_COLLECTION,
      [Query.equal('$id', bookIds)]
    );
    if (!response) {
      throw new Error('Book not found');
    }

    return response.documents;
  } catch (err) {
    console.error(err);
    return null;
  }
}
