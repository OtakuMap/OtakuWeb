// api/review/review.ts
import instance from '@/api/axios';
import { ApiResponse, ReviewDetail, ReviewType } from '@/types/review/review';

/**
 * 리뷰 상세 정보를 가져오는 함수
 * @param reviewId 리뷰 ID
 * @param type 리뷰 타입 (기본값: 데이터에 따라 결정됨)
 * @returns API 응답
 */
export const getReviewDetail = (reviewId: number, type?: ReviewType) => {
  // type이 제공되지 않은 경우, 백엔드가 데이터에 맞게 처리하도록 함
  const params = type ? { type } : {};

  return instance
    .get<ApiResponse<ReviewDetail>>(`/reviews/${reviewId}`, {
      params: params,
    })
    .then((response) => response.data);
};
