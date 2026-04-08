// src/features/auth/types/auth.types.ts

export interface IUser {
  _id: string;
  email: string;
  role: string;
  profileImage: string;
  refreshToken: string;
  updatedAt: string;
}

export interface IAuthData {
  user: IUser;
  accessToken: string;
}

export interface ILoginResponse {
  status: boolean;
  message: string;
  data: IAuthData;
}

export interface IRegisterRequest {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IRegisterResponse {
  status: boolean;
  message: string;
  data: unknown;
}

export interface IForgetPasswordRequest {
  email: string;
}

export interface IForgetPasswordResponse {
  status: boolean;
  message: string;
  data: unknown;
}
