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

export interface UpdateShortReviewRequest {
  rating: number;
  content: string;
}

// Response types
export interface BaseResponse {
  isSuccess: boolean;
  code: string;
  message: string;
}

export interface ShortReviewResponse extends BaseResponse {
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

export interface ShortReviewListResponse extends BaseResponse {
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
  content: string;
  rating: number;
  user: {
    userId: number;
    // id: number;
    nickname: string;
    profileImage: string;
  };
  likes: number;
  dislikes: number;
  isLiked: boolean;
  isDisliked: boolean;
}

export interface PlaceResponse extends BaseResponse {
  result: PlaceData;
}

export interface UpdateShortReviewResponse extends BaseResponse {
  result: string;
}

export interface DeleteShortReviewResponse extends BaseResponse {
  result: string;
}
