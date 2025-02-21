export enum Genre {
  ALL = 'ALL',
  ROMANCE = 'ROMANCE',
  ACTION = 'ACTION',
  FANTASY = 'FANTASY',
  THRILLER = 'THRILLER',
  SPORTS = 'SPORTS',
  NULL = '',
}

export enum EventType {
  ALL = 'ALL',
  POPUP_STORE = 'POPUP_STORE',
  EXHIBITION = 'EXHIBITION',
  COLLABORATION_CAFE = 'COLLABORATION_CAFE',
}

export enum EventStatus {
  IN_PROCESS = 'IN_PROCESS',
  NOT_STARTED = 'NOT_STARTED',
}

export interface Thumbnail {
  id: number;
  uuid: string;
  fileName: string;
  fileUrl: string;
}

export interface Event {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  thumbnail: Thumbnail;
}

export interface EventsResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    events: Event[];
    pageNumber: number;
    totalPages: number;
    totalElements: number;
    isLast: boolean;
  };
}
