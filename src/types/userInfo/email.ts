// types/userInfo/email.ts

// 이메일 변경 요청 타입
export interface UpdateEmailRequest {
  email: string;
}

// 이메일 변경 응답 타입
export interface UpdateEmailResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}
