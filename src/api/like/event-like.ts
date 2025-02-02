// api/like/event-likes.ts

import instance from '@/api/axios';
import { EventLikesResponse } from '@/types/like/event-like';

interface GetEventLikesParams {
  type?: number;
  isFavorite?: boolean;
  lastId?: number;
  limit?: number;
}

export const getEventLikes = async ({
  type,
  isFavorite,
  lastId = 0,
  limit = 10,
}: GetEventLikesParams = {}) => {
  try {
    const params = new URLSearchParams();

    if (type) params.append('type', type.toString());
    if (isFavorite !== undefined) params.append('isFavorite', isFavorite.toString());
    params.append('lastId', lastId.toString());
    params.append('limit', limit.toString());

    const response = await instance.get<EventLikesResponse>('/event-likes', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
