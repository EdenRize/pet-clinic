import { Collections } from "pages/api/collections.enum";
import clientPromise from "./db";
import { IClient } from "./models/clients.interface";

export const getClientsDatabase = async () => {
  const client = await clientPromise;
  return client.db(Collections.CLIENTS).collection<IClient>(Collections.CLIENTS);
};
