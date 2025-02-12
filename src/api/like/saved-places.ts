import instance from '@/api/axios';
import type { SavedPlacesResponse, SavedPlacesParams } from '@/types/like/saved-places';
import axios, { AxiosError } from 'axios';

export const getSavedPlaces = async (params: SavedPlacesParams = {}) => {
  try {
    const { lastId = 0, limit = 10 } = params;
    const response = await instance.get<SavedPlacesResponse>('/place-likes', {
      params: { lastId, limit },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        throw new Error(axiosError.response.data?.message || '저장된 장소 조회에 실패했습니다.');
      }
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};
