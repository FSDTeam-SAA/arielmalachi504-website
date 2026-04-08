// src/features/UserDashboard/settings/hooks/useSettings.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile, updateUserName } from "../api/settings.api";

// get profile
export const useUserProfileSettings = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });
};

// update name
export const useUpdateUserName = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserName,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
};
