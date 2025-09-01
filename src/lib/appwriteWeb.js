// appwriteWeb.js
import { Client, Account, ID, TablesDB } from "appwrite";

export function createWebClient(jwt) {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
    .setJWT(jwt || "");
  // if (jwt) {
  //   client.setJWT(jwt);
  // }

  const account = new Account(client);
  const tablesDB = new TablesDB(client);

  return { client, account, ID, tablesDB };
}
