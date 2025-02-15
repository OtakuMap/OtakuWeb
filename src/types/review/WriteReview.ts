// types/review/WriteReview.ts

// Request types
export interface WriteReviewRequest {
  userId: number;
  placeId: number;
  title: string;
  content: string;
  reviewType: string;
  animation: string;
  visibility: '전체 열람가능' | '구매자만 열람가능';
  routes: { id: number; value: string }[];
  imageUrl?: string | null; // 선택적 속성으로 추가
}

// Response types
export interface WriteReviewResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    reviewId: number;
    title: string;
    content: string;
    createdAt: string;
  };
}

// Error type
export interface WriteReviewError {
  code: string;
  message: string;
}
