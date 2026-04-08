// src/features/UserDashboard/settings/api/settings.api.ts

import axiosInstance from "@/lib/instance/axios-instance";
import { IProfileResponse } from "../../billingPayments/api/billingPayments.api";

export const getUserProfile = async (): Promise<IProfileResponse> => {
  const response = await axiosInstance.get("/user/me");
  return response.data;
};

// update name
export const updateUserName = async (
  name: string,
): Promise<IProfileResponse> => {
  const response = await axiosInstance.put("/user/me", { name });
  return response.data;
};

export interface IPasswordChangeRequest {
  oldPassword: string;
  newPassword: string;
}

export interface IPasswordChangeResponse {
  status: boolean;
  message: string;
}

export const changePassword = async (
  data: IPasswordChangeRequest,
): Promise<IPasswordChangeResponse> => {
  const response = await axiosInstance.post("/auth/change-password", data);
  return response.data;
};
