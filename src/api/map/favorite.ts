import instance from '@/api/axios'; // 방금 만든 인증 토큰이 포함된 instance
import { PlaceLikesResponse } from '@/types/map/favorite';

export const getFavoritePlaces = async (userId: string) => {
  try {
    const response = await instance.get<PlaceLikesResponse>(`/users/${userId}/saved-places`);
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch favorite places:', error);
    throw error;
  }
};
