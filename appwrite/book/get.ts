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
