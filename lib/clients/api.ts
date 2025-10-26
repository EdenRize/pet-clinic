import axios from "axios";
import { IClient } from "../models/clients.interface";

export const fetchClients = async (): Promise<IClient[]> => {
  try {
    const response = await axios({ url: "/api/clients", method: "GET" });

    if (!response.status) {
      throw new Error(`Failed to fetch clients: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createClient = async (client: IClient): Promise<IClient> => {
  try {
    const response = await axios({
      url: "/api/clients",
      data: client,
      method: "POST",
    });
    if (!response.status) {
      throw new Error(`Failed to create a client: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateClient = async (client: IClient): Promise<IClient> => {
  try {
    const response = await axios({
      url: "/api/clients",
      data: client,
      method: "PUT",
    });
    if (!response.status) {
      throw new Error(`Failed to update client: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteClient = async (clientId: string): Promise<void> => {
  try {
    const response = await axios({
      url: `/api/clients?id=${clientId}`,
      method: "DELETE",
    });
    if (!response.status) {
      throw new Error(`Failed to delete client: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};
