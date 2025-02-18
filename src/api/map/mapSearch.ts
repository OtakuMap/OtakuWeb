import publicInstance from '../publicInstance';
import instance from '../axios';

export interface SearchResult {
  latitude: number;
  longitude: number;
  count: number;
  events: {
    eventId: number;
    name: string;
    isLiked: boolean;
    animationTitle: string;
    hashTags: Array<{
      hashTagId: number;
      name: string;
    }>;
  }[];
  places: {
    placeId: number;
    name: string;
    animations: Array<{
      animationId: number;
      animationName: string;
      isLiked: boolean;
      hashTags: Array<{
        hashTagId: number;
        name: string;
      }>;
    }>;
  }[];
}

export interface SearchResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: SearchResult[];
}

export const searchAPI = {
  search: async (keyword: string, isAuthenticated: boolean = false) => {
    console.log('API call with keyword:', keyword);
    console.log('Is authenticated:', isAuthenticated);

    try {
      const axiosInstance = isAuthenticated ? instance : publicInstance;
      const response = await axiosInstance.get<SearchResponse>('/map/search', {
        params: { keyword },
      });
      console.log('API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
};
