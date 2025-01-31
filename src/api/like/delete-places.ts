import instance from '@/api/axios';
import type { DeletePlacesRequest, DeletePlacesResponse } from '@/types/like/delete-places';
import axios, { AxiosError } from 'axios';
import { tokenStorage } from '@/utils/token';

export const deletePlaces = async (placeIds: number[]) => {
  const token = tokenStorage.getAccessToken();
  if (!token) {
    throw new Error('인증이 필요합니다.');
  }

  try {
    const requestData: DeletePlacesRequest = { placeIds };
    const response = await instance.delete<DeletePlacesResponse>('/place-likes', {
      data: requestData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Delete API Error:', axiosError.response); // 에러 로깅 추가

      if (axiosError.response?.status === 401) {
        throw new Error('인증이 필요합니다.');
      }
      throw new Error(axiosError.response?.data?.message || '장소 삭제에 실패했습니다.');
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};
