// api/review/WriteReview.ts
import { AxiosError } from 'axios';
import instance from '@/api/axios';
import { WriteReviewRequest, WriteReviewResponse } from '@/types/review/WriteReview';

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

    // 토큰을 직접 가져와서 헤더에 추가 (localStorage에서 직접 접근)
    const token = localStorage.getItem('accessToken');
    console.log('Using token for review submission:', token);

    const response = await instance.post<WriteReviewResponse>(REVIEW_API_ENDPOINT, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Review submission error:', error);
    if (error instanceof AxiosError) {
      console.error('Error response:', error.response?.data);
      const errorMessage = error.response?.data?.message || '리뷰 작성 중 오류가 발생했습니다.';
      throw new Error(errorMessage);
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};

// Hook implementation
import { useState } from 'react';

export const useWriteReview = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitReview = async (reviewData: WriteReviewRequest, images?: File[]) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await writeReview(reviewData, images);
      return response;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : '리뷰 작성 중 오류가 발생했습니다.';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitReview,
    isLoading,
    error,
  };
};
