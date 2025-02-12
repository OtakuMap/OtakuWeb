export interface NotificationSettingsRequest {
  notificationType: number;
  isEnabled: boolean;
}

export interface NotificationSettingsResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: string;
}
