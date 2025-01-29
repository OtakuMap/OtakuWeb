import instance from '@/api/axios';
import { PlaceLikesResponse } from '@/types/map/favorite';

interface GetFavoritePlacesParams {
  userId: number;
  lastId?: number;
  limit?: number;
}

export const getFavoritePlaces = async ({
  userId,
  lastId = 0,
  limit = 10,
}: GetFavoritePlacesParams) => {
  try {
    console.log('Making API request with params:', { userId, lastId, limit }); // 요청 파라미터 확인
    const response = await instance.get<PlaceLikesResponse>(`/users/${userId}/saved-places`, {
      params: {
        lastId,
        limit,
      },
    });
    console.log('API Response:', response.data); // 응답 데이터 확인
    return response.data;
  } catch (error) {
    console.error('Failed to fetch favorite places:', error);
    throw error;
  }
};
