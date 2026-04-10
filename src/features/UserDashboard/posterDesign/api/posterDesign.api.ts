import { axiosInstance } from "@/lib/instance/axios-instance";
import {
  IAiGenerateRequest,
  IAiGenerateResponse,
  IAiJobDetailsResponse,
  IPosterInitiateResponse,
  IPosterResultResponse,
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

export const initiatePosterGeneration = async (
  data: FormData,
): Promise<IPosterInitiateResponse> => {
  const response = await axiosInstance.post(
    "/generations/poster/initiate",
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return response.data;
};

export const getPosterResult = async (
  generationId: string,
): Promise<IPosterResultResponse> => {
  const response = await axiosInstance.post(
    `/generations/poster/result/${generationId}`,
  );
  return response.data;
};
