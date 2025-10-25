import { useQuery } from "@tanstack/react-query";
import { fetchClients } from "@/lib/clients/api";
import { QueryKeys } from "models/query-keys.enum";

export const useClientsQuery = () => {
  return useQuery({
    queryKey: [QueryKeys.CLIENTS],
    queryFn: fetchClients,
  });
};
