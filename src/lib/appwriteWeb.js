import { Client, Account, ID, Databases } from "appwrite";

export function createWebClient(jwt) {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);
  if (jwt) {
    client.setJWT(jwt);
  }

  const account = new Account(client);
  const databases = new Databases(client);

  return { client, account, ID, databases };
}