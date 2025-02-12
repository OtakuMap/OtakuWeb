import instance from '@/api/axios';
import { RouteLikesResponse } from '@/types/map/routeLikes';
import { AxiosError } from 'axios';
import { tokenStorage } from '@/utils/token';

interface GetSavedRoutesParams {
  lastId?: number;
  limit?: number;
}

export const getSavedRoutes = async ({ lastId = 0, limit = 10 }: GetSavedRoutesParams) => {
  try {
    const token = tokenStorage.getAccessToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await instance.get<RouteLikesResponse>('/route-likes', {
      params: {
        lastId,
        limit,
      },
    });

    // 응답 데이터 로깅
    console.log('API Response:', response.data);
    console.log('Route Likes:', response.data.result.routeLikes);

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{
      isSuccess: boolean;
      code: string;
      message: string;
      result: string;
    }>;

    if (axiosError.response?.status === 401) {
      throw new Error(axiosError.response.data?.message || '인증이 필요합니다.');
    }
    throw error;
  }
};
