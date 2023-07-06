import { createBook } from '@/appwrite/book/create';
import { addBookToShelf } from '@/appwrite/shelf/create';
import { NextRequest, NextResponse } from 'next/server';

// adds a new book to a shelf
export async function POST(request: NextRequest) {
  const body = await request.json();
  const userId = request.headers.get('x-user-id') as string;

  if (!userId) {
    return NextResponse.redirect('/auth');
  }

  // get shelf id from last part of url
  const shelfId = request.nextUrl.pathname.split('/').pop();

  if (!shelfId) {
    return NextResponse.json(
      { error: 'Shelf id is required' },
      { status: 400 }
    );
  }

  const book = await createBook(body.book);
  if (!book) {
    return NextResponse.json(
      { error: 'Failed to create book' },
      { status: 500 }
    );
  }
  const shelf = await addBookToShelf(shelfId, book.id);
  if (!shelf) {
    return NextResponse.json(
      { error: 'Failed to add book to shelf' },
      { status: 500 }
    );
  }

  return NextResponse.json({ book });
}
