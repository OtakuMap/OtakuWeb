// types/review/WriteReview.ts

// Route Item Type
export interface RouteItem {
  name: string;
  lat: number;
  lng: number;
  detail: string;
  order: number;
}

// Request types
export interface WriteReviewRequest {
  title: string;
  content: string;
  reviewType: 'EVENT' | 'PLACE';
  animeId: number;
  visibility: 'PUBLIC' | 'PURCHASERS_ONLY'; // 새로 추가
  routeItems: RouteItem[];
}

// Response types
export interface WriteReviewResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    reviewId: number;
    title: string;
    createdAt: string;
  };
}

// Error type
export interface WriteReviewError {
  code: string;
  message: string;
}
