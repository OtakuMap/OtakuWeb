// types/event/review.ts

export interface ReviewPhotoUrl {
  id: number;
  uuid: string;
  fileName: string;
  fileUrl: string;
}

export interface EventReview {
  id: number;
  title: string;
  reviewPhotoUrl: ReviewPhotoUrl;
}

export interface EventReviewListResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    eventReviews: EventReview[];
    totalPages: number;
    totalElements: number;
    isFirst: boolean;
    isLast: boolean;
  };
}
