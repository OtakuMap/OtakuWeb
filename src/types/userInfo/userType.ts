export interface UserInfoResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    profileImageUrl: string;
    nickname: string;
    email: string;
    donation: number;
    community_activity: boolean;
    event_benefits_info: boolean;
  };
}

// API 응답의 result 타입을 별도로 정의
export interface UserInfo {
  profileImageUrl: string;
  nickname: string;
  email: string;
  donation: number;
  community_activity: boolean;
  event_benefits_info: boolean;
}
