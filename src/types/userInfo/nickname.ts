export interface NicknameRequest {
  nickname: string;
}

export interface NicknameResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: string;
}
