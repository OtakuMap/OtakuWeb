// types/event/short-review.ts
export interface ShortReviewRequest {
  userId: number;
  rating: number;
  content: string;
}

export interface UpdateShortReviewRequest {
  rating: number;
  content: string;
}

export interface ShortReviewResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    id: number;
    reviewId: number;
    content: string;
    rating: number;
    createdAt: string;
  };
}

export interface ProfileImage {
  id: number;
  uuid: string;
  fileName: string;
  fileUrl: string;
}

export interface EventShortReview {
  id: number;
  user: {
    userId: number;
    nickname: string;
    profileImage: string;
  };
  content: string;
  rating: number;
  profileImage: {
    id: number;
    uuid: string;
    fileName: string;
    fileUrl: string;
  };
  likes?: number;
  dislikes?: number;
  isLiked?: boolean;
  isDisliked?: boolean;
}

export interface EventShortReviewListResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    eventShortReviewList: EventShortReview[];
    currentPage: number;
    totalPages: number;
  };
}

export interface DeleteShortReviewResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}

export interface UpdateShortReviewResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}
