export interface IDesignHistoryItem {
  _id: string;
  generationType: string;
  status: "completed" | "processing" | "failed";
  creditCost: number;
  resultUrls: string[];
  createdAt: string;
  // These might not be in the current API snippet but are useful for UI
  prompt?: string;
  style?: string;
  platform?: string;
  format?: string;
}

export interface IDesignHistoryResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IDesignHistoryItem[];
}
