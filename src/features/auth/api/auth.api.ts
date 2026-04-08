// src/features/auth/api/auth.api.ts

import { axiosInstance } from "@/lib/instance/axios-instance";
import {
  IForgetPasswordRequest,
  IForgetPasswordResponse,
  IRegisterRequest,
  IRegisterResponse,
} from "../types/auth.types";

export * from "../types/auth.types";

export const register = async (
  data: IRegisterRequest,
): Promise<IRegisterResponse> => {
  const response = await axiosInstance.post("/auth/register", data);
  return response.data;
};

export const forgetPassword = async (
  data: IForgetPasswordRequest,
): Promise<IForgetPasswordResponse> => {
  const response = await axiosInstance.post("/auth/forget-password", data);
  return response.data;
};
