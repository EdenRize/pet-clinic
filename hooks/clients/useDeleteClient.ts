import { deleteClient } from "@/lib/clients/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "models/query-keys.enum";

export const useDeleteClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CLIENTS] });
    },
  });
};