import instance from '../axios';
import { SearchEventsResponse } from '@/types/category/events-search';

interface SearchParams {
  keyword: string;
  page: number;
  size: number;
}

export const searchEvents = async ({
  keyword,
  page,
  size,
}: SearchParams): Promise<SearchEventsResponse> => {
  try {
    const response = await instance.get<SearchEventsResponse>('/events/search', {
      params: {
        keyword,
        page,
        size,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
