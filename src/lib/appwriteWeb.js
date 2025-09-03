// appwriteWeb.js
import { Client, Account, ID, TablesDB } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
  .setDevKey("a3d9e6599c5bf54aed4d977e56c5c2937b6338e41c07e941d7678dac7f1303e9f25c2ee19db2d988f6339de298375a0360f76cccf4096d5537d02274c95fe5067f9f33c6eec6f796cd2211f621ce44f72fd2578b9366cf35e85749e1efc72dc0e0d00d8e794d2ae1d2ac6f11a0b86561bfa8425fdc31a59584883004a2fe0100")
const account = new Account(client);

const tablesDB = new TablesDB(client);

export { client, account, tablesDB };
