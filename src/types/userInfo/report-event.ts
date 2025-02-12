export interface ReportEventRequest {
  event_name: string;
  animation_name: string;
  additional_info: string;
}

export interface ReportEventResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: string;
}
