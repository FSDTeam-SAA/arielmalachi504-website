import { axiosInstance } from "@/lib/instance/axios-instance";
import { IDesignHistoryResponse } from "../types/myDesign.types";

export const getGenerationHistory = async (
  type: string = "all",
  limit: number = 20,
): Promise<IDesignHistoryResponse> => {
  const response = await axiosInstance.get("/generations/history", {
    params: {
      type,
      limit,
    },
  });
  return response.data;
};

export const deleteGeneration = async (
  generationId: string,
): Promise<{ success: boolean; message: string }> => {
  const response = await axiosInstance.delete(
    `/generations/history/${generationId}`,
  );
  return response.data;
};
