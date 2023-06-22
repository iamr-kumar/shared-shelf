import { appwriteConfig } from '@/appwrite/config';
import { Constants } from '@/appwrite/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const userId = request.headers.get('x-user-id');

  if (!userId) {
    return;
  }

  const { db } = appwriteConfig;

  try {
    const user = await db.getDocument(
      Constants.DB_NAME,
      Constants.USERS_COLLECTION,
      userId
    );
    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({ error: 'No user found' }, { status: 404 });
  }
}
