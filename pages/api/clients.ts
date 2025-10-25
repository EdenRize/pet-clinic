import { NextApiRequest, NextApiResponse } from "next";
import { getClientsDatabase } from "@/lib/db-helper";
import { IClient } from "@/lib/models/clients.interface";
import { RequestMethod } from "./models/request-method.enum";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IClient[] | { error: string }>,
) {
  if (req.method === RequestMethod.GET) {
    try {
      const db = await getClientsDatabase();
      const clients = await db.find({}).toArray();
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch clients" });
    }
  }
}
