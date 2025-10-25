import { createClient } from "@/lib/clients/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "models/query-keys.enum";

export const useCreateClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CLIENTS] });
    },
  });
};
