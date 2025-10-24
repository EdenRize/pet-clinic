import { PetType } from "./pet-type.interface";

export interface Client {
  name: string;
  phone: string;
  petName: string;
  petAge: number;
  petType: PetType;
}
