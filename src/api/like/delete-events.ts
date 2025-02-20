import instance from '@/api/axios';
import { DeleteEventsResponse } from '@/types/like/delete-events';

export const deleteEvents = async (eventIds: number[]): Promise<DeleteEventsResponse> => {
  try {
    console.log('Sending eventIds:', eventIds);
    const response = await instance.delete<DeleteEventsResponse>('/event-likes', {
      data: { eventIds: eventIds },
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Delete events error:', error.response?.data);
    throw error;
  }
};
