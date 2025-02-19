// types/review/user.ts
export interface UserProfile {
  profileImageUrl: string;
  nickname: string;
  email: string;
  donation: number;
  community_activity: boolean;
  event_benefits_info: boolean;
}

export interface UserReview {
  reviewId: number;
  title: string;
  content: string;
  thumbnail: string;
  views: number;
  createdAt: string;
}

export interface UserReviewsResponse {
  reviews: UserReview[];
  listSize: number;
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}
