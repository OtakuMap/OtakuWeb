export interface ReportEventRequest {
  eventName: string;
  animationName: string;
  additionalInfo: string;
}

export interface ReportEventResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}
