"use server";

import { Client, Account, Users } from "node-appwrite";

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
    .setKey(process.env.NEXT_APPWRITE_KEY);
  const account = new Account(client);
  const users = new Users(client);
  return { client, account, users };
}

export async function createSessionClient(sessionValue) {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);

  if (sessionValue) {
    client.setSession(sessionValue || "");
  }
  const account = new Account(client);
  return { client, account };
}
