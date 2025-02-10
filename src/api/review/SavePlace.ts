// api/review/SavePlace.ts
import instance from '@/api/axios';
import { SavePlaceRequest, SavePlaceResponse } from '@/types/review/SavePlace';

export const savePlace = async (
  placeId: number,
  data: SavePlaceRequest,
): Promise<SavePlaceResponse> => {
  try {
    const response = await instance.post<SavePlaceResponse>(`/place-likes/${placeId}`, data);
    return response.data;
  } catch (error) {
    console.error('Error saving place:', error);
    throw error;
  }
};
