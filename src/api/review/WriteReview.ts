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
    // 먼저 이미지 업로드 처리
    let imageUrls: string[] = [];

    if (images?.length) {
      imageUrls = await Promise.all(
        images.map(async (image) => {
          const imageFormData = new FormData();
          // 백엔드 요구사항에 맞게 폴더 정보 추가
          imageFormData.append('folder', JSON.stringify({ folder: 'review' }));
          imageFormData.append('image', image);

          // instance에 이미 /api가 포함되어 있으므로 /images로 요청
          const imageResponse = await instance.post('/images', imageFormData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          // 이미지 URL 반환 (응답 구조에 맞게 수정 필요)
          return imageResponse.data.result;
        }),
      );
    }

    // 이미지 URL을 reviewData에 추가
    const updatedReviewData = {
      ...reviewData,
      imageUrls: imageUrls, // 백엔드 API 요구사항에 맞게 필드명 조정
    };

    // 리뷰 데이터 전송 (REVIEW_API_ENDPOINT는 '/reviews'이므로 전체 경로는 '/api/reviews')
    const response = await instance.post<WriteReviewResponse>(
      REVIEW_API_ENDPOINT,
      updatedReviewData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

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
