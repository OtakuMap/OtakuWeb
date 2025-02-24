import instance from '@/api/axios';
import { ApiResponse, ReviewDetail, ReviewType } from '@/types/review/review';

/**
 * 리뷰 상세 정보를 가져오는 함수
 * @param reviewId 리뷰 ID
 * @param type 리뷰 타입 (기본값: 'PLACE')
 * @returns API 응답
 */
export const getReviewDetail = (reviewId: number, type: ReviewType = 'PLACE') => {
  return instance
    .get<ApiResponse<ReviewDetail>>(`/reviews/${reviewId}`, {
      params: { type },
    })
    .then((response) => response.data);
};
