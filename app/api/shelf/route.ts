import { createShelf } from '@/appwrite/shelf/create';
import { getAllPublicShelfs } from '@/appwrite/shelf/get';
import { Shelf } from '@/appwrite/shelf/model';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const userId = request.headers.get('x-user-id') as string;

  if (!userId) {
    return NextResponse.redirect('/auth');
  }

  const createShelfParams: Partial<Shelf> = {
    name: body.name,
    isPrivate: body.isPrivate,
    bannerUrl: body.bannerUrl,
    createdBy: userId,
    description: body.description,
  };

  const shelf = await createShelf(createShelfParams);

  if (!shelf) {
    return NextResponse.json(
      { error: 'Failed to create shelf' },
      { status: 500 }
    );
  }

  return NextResponse.json(shelf, { status: 201 });
}

export async function GET(request: NextRequest) {
  const shelf = await getAllPublicShelfs();
  if (!shelf) {
    return NextResponse.json({ error: 'Failed to get shelf' }, { status: 500 });
  }
  return NextResponse.json(shelf, { status: 200 });
}
