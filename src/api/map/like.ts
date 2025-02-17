// like.ts
import instance from '@/api/axios';
import { AxiosError } from 'axios';
import { tokenStorage } from '@/utils/token';

interface LikeResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}

interface PlaceLikeRequestBody {
  animationId: number;
}

export const likesAPI = {
  // 장소 좋아요 추가
  addPlaceLike: async (placeId: number, animationId: number) => {
    try {
      const token = tokenStorage.getAccessToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const requestBody: PlaceLikeRequestBody = { animationId };
      const response = await instance.post<LikeResponse>(`/place-likes/${placeId}`, requestBody);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Place like addition error:', {
        token: tokenStorage.getAccessToken(),
        status: axiosError.response?.status,
        data: axiosError.response?.data,
      });
      throw error;
    }
  },

  // 장소 좋아요 삭제
  removePlaceLike: async (placeId: number) => {
    try {
      const token = tokenStorage.getAccessToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      // URLSearchParams 사용하여 query parameter 구성
      const params = new URLSearchParams();
      params.append('placeIds', placeId.toString());

      const response = await instance.delete<LikeResponse>('/place-likes', {
        params,
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Place like removal error:', {
        token: tokenStorage.getAccessToken(),
        status: axiosError.response?.status,
        data: axiosError.response?.data,
      });
      throw error;
    }
  },

  // 이벤트 좋아요 추가
  addEventLike: async (eventId: number) => {
    try {
      const token = tokenStorage.getAccessToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await instance.post<LikeResponse>(`/event-likes/${eventId}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Event like addition error:', {
        token: tokenStorage.getAccessToken(),
        status: axiosError.response?.status,
        data: axiosError.response?.data,
      });
      throw error;
    }
  },

  // 이벤트 좋아요 삭제
  removeEventLike: async (eventId: number) => {
    try {
      const token = tokenStorage.getAccessToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      // eventIds 단일 값으로 전달
      const params = new URLSearchParams();
      params.append('eventIds', eventId.toString());

      const response = await instance.delete<LikeResponse>('/event-likes', {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Event like removal error:', {
        token: tokenStorage.getAccessToken(),
        status: axiosError.response?.status,
        data: axiosError.response?.data,
        requestUrl: `${axiosError.config?.baseURL}${axiosError.config?.url}?${axiosError.config?.params}`, // 전체 URL 로깅
      });
      throw error;
    }
  },
};
