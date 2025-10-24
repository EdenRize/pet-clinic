import { Client } from "models/clients.interface";
import { PetType } from "models/pet-type.interface";

const { CAT, DOG, PARROT } = PetType;

export const clients: Client[] = [
  {
    name: "John Doe",
    phone: "555-1234",
    petName: "Buddy",
    petAge: 3,
    petType: DOG,
  },
  {
    name: "Jane Smith",
    phone: "555-5678",
    petName: "Whiskers",
    petAge: 2,
    petType: CAT,
  },
  {
    name: "Alice Johnson",
    phone: "555-8765",
    petName: "Goldie",
    petAge: 1,
    petType: PARROT,
  },
];
