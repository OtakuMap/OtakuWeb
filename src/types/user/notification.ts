export type NotificationType =
  | 'COMMUNITY_ACTIVITY'
  | 'POST_SAVE'
  | 'POST_SUPPORT'
  | 'SERVICE_NOTICE';

export interface Notification {
  id: number;
  type: NotificationType;
  message: string;
  url: string;
  createdAt: string;
  read: boolean;
}

export interface NotificationResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    notifications: Notification[];
  };
}
