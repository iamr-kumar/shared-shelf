import { appwriteConfig } from '@/appwrite/config';
import { Constants } from '@/appwrite/constants';
import { User } from '@/appwrite/users/model';
import { Query } from 'node-appwrite';

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

export async function addShelfForUser(userEmail: string, shelfId: string) {
  const { db } = appwriteConfig;

  try {
    if (!userEmail) {
      throw new Error('User email is required');
    }
    if (!shelfId) {
      throw new Error('Shelf id is required');
    }
    const { documents: users } = await db.listDocuments<User>(
      Constants.DB_NAME,
      Constants.USERS_COLLECTION,
      [Query.equal('email', userEmail)]
    );
    const [user] = users;
    await db.updateDocument<User>(
      Constants.DB_NAME,
      Constants.USERS_COLLECTION,
      users[0].id,
      { accessToShelfIds: [...user.accessToShelfIds, shelfId] }
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
}
