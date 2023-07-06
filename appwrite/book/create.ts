import { appwriteConfig } from '../config';
import { Constants } from '../constants';
import { addBookToShelf } from '../shelf/create';
import { getBookById } from './get';
import { Book } from './model';

export async function createBook(params: Book): Promise<Book | null> {
  const { db } = appwriteConfig;

  try {
    if (!params.title) {
      throw new Error('Book title is required');
    }

    if (!params.authors?.length) {
      throw new Error('Author(s) is required');
    }

    const existingBook = await getBookById(params.id);

    if (existingBook) {
      return existingBook;
    }

    const book = await db.createDocument<Book>(
      Constants.DB_NAME,
      Constants.BOOK_COLLECTION,
      params.id,
      params
    );

    if (!book) {
      throw new Error('Failed to create book');
    }

    return book;
  } catch (err) {
    console.error(err);

    return null;
  }
}
