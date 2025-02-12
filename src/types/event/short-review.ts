export interface ShortReviewRequest {
  userId: number;
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

// New types for review list
export interface ProfileImage {
  id: number;
  uuid: string;
  fileName: string;
  fileUrl: string;
}

export interface EventShortReview {
  id: number;
  content: string;
  rating: number;
  profileImage: ProfileImage;
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
