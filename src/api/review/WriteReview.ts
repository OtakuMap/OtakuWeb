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

    // JSON 데이터를 문자열로 직접 추가 (Blob 사용하지 않음)
    formData.append('request', JSON.stringify(reviewData));

    // 이미지 파일들 추가 (하나씩)
    if (images?.length) {
      images.forEach((image) => {
        formData.append('images', image);
      });
    }

    // Content-Type 헤더를 명시적으로 설정하지 않음 (axios가 자동으로 설정)
    const response = await instance.post<WriteReviewResponse>(REVIEW_API_ENDPOINT, formData);

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
