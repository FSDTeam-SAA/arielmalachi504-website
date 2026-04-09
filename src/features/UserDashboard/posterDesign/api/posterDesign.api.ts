import { axiosInstance } from "@/lib/instance/axios-instance";
import {
  IAiGenerateRequest,
  IAiGenerateResponse,
  IAiJobDetailsResponse,
} from "../types/posterDesign.types";

export const aiGeneratePosterFields = async (
  data: IAiGenerateRequest,
): Promise<IAiGenerateResponse> => {
  const response = await axiosInstance.post(
    "/generations/poster/fields/ai-generate",
    data,
  );
  return response.data;
};

export const getAiJobDetails = async (
  jobId: string,
): Promise<IAiJobDetailsResponse> => {
  const response = await axiosInstance.get(
    `/generations/poster/fields/${jobId}`,
  );
  return response.data;
};
