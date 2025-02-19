export interface ResetPasswordRequest {
  password: string;
}

export interface ResetPasswordResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}
