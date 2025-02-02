// api/like/favorite-events.ts
import instance from '@/api/axios';
import { FavoriteEventResponse } from '@/types/like/favorite-events';
import { AxiosError } from 'axios';

interface FavoriteEventRequestBody {
  isFavorite: boolean;
}

export const toggleEventFavorite = async (eventLikeId: number, isFavorite: boolean) => {
  try {
    const requestBody: FavoriteEventRequestBody = { isFavorite };

    const response = await instance.patch<FavoriteEventResponse>(
      `/event-likes/${eventLikeId}/favorites`,
      requestBody,
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw new Error('알 수 없는 에러가 발생했습니다.');
  }
};
