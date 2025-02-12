// Place types
export interface PlaceData {
  id: number;
  name: string;
  animationId: number;
}

// Request types
export interface ShortReviewRequest {
  placeAnimationId: number;
  rating: number;
  content: string;
}

// Response types
export interface ShortReviewResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: ShortReviewResult;
}

export interface ShortReviewResult {
  reviewId: number;
  rating: number;
  content: string;
  createdAt: string;
  placeId: number;
  placeAnimationId: number;
}

export interface ShortReviewListResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: ShortReviewListResult;
}

export interface ShortReviewListResult {
  placeId: number;
  placeName: string;
  currentPage: number;
  totalPages: number;
  shortReviews: ShortReviewItem[];
}

export interface ShortReviewItem {
  id: number;
  user: {
    id: number;
    nickname: string;
  };
  content: string;
  rating: number;
  createdAt: string;
  likes: number;
  dislikes: number;
}

export interface PlaceResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: PlaceData;
}
