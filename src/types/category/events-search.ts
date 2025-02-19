export interface Thumbnail {
  id: number;
  uuid: string;
  fileName: string;
  fileUrl: string;
}

export interface SearchEvent {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  thumbnail: Thumbnail;
}

export interface SearchEventsResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    events: SearchEvent[];
    pageNumber: number;
    totalPages: number;
    totalElements: number;
    isLast: boolean;
  };
}
