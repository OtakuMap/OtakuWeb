import { AxiosError } from 'axios';
import instance from '@/api/axios';
import { WriteReviewRequest, WriteReviewResponse } from '@/types/review/WriteReview';
import { tokenStorage } from '@/utils/token'; // tokenStorage import 추가

const REVIEW_API_ENDPOINT = '/reviews';

export const writeReview = async (
  reviewData: WriteReviewRequest,
  images?: File[],
): Promise<WriteReviewResponse> => {
  try {
    const formData = new FormData();

    // JSON 데이터를 request 키로 추가
    formData.append(
      'request',
      new Blob([JSON.stringify(reviewData)], { type: 'application/json' }),
    );

    // 이미지 파일들 추가
    if (images?.length) {
      images.forEach((image) => {
        formData.append('images', image);
      });
    }

    // 현재 토큰 가져오기
    const token = tokenStorage.getAccessToken();
    console.log('사용하는 토큰:', token); // 디버깅용

    // Authorization 헤더에 토큰 직접 추가
    const response = await instance.post<WriteReviewResponse>(REVIEW_API_ENDPOINT, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || '리뷰 작성 중 오류가 발생했습니다.';
      throw new Error(errorMessage);
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};
