import { axiosInstance } from "@/lib/instance/axios-instance";

export const initiateLogoGeneration = async (data: FormData) => {
  const response = await axiosInstance.post(
    "/generations/logo/initiate",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};

export const fetchLogoResult = async (generationId: string) => {
  const response = await axiosInstance.post(
    `/generations/logo/result/${generationId}`,
  );
  return response.data;
};
