import { useQuery } from "@tanstack/react-query";
import { getDashboardOverview } from "../api/dashboardOverview.api";

export const useDashboardOverview = () => {
  return useQuery({
    queryKey: ["dashboardOverview"],
    queryFn: getDashboardOverview,
  });
};
