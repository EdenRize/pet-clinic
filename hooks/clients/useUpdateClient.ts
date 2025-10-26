import { updateClient } from "@/lib/clients/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "models/query-keys.enum";

export const useUpdateClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CLIENTS] });
    },
  });
};