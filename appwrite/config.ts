import appwrite from 'node-appwrite';

const appwriteClient = new appwrite.Client();

appwriteClient
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!);

const db = new appwrite.Databases(appwriteClient);

export const appwriteConfig = {
  appwriteClient,
  db,
};
