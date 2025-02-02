// types/event/details.ts
export interface EventImage {
  id: number;
  uuid: string;
  fileName: string;
  fileUrl: string;
}

export interface EventLocation {
  id: number;
  name: string;
  longitude: string;
  latitude: string;
}

export interface EventDetails {
  id: number;
  title: string;
  animationName: string;
  name: string;
  site: string;
  startDate: string;
  endDate: string;
  thumbnailImage: EventImage;
  backgroundImage: EventImage;
  goodsImage: EventImage;
  eventLocation: EventLocation;
}

export interface EventDetailsResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: EventDetails;
}
