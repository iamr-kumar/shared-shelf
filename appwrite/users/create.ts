import { appwriteConfig } from '@/appwrite/config';
import { Constants } from '@/appwrite/constants';
import { User } from '@/appwrite/users/model';

export async function createAppwriteUser(
  userId: string,
  email: string
): Promise<User> {
  const { db } = appwriteConfig;

  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    if (!email) {
      throw new Error('Email is required');
    }

    const user = await db.createDocument<User>(
      Constants.DB_NAME,
      Constants.USERS_COLLECTION,
      userId,
      { id: userId, email }
    );

    return user;
  } catch (err) {
    console.error(err);

    throw err;
  }
}
