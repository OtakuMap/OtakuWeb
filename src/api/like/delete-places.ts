// api/like/delete-places.ts
import instance from '@/api/axios';
import { DeletePlacesResponse } from '@/types/like/delete-places';
import { AxiosError } from 'axios';

export const deletePlaces = async (placeIds: number[]) => {
  try {
    const params = new URLSearchParams();
    placeIds.forEach((id) => params.append('placeIds', id.toString()));

    const response = await instance.delete<DeletePlacesResponse>('/place-likes', {
      params,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw new Error('알 수 없는 에러가 발생했습니다.');
  }
};
