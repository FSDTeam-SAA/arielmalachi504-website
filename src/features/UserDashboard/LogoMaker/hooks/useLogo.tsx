import { useMutation, useQuery } from "@tanstack/react-query";
import { initiateLogoGeneration, fetchLogoResult } from "../api/logodesign";

export const useInitiateLogo = () => {
  return useMutation({
    mutationFn: (data: FormData) => initiateLogoGeneration(data),
    onSuccess: (data) => {
      console.log("Logo Generation API Response:", data);
    },
    onError: (error) => {
      console.error("Logo Generation API Error:", error);
    },
  });
};

export const useLogoResult = (generationId: string | null) => {
  return useQuery({
    queryKey: ["logoResult", generationId],
    queryFn: () => fetchLogoResult(generationId!),
    enabled: !!generationId,
    refetchInterval: (query) => {
      const status = query.state.data?.data?.status;
      return status === "processing" ? 3000 : false;
    },
  });
};
