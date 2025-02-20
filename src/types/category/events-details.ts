interface Image {
  id: number;
  uuid: string;
  fileName: string;
  fileUrl: string;
}

interface EventLocation {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
}

export interface EventDetails {
  id: number;
  title: string;
  animationName: string;
  name: string;
  site: string;
  startDate: string;
  endDate: string;
  thumbnailImage: Image;
  backgroundImage: Image;
  goodsImage: Image;
  eventLocation: EventLocation;
}

export interface EventDetailsResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: EventDetails;
}
