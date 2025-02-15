// api/review/WriteReview.ts

import { AxiosError } from 'axios';
import instance from '@/api/axios';
import { WriteReviewRequest, WriteReviewResponse } from '@/types/review/WriteReview';

const REVIEW_API_ENDPOINT = '/review';

export const writeReview = async (reviewData: WriteReviewRequest): Promise<WriteReviewResponse> => {
  try {
    const response = await instance.post<WriteReviewResponse>(REVIEW_API_ENDPOINT, reviewData);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || '리뷰 작성 중 오류가 발생했습니다.';
      throw new Error(errorMessage);
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};

// Hook implementation for the ReviewPage component
import { useState } from 'react';
import { tokenStorage } from '@/utils/token';

export const useWriteReview = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitReview = async (reviewData: Omit<WriteReviewRequest, 'userId'>) => {
    setIsLoading(true);
    setError(null);

    try {
      const userId = tokenStorage.getUserId();

      if (!userId) {
        throw new Error('로그인이 필요합니다.');
      }

      const response = await writeReview({
        ...reviewData,
        userId: Number(userId),
      });

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
