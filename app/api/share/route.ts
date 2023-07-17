import { addShelfForUser } from '@/appwrite/users/create';
import { NextRequest, NextResponse } from 'next/server';

interface ShareShelfPayload {
  shelfId: string;
  userEmails: string[];
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as ShareShelfPayload;

  const { shelfId, userEmails } = body;

  if (!shelfId) {
    return NextResponse.json(
      {
        error: 'Shelf id is required',
      },
      { status: 400 }
    );
  }

  if (!userEmails || userEmails.length === 0) {
    return NextResponse.json(
      {
        error: 'User email is required',
      },
      { status: 400 }
    );
  }

  const updateUserShelfs = [];
  let success = userEmails.length;
  for (const email of userEmails) {
    updateUserShelfs.push(
      addShelfForUser(email, shelfId).catch((_) => (success -= 1))
    );
  }
  await Promise.all(updateUserShelfs);

  return NextResponse.json({ success });
}
