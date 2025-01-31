import axios, { AxiosError } from 'axios';
import { EventLikeRequest, EventLikeResponse } from '../../types/like/likeEvent';

export const saveEventLike = async (params: EventLikeRequest): Promise<EventLikeResponse> => {
  try {
    const response = await axios.post<EventLikeResponse>(
      `/api/event-likes/${params.eventId}`,
      params,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      throw new Error(axiosError.message);
    }
    throw new Error('An unknown error occurred');
  }
};
