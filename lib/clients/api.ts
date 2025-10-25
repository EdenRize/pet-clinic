import { IClient } from "../models/clients.interface";

export const fetchClients = async (): Promise<IClient[]> => {
  const response = await fetch("/api/clients");
  
  if (!response.ok) {
    throw new Error(`Failed to fetch clients: ${response.status}`);
  }
  
  return response.json();
};