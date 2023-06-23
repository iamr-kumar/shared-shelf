import { passage } from '@/utils/passage';
import { headers } from 'next/headers';
import { getAppwriteUser } from '../users/get';
import { createAppwriteUser } from '../users/create';
import { User } from '../users/model';
import { createStarterShelfs } from '../shelf/create';

export async function checkAndCreateUser(): Promise<User | null> {
  const header = headers();

  try {
    const userId = header.get('x-user-id');

    if (userId) {
      let appwriteUser = await getAppwriteUser(userId);
      // If new user
      if (!appwriteUser) {
        const userData = await passage.user.get(userId);
        appwriteUser = await createAppwriteUser(userId, userData.email);
        await createStarterShelfs(userId);
      }
      return appwriteUser;
    }
    console.log(`User id ${userId} not found`);
    return null;
  } catch (err) {
    console.log(`Error getting user`);
    return null;
  }
}
