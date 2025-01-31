import instance from '@/api/axios';
import type {
  NotificationSettingsRequest,
  NotificationSettingsResponse,
} from '@/types/userInfo/notification-settings';
import axios, { AxiosError } from 'axios';

export const updateNotificationSettings = async (data: NotificationSettingsRequest) => {
  try {
    const response = await instance.patch<NotificationSettingsResponse>(
      '/users/notification-settings',
      data,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        throw new Error(axiosError.response.data?.message || '알림 설정 수정에 실패했습니다.');
      }
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};
