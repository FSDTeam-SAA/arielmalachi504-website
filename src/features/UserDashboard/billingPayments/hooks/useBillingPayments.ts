import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSubscriptionPlans,
  getUserProfile,
  subscribeToPlan,
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

export const useSubscribeToPlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: subscribeToPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
};
