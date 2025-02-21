import instance from '@/api/axios';
import axios from 'axios';
import { DeleteEventsResponse } from '@/types/like/delete-events';
import { tokenStorage } from '@/utils/token';

export const deleteEvents = async (eventIds: number[]): Promise<DeleteEventsResponse> => {
  const token = tokenStorage.getAccessToken();
  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }

  try {
    console.log('삭제 요청 eventIds:', eventIds);

    const { data } = await instance.delete<DeleteEventsResponse>('/event-likes', {
      params: {
        eventIds: eventIds.join(','), // 배열을 쉼표로 구분된 문자열로 변환
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('삭제 API 응답:', data);
    return data;
  } catch (error) {
    console.error('Delete events 상세 에러:', error);

    // 토큰 만료 시 처리
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      tokenStorage.clearTokens();
      window.location.href = '/login';
    }

    // Axios 에러 상세 로깅
    if (axios.isAxiosError(error)) {
      console.error('Axios 에러 상세:', {
        status: error.response?.status,
        data: error.response?.data,
      });
    }

    throw error;
  }
};
