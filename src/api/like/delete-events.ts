import instance from '@/api/axios';
import { DeleteEventsResponse } from '@/types/like/delete-events';

export const deleteEvents = async (eventIds: number[]) => {
  try {
    const params = new URLSearchParams();
    eventIds.forEach((id) => params.append('eventIds', id.toString()));

    const response = await instance.delete<DeleteEventsResponse>('/event-likes', {
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
