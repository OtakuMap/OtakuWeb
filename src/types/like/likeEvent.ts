export interface EventLikeRequest {
  name: string;
  eventId: string;
}

export interface EventLikeResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}
