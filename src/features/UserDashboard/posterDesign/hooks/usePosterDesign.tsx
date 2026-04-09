import { useMutation } from "@tanstack/react-query";
import {
  aiGeneratePosterFields,
  getAiJobDetails,
} from "../api/posterDesign.api";
import {
  IParsedAiPosterFields,
  IAiGenerateRequest,
} from "../types/posterDesign.types";
import { toast } from "sonner";
import { AxiosError } from "axios";

const parseAiOutput = (rawOutput: string): IParsedAiPosterFields => {
  // Extract JSON from markdown code block or find the first/last curly brace
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
      // Step 1: Start AI generation
      const initResp = await aiGeneratePosterFields(req);
      if (!initResp.success) {
        throw new Error(initResp.message || "Failed to start AI generation");
      }

      const jobId = initResp.data.generated_fields;

      // Step 2 & 3: Poll for completion
      let status = "processing";
      let finalDetails = null;

      while (status !== "completed") {
        // Wait for 2 seconds before polling
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

      // Step 4: Parse and return results
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
