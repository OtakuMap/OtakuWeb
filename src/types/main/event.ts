export interface EventImage {
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
  thumbnail: EventImage;
  isLiked?: boolean;
}

export interface PopularEventsResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Event[];
}

export interface EventLikeResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    isLiked: boolean;
  };
}
