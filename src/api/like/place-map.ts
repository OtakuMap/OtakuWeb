import instance from '@/api/axios';
import { PlaceMapResponse } from '@/types/like/place-map';

export const getPlaceMapDetail = async (placeLikeId: number): Promise<PlaceMapResponse> => {
  try {
    const response = await instance.get<PlaceMapResponse>(`/place-likes/${placeLikeId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
