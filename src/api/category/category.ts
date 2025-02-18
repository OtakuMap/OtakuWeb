import instance from '@/api/axios';
import { EventsResponse, Genre, EventType, EventStatus } from '@/types/category/category';

export const getEventsByCategory = async (params: {
  genre?: Genre;
  status?: EventStatus;
  type?: EventType;
  page: number;
  size: number;
}) => {
  const response = await instance.get<EventsResponse>('/events/category', {
    params,
  });
  return response.data;
};
