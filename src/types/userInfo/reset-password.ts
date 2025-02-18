export interface ResetPasswordRequest {
  userId: string;
  password: string;
  passwordCheck: string;
}

export interface ResetPasswordResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}
