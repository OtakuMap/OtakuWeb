// api/main/review.ts
import publicInstance from '@/api/publicInstance';
import { TopReviewsResponse } from '@/types/main/review';
import { AxiosError } from 'axios';

export const getTopReviews = async () => {
  try {
    const response = await publicInstance.get<TopReviewsResponse>('/reviews/top7');
    console.log('Top Reviews API Response:', {
      status: response.status,
      headers: response.headers,
      data: response.data,
      isSuccess: response.data?.isSuccess,
      result: response.data?.result,
    });

    if (!response.data || !response.data.result || !response.data.result.reviews) {
      // 임시 더미 데이터 반환
      return {
        isSuccess: true,
        code: 'COMMON200',
        message: '성공입니다.',
        result: {
          reviews: Array(7)
            .fill(null)
            .map((_, index) => ({
              id: index + 1,
              title: `테스트 리뷰 ${index + 1}`,
              reviewImage: {
                id: index + 1,
                uuid: `test-${index + 1}`,
                fileName: `test-${index + 1}.jpg`,
                fileUrl: `https://picsum.photos/200/300?random=${index + 1}`,
              },
              view: 100 + index * 10,
            })),
        },
      };
    }

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{
      isSuccess: boolean;
      code: string;
      message: string;
      result: string;
    }>;

    console.error('Failed to fetch top reviews:', {
      status: axiosError.response?.status,
      statusText: axiosError.response?.statusText,
      data: axiosError.response?.data,
    });

    // 에러가 발생해도 더미 데이터 반환
    return {
      isSuccess: true,
      code: 'COMMON200',
      message: '성공입니다.',
      result: {
        reviews: Array(7)
          .fill(null)
          .map((_, index) => ({
            id: index + 1,
            title: `테스트 리뷰 ${index + 1}`,
            reviewImage: {
              id: index + 1,
              uuid: `test-${index + 1}`,
              fileName: `test-${index + 1}.jpg`,
              fileUrl: `https://picsum.photos/200/300?random=${index + 1}`,
            },
            view: 100 + index * 10,
          })),
      },
    };
  }
};
