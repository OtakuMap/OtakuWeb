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
    console.log('리뷰 작성 시작. 이미지 수:', images?.length || 0);

    // 이미지 URL을 저장할 배열
    const imageUrls: string[] = [];

    if (images?.length) {
      // 각 이미지를 순차적으로 업로드
      for (const image of images) {
        try {
          console.log(`이미지 업로드 시작: ${image.name}`);
          const response = await uploadImage('review', image);

          if (response.isSuccess && response.result) {
            // 백엔드 응답에서 URL 추출: "이미지가 성공적으로 업로드되었습니다. URL: 실제URL"
            const resultStr = response.result as string;
            if (resultStr.includes('URL: ')) {
              const imageUrl = resultStr.split('URL: ')[1].trim();
              console.log('추출된 이미지 URL:', imageUrl);
              imageUrls.push(imageUrl);
            }
          }
        } catch (uploadError) {
          console.error('이미지 업로드 오류:', uploadError);
        }
      }
    }

    console.log('업로드된 이미지 URL들:', imageUrls);

    // 이미지 URL이 있으면 reviewImages 배열 생성
    // 백엔드는 {id, uuid, fileName, fileUrl} 형태의 객체를 기대하지만,
    // 실제로는 URL만 전송하면 백엔드가 알아서 처리해줄 가능성이 있음
    // 정확한 형태는 백엔드 개발자와 확인 필요
    const reviewImages = imageUrls.map((url) => {
      // URL에서 UUID 추출 (파일명 부분)
      const urlParts = url.split('/');
      const fileName = urlParts[urlParts.length - 1];

      return {
        fileUrl: url,
        fileName: `review/${fileName}`,
      };
    });

    // 업로드된 이미지 정보를 리뷰 데이터에 포함
    const updatedReviewData = {
      ...reviewData,
      reviewImages: reviewImages.length > 0 ? reviewImages : undefined,
    };

    console.log('백엔드로 전송할 리뷰 데이터:', updatedReviewData);

    // 리뷰 데이터 JSON 형식으로 전송
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
