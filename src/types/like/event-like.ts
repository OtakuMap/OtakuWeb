export type EventType = 'POPUP_STORE' | 'EXHIBITION' | 'COLLAB_CAFE';

export interface EventLike {
  id: number;
  eventId: number;
  name: string;
  thumbnail: string;
  startDate: string;
  endDate: string;
  isFavorite: boolean;
  eventType: EventType;
}

export interface EventLikesResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    eventLikes: EventLike[];
    hasNext: boolean;
    lastId: number;
  };
}
