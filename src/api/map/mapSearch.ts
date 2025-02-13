import publicInstance from '../publicInstance';

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
  search: async (keyword: string) => {
    console.log('API call with keyword:', keyword); // 디버깅 로그
    try {
      const response = await publicInstance.get<SearchResponse>('/map/search', {
        params: { keyword },
      });
      console.log('API response:', response.data); // 디버깅 로그
      return response.data;
    } catch (error) {
      console.error('API error:', error); // 에러 로그
      throw error;
    }
  },
};
