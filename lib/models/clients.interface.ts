import { PetType } from "./pet-type.enum";

export interface IClient {
  name: string;
  phone: string;
  petName: string;
  petAge: number;
  petType: PetType;
}
