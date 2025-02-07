// api/review/review.ts
import instance from '@/api/axios';
import { ApiResponse, ReviewDetail, ReviewType } from '@/types/review/review';

export const getReviewDetail = (reviewId: number, type: ReviewType = 'PLACE') => {
  return instance
    .get<ApiResponse<ReviewDetail>>(`/reviews/${reviewId}`, {
      params: { type },
    })
    .then((response) => response.data);
};
