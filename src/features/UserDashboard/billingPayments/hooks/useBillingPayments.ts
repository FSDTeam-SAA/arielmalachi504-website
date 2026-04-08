import { useQuery } from "@tanstack/react-query";
import {
  getSubscriptionPlans,
  getUserProfile,
} from "../api/billingPayments.api";

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });
};

export const useSubscriptionPlans = () => {
  return useQuery({
    queryKey: ["subscriptionPlans"],
    queryFn: getSubscriptionPlans,
  });
};
