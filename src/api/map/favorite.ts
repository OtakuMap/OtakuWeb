import instance from '@/api/axios';
import { PlaceLikesResponse } from '@/types/map/favorite';
import { AxiosError } from 'axios';
import { tokenStorage } from '@/utils/token';

interface GetFavoritePlacesParams {
  lastId?: number;
  limit?: number;
}

export const getFavoritePlaces = async ({ lastId = 0, limit = 10 }: GetFavoritePlacesParams) => {
  try {
    console.log('Making API request with params:', { lastId, limit });

    // 토큰 체크
    const token = tokenStorage.getAccessToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await instance.get<PlaceLikesResponse>('/place-likes', {
      params: {
        lastId,
        limit,
      },
      // Authorization 헤더는 인터셉터에서 자동으로 추가됨
    });

    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{
      isSuccess: boolean;
      code: string;
      message: string;
      result: string;
    }>;

    console.error('Failed to fetch favorite places:', {
      status: axiosError.response?.status,
      statusText: axiosError.response?.statusText,
      data: axiosError.response?.data,
    });

    if (axiosError.response?.status === 401) {
      // 토큰 재발급 시도는 인터셉터에서 자동으로 처리됨
      throw new Error(axiosError.response.data?.message || '인증이 필요합니다.');
    }
    throw error;
  }
};
