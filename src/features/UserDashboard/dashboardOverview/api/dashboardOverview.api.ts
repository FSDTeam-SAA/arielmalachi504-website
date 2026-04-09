import { axiosInstance } from "@/lib/instance/axios-instance";
import { IDashboardOverviewResponse } from "../types/dashboardOverview.types";

export const getDashboardOverview =
  async (): Promise<IDashboardOverviewResponse> => {
    const response = await axiosInstance.get("/generations/dashboard");
    return response.data;
  };
