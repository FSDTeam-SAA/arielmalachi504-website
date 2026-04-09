export interface IDashboardOverviewData {
  totalDesigns: number;
  totalPosters: number;
  totalLogos: number;
  totalCreditsUsed: number;
}

export interface IDashboardOverviewResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IDashboardOverviewData;
}
