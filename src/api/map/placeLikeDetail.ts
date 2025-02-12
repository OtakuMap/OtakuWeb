import instance from '@/api/axios';
import { PlaceLikeDetailResponse } from '@/types/map/placeLikeDetail';
import { AxiosError } from 'axios';
import { tokenStorage } from '@/utils/token';

export const getPlaceLikeDetail = async (placeLikeId: number) => {
  try {
    const token = tokenStorage.getAccessToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await instance.get<PlaceLikeDetailResponse>(`/place-likes/${placeLikeId}`);
    console.log('Place like detail response:', response.data); // 응답 데이터 확인
    console.log('Place details:', response.data.result); // 실제 장소 데이터 확인
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{
      isSuccess: boolean;
      code: string;
      message: string;
      result: string;
    }>;

    console.error('Failed to fetch place like detail:', {
      status: axiosError.response?.status,
      statusText: axiosError.response?.statusText,
      data: axiosError.response?.data,
    });

    if (axiosError.response?.status === 401) {
      throw new Error(axiosError.response.data?.message || '인증이 필요합니다.');
    }
    throw error;
  }
};
