import { NextApiRequest, NextApiResponse } from "next";
import { getClientsDatabase } from "@/lib/db-helper";
import { IClient } from "@/lib/models/clients.interface";
import { RequestMethod } from "./models/request-method.enum";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IClient | IClient[] | { error: string }>,
) {
  switch (req.method) {
    case RequestMethod.GET:
      try {
        const db = await getClientsDatabase();
        const clients = await db.find({}).toArray();
        res.status(200).json(clients);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch clients" });
      }
      break;

    case RequestMethod.POST:
      try {
        const db = await getClientsDatabase();
        const newClient: IClient = req.body;
        const result = await db.insertOne(newClient);
        const insertedClient = await db.findOne({ _id: result.insertedId });
        res.status(200).json(insertedClient as IClient);
      } catch (error) {
        res.status(500).json({ error: "Failed to create client" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
