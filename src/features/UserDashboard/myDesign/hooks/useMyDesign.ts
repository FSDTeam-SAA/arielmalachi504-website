import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getGenerationHistory, deleteGeneration } from "../api/myDesign.api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useMyDesign = (type: string = "all", limit: number = 20) => {
  return useQuery({
    queryKey: ["generationHistory", type, limit],
    queryFn: () => getGenerationHistory(type, limit),
  });
};

export const useDeleteDesign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (generationId: string) => deleteGeneration(generationId),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Design deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["generationHistory"] });
      } else {
        toast.error(data.message || "Failed to delete design");
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while deleting the design",
      );
    },
  });
};
