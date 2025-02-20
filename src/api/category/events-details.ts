import instance from '../axios';
import { EventDetailsResponse } from '@/types/category/events-details';

export const getEventDetails = async (eventId: number): Promise<EventDetailsResponse> => {
  try {
    const response = await instance.get<EventDetailsResponse>(`/events/${eventId}/details`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
