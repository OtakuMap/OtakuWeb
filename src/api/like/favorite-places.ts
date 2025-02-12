// api/like/favorite-places.ts

import instance from '@/api/axios';
import { FavoritePlaceResponse } from '@/types/like/favorite-places';
import { AxiosError } from 'axios';

interface FavoritePlaceRequestBody {
  isFavorite: boolean;
}

export const togglePlaceFavorite = async (placeLikeId: number, isFavorite: boolean) => {
  try {
    const requestBody: FavoritePlaceRequestBody = { isFavorite };

    const response = await instance.patch<FavoritePlaceResponse>(
      `/place-likes/${placeLikeId}/favorites`,
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
