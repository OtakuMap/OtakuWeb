// api/event/SaveEvent.ts
import { SaveEventResponse } from '@/types/event/SaveEvent';
import instance from '@/api/axios';

export const saveEvent = async (eventId: number): Promise<SaveEventResponse> => {
  const response = await instance.post<SaveEventResponse>(`/event-likes/${eventId}`);
  return response.data;
};
