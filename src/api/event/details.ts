// api/event/details.ts
import instance from '@/api/axios';
import { EventDetailsResponse } from '../../types/event/details';

export const getEventDetails = async (eventId: number): Promise<EventDetailsResponse> => {
  try {
    const response = await instance.get<EventDetailsResponse>(`/events/${eventId}/details`);
    return response.data;
  } catch (err: unknown) {
    console.error('Error fetching event details:', err);
    throw err;
  }
};
