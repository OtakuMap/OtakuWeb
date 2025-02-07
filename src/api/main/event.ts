import publicInstance from '@/api/publicInstance';
import { PopularEventsResponse } from '@/types/main/event';
import { AxiosError } from 'axios';

export const getPopularEvents = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 딜레이
    const response = await publicInstance.get<PopularEventsResponse>('/events/popular');

    if (!response.data || !response.data.result) {
      // 임시 더미 데이터 반환
      return {
        isSuccess: true,
        code: 'COMMON200',
        message: '성공입니다.',
        result: Array(8)
          .fill(null)
          .map((_, index) => ({
            id: index + 1,
            title: `이벤트 ${index + 1}`,
            startDate: '2024-01-01',
            endDate: '2024-12-31',
            thumbnail: {
              id: index + 1,
              uuid: `event-${index + 1}`,
              fileName: `event-${index + 1}.jpg`,
              fileUrl: `https://picsum.photos/300/400?random=${index + 1}`,
            },
          })),
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

    console.error('Failed to fetch popular events:', {
      status: axiosError.response?.status,
      statusText: axiosError.response?.statusText,
      data: axiosError.response?.data,
    });

    // 에러 발생시 더미 데이터 반환
    return {
      isSuccess: true,
      code: 'COMMON200',
      message: '성공입니다.',
      result: Array(8)
        .fill(null)
        .map((_, index) => ({
          id: index + 1,
          title: `이벤트 ${index + 1}`,
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          thumbnail: {
            id: index + 1,
            uuid: `event-${index + 1}`,
            fileName: `event-${index + 1}.jpg`,
            fileUrl: `https://picsum.photos/300/400?random=${index + 1}`,
          },
        })),
    };
  }
};
