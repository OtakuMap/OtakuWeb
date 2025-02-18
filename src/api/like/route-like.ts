import instance from '../axios';
import { GetRouteLikesRequest, GetRouteLikesResponse } from '../../types/like/route-like';

export const getRouteLikes = async (
  params: GetRouteLikesRequest,
): Promise<GetRouteLikesResponse> => {
  const { isFavorite, lastId = 0, limit = 10 } = params;

  try {
    const { data } = await instance.get<GetRouteLikesResponse>('/route-likes', {
      params: {
        isFavorite,
        lastId,
        limit,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
