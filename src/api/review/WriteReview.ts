// api/review/WriteReview.ts
import { AxiosError } from 'axios';
import instance from '@/api/axios';
import { WriteReviewRequest, WriteReviewResponse } from '@/types/review/WriteReview';

const REVIEW_API_ENDPOINT = '/reviews';

// api/review/WriteReview.ts 수정
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

    // 이미지 파일들 추가 - 'image' 필드명 사용
    if (images?.length) {
      images.forEach((image) => {
        formData.append('image', image); // 백엔드가 기대하는 필드명 'image' 사용
      });
    }

    console.log('업로드 전 FormData 확인:', {
      requestData: JSON.stringify(reviewData),
      hasImages: images?.length > 0,
      imageNames: images?.map((img) => img.name),
    });

    const response = await instance.post<WriteReviewResponse>(REVIEW_API_ENDPOINT, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
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
