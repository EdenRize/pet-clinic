import { useQuery } from "@tanstack/react-query";
import { fetchClients } from "@/lib/clients/api";

export const useClients = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
