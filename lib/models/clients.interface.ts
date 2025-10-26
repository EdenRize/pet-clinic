import { PetType } from "./pet-type.enum";
import { ObjectId } from "mongodb";

export interface IClient {
  _id?: ObjectId;
  name: string;
  phone: string;
  petName: string;
  petAge: number;
  petType: PetType;
}
