import { NextApiRequest, NextApiResponse } from "next";
import { getClientsDatabase } from "@/lib/db-helper";
import { IClient } from "@/lib/models/clients.interface";
import { RequestMethod } from "./models/request-method.enum";
import { ObjectId } from "mongodb";

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
        res.status(200).json(insertedClient!);
      } catch (error) {
        res.status(500).json({ error: "Failed to create client" });
      }
      break;

    case RequestMethod.PUT:
      try {
        const db = await getClientsDatabase();
        const clientData: IClient = req.body;
        const { _id, ...updateData } = clientData;
        
        if (!_id) {
          res.status(400).json({ error: "Client ID is required for update" });
          return;
        }

        const objectId = new ObjectId(_id);
        const result = await db.updateOne(
          { _id: objectId },
          { $set: updateData }
        );

        if (result.matchedCount === 0) {
          res.status(404).json({ error: "Client not found" });
          return;
        }

        const updatedClient = await db.findOne({ _id: objectId });
        res.status(200).json(updatedClient!);
      } catch (error) {
        res.status(500).json({ error: "Failed to update client" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
