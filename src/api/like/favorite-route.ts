// api/like/favorite-routes.ts
import instance from '@/api/axios';
import { FavoriteRouteRequest, FavoriteRouteResponse } from '@/types/like/favorite-route';

export const updateRouteFavorite = async (
  routeLikeId: number,
  isFavorite: boolean,
): Promise<FavoriteRouteResponse> => {
  const response = await instance.patch<FavoriteRouteResponse>(
    `/route-likes/${routeLikeId}/favorites`,
    { isFavorite } as FavoriteRouteRequest,
  );
  return response.data;
};
