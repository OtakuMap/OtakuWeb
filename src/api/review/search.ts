// api/review/search.ts
import instance from '@/api/axios';
import { SearchResponse, SearchParams } from '../../types/review/search';

export const searchReviews = async (params: SearchParams): Promise<SearchResponse> => {
  try {
    const response = await instance.get<SearchResponse>('/reviews/search', {
      params: {
        keyword: params.keyword,
        page: params.page || 0,
        size: params.size || 10,
        sort: params.sort || 'latest',
      },
    });
    return response.data;
  } catch (err: unknown) {
    console.error('Failed to search reviews:', err);
    throw err;
  }
};
