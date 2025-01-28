export interface LoginRequest {
  userId: string;
  password: string;
}

export interface LoginResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: {
    id: number;
    accessToken: string;
    refreshToken: string;
  };
}
