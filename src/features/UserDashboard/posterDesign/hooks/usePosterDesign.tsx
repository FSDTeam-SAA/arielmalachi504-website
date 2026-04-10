import { useMutation, useQuery } from "@tanstack/react-query";
import {
  aiGeneratePosterFields,
  getAiJobDetails,
  getPosterResult,
  initiatePosterGeneration,
} from "../api/posterDesign.api";
import {
  IParsedAiPosterFields,
  IAiGenerateRequest,
} from "../types/posterDesign.types";
import { toast } from "sonner";
import { AxiosError } from "axios";

const parseAiOutput = (rawOutput: string): IParsedAiPosterFields => {
  const jsonMatch =
    rawOutput.match(/```json\n([\s\S]*?)\n```/) ||
    rawOutput.match(/\{[\s\S]*\}/);
  const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : rawOutput;

  try {
    const parsed = JSON.parse(jsonString);
    return {
      title: parsed.title || "",
      subtitle: parsed.subtitle || "",
      design_style: parsed.design_style || "",
    };
  } catch (e) {
    console.error("Failed to parse AI output JSON", e);
    return { title: "", subtitle: "", design_style: "" };
  }
};

export const useAiGenerateFields = (
  onSuccessCallback?: (data: IParsedAiPosterFields) => void,
) => {
  return useMutation({
    mutationFn: async (req: IAiGenerateRequest) => {
      const initResp = await aiGeneratePosterFields(req);
      if (!initResp.success) {
        throw new Error(initResp.message || "Failed to start AI generation");
      }

      const jobId = initResp.data.generated_fields;
      let status = "processing";
      let finalDetails = null;

      while (status !== "completed") {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const details = await getAiJobDetails(jobId);
        if (!details.success) {
          throw new Error(details.message || "Failed to fetch job details");
        }
        status = details.data.status;
        finalDetails = details;
        if (status === "failed") {
          throw new Error(
            details.data.data.error || "AI generation job failed",
          );
        }
      }

      if (!finalDetails) throw new Error("No data received from AI");
      return parseAiOutput(finalDetails.data.data.raw_output);
    },
    onSuccess: (data) => {
      toast.success("AI content generated successfully!");
      if (onSuccessCallback) {
        onSuccessCallback(data);
      }
    },
    onError: (error: AxiosError<{ message: string }> | Error) => {
      const message =
        error instanceof AxiosError
          ? error.response?.data?.message
          : error.message;
      toast.error(message || "An error occurred while generating AI content.");
    },
  });
};

export const useInitiatePoster = () => {
  return useMutation({
    mutationFn: (data: FormData) => initiatePosterGeneration(data),
    onError: (error: AxiosError<{ message: string }> | Error) => {
      const message =
        error instanceof AxiosError
          ? error.response?.data?.message
          : error.message;
      toast.error(message || "Failed to initiate poster generation.");
    },
  });
};

export const usePosterResult = (generationId: string | null) => {
  return useQuery({
    queryKey: ["posterResult", generationId],
    queryFn: () => getPosterResult(generationId!),
    enabled: !!generationId,
    refetchInterval: (query) => {
      const isSuccess = query.state.data?.data?.success;
      if (isSuccess) return false;
      return 3000;
    },
  });
};
