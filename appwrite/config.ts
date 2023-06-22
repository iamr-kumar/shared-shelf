import appwrite from 'node-appwrite';

const client = new appwrite.Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!);

const db = new appwrite.Databases(client);

export const appwriteConfig = {
  appwrtieClient: client,
  db,
};
