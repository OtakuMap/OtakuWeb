// types/review/PlaceReview.ts

export interface ReviewImage {
  id: number;
  uuid: string;
  fileName: string;
  fileUrl: string;
}

export interface Review {
  reviewId: number;
  placeId: number;
  title: string;
  content: string;
  view: number;
  createdAt: string;
  reviewImage: ReviewImage;
  type: string;
}

export interface AnimationGroup {
  animationId: number;
  animationName: string;
  reviews: Review[];
  totalReviews: number;
}

export interface ReviewResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    placeId: number;
    placeName: string;
    avgRating: number;
    totalReviews: number;
    animationGroups: AnimationGroup[];
  };
}

export type SortType = 'latest' | 'views';
