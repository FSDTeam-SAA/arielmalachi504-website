import { axiosInstance } from "@/lib/instance/axios-instance";

export interface IUserProfile {
  _id: string;
  name: string;
  email: string;
  role: string;
  profileImage: string;
  hasActiveSubscription: boolean;
  subscriptionExpireDate: string;
  planId: string;
  isSubscribed: boolean;
  credits: number;
  expiryDate: string;
  subscribedDate: string;
}

export interface IProfileResponse {
  status: boolean;
  message: string;
  data: IUserProfile;
}

export const getUserProfile = async (): Promise<IProfileResponse> => {
  const response = await axiosInstance.get("/user/me");
  return response.data;
};

// Subscription plans API
export interface ISubscriptionPlan {
  _id: string;
  name: string;
  monthlyPrice: number;
  description: string;
  credits: number;
  features: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ISubscriptionResponse {
  status: boolean;
  message: string;
  data: ISubscriptionPlan[];
}

export const getSubscriptionPlans =
  async (): Promise<ISubscriptionResponse> => {
    const response = await axiosInstance.get("/subscription");
    return response.data;
  };

export interface ISubscribeResponse {
  status: boolean;
  message: string;
  data: {
    sessionUrl: string;
  };
}

export const subscribeToPlan = async (
  planId: string,
): Promise<ISubscribeResponse> => {
  const response = await axiosInstance.post(
    `/subscription/subscribe/${planId}`,
  );
  return response.data;
};
