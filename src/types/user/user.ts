export interface UserProfile {
  profileImageUrl: string;
  nickname: string;
  email: string;
  donation: number;
  community_activity: boolean;
  event_benefits_info: boolean;
}

export interface UserResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: UserProfile;
}
