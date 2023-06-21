import Passage from '@passageidentity/passage-node';
import { cookies } from 'next/headers';

export const passage = new Passage({
  appID: process.env.NEXT_PUBLIC_PASSAGE_APP_ID!,
  apiKey: process.env.PASSAGE_API_KEY,
});

export async function getAuthenticatedUserFromSession(): Promise<
  string | null
> {
  const cookieStore = cookies();

  const authToken = cookieStore.get('psg_auth_token')?.value;

  if (!authToken) {
    return null;
  }

  try {
    const userId = await passage.validAuthToken(authToken);

    if (!userId) {
      return null;
    }

    return userId;
  } catch (err) {
    console.log(`Error authenticating request: ${err}`);
    return null;
  }
}
