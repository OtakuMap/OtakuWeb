export interface DeleteEventsResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}

export interface DeleteEventsRequest {
  eventIds: number[];
}
