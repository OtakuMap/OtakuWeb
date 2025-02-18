import publicInstance from '@/api/publicInstance';
import instance from '@/api/axios';
import { PopularEventsResponse } from '@/types/main/event';
import { tokenStorage } from '@/utils/token';

export const getPopularEvents = async (): Promise<PopularEventsResponse> => {
  try {
    const accessToken = tokenStorage.getAccessToken();
    const userId = tokenStorage.getUserId();
    const isAuthenticated = !!(accessToken && userId);

    // 인증된 사용자는 instance를 통해 자동으로 Authorization 헤더가 포함됨
    const axiosInstance = isAuthenticated ? instance : publicInstance;

    const response = await axiosInstance.get<PopularEventsResponse>('/events/popular');

    if (!response.data || !response.data.result) {
      throw new Error('No data available');
    }

    return response.data;
  } catch (error) {
    console.error('Popular events fetch error:', error);
    throw error;
  }
};

// export const toggleEventLike = async (eventId: number): Promise<EventLikeResponse> => {
//   try {
//     const userId = tokenStorage.getUserId();
//     if (!userId) {
//       throw new Error('User not authenticated');
//     }

//     const response = await instance.post<EventLikeResponse>(`/events/${eventId}/like`);
//     return response.data;
//   } catch (error) {
//     console.error('Event like toggle error:', error);
//     throw error;
//   }
// };
