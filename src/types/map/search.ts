export interface LocationGroup {
  latitude: number;
  longitude: number;
  items: SearchSuggestion[];
}

export interface SearchSuggestion {
  id: string;
  name: string;
  animeName?: string;
  type: 'place' | 'event';
  data: {
    id?: number;
    placeId?: number;
    eventId?: number;
    name: string;
    animeName?: string;
    animationTitle?: string;
    isLiked: boolean;
    hashTags: Array<{
      hashTagId: number;
      name: string;
    }>;
    latitude: number;
    longitude: number;
    selectedAnimation?: {
      animationId: number;
      animationName: string;
      isLiked: boolean;
      hashTags: any[];
    };
  };
}
