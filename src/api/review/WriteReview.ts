// api/review/WriteReview.ts
import { AxiosError } from 'axios';
import instance from '@/api/axios';
import { WriteReviewRequest, WriteReviewResponse } from '@/types/review/WriteReview';
import { uploadImage } from '@/api/review/image';

const REVIEW_API_ENDPOINT = '/reviews';

export const writeReview = async (
  reviewData: WriteReviewRequest,
  images?: File[],
): Promise<WriteReviewResponse> => {
  try {
    // 이미지가 있다면 먼저 이미지 API를 통해 업로드
    let imageUrls: string[] = [];

    if (images?.length) {
      // 이미지 업로드 API를 사용하여 각 이미지 업로드
      const uploadPromises = images.map((image) => uploadImage('review', image));

      const responses = await Promise.all(uploadPromises);

      // 각 응답에서 이미지 URL 추출
      imageUrls = responses
        .map((response) => {
          if (response.isSuccess) {
            // 응답에서 URL을 추출하는 로직
            // 예: "이미지가 성공적으로 업로드되었습니다. URL: http://example.com/image.jpg"
            const resultText = response.result;
            if (typeof resultText === 'string' && resultText.includes('URL: ')) {
              return resultText.split('URL: ')[1].trim();
            }
          }
          return '';
        })
        .filter((url) => url !== '');
    }

    // 업로드된 이미지 URL을 리뷰 데이터에 포함
    const updatedReviewData = {
      ...reviewData,
      imageUrls: imageUrls, // 백엔드가 기대하는 필드명으로 변경 가능
    };

    // 리뷰 데이터만 JSON 형식으로 전송
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
