"use server";

import { Client, Account, Databases, Users,ID } from "node-appwrite";

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
    .setKey(process.env.NEXT_APPWRITE_KEY);
  const account = new Account(client);
  const databases = new Databases(client);
  const users = new Users(client);
  return { client, account, databases, users };
}

export async function createSessionClient(session) {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
    .setSession(session || "");
  const account = new Account(client);
  const databases = new Databases(client);
  const users = new Users(client);
  return { client, account, databases, users };
}
