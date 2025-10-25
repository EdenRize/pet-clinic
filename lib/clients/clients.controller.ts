import clientPromise from "../db";
import { IClient } from "../models/clients.interface"; // your TypeScript type

export const getAllClients = async (): Promise<IClient[]> => {
  const client = await clientPromise;
  const db = client.db("clients");
  const clients = await db.collection<IClient>("clients").find({}).toArray();
  return clients;
};
