import { appwriteConfig } from '@/appwrite/config';
import { Constants } from '@/appwrite/constants';
import { User } from '@/appwrite/users/model';

export async function getAppwriteUser(userId: string): Promise<User | null> {
  try {
    if (!userId) {
      throw new Error('User id is required');
    }

    const { db } = appwriteConfig;

    const user = await db.getDocument<User>(
      Constants.DB_NAME,
      Constants.USERS_COLLECTION,
      userId
    );

    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (err) {
    return null;
  }
}
