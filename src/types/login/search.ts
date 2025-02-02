// 유저 아이디 찾기기
export interface searchIdResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result?: {
        userId: string;
      };
  }