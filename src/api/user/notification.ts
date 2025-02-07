import instance from '@/api/axios';
import { NotificationResponse } from '@/types/user/notification';
import { AxiosError } from 'axios';
import { tokenStorage } from '@/utils/token';

//알림 목록 조회
export const getNotifications = async () => {
  try {
    // 토큰 체크
    const token = tokenStorage.getAccessToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await instance.get<NotificationResponse>('/notifications');

    console.log('Notifications API Response:', response.data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{
      isSuccess: boolean;
      code: string;
      message: string;
      result: string;
    }>;

    console.error('Failed to fetch notifications:', {
      status: axiosError.response?.status,
      statusText: axiosError.response?.statusText,
      data: axiosError.response?.data,
    });

    if (axiosError.response?.status === 401) {
      // 토큰 재발급 시도는 인터셉터에서 자동으로 처리됨
      throw new Error(axiosError.response.data?.message || '인증이 필요합니다.');
    }
    throw error;
  }
};

//알림 읽음 처리
export const markNotificationAsRead = async (notificationId: number) => {
  try {
    const token = tokenStorage.getAccessToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await instance.patch(`/notifications/${notificationId}/read`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{
      isSuccess: boolean;
      code: string;
      message: string;
      result: string;
    }>;

    console.error('Failed to mark notification as read:', {
      status: axiosError.response?.status,
      statusText: axiosError.response?.statusText,
      data: axiosError.response?.data,
    });

    throw error;
  }
};
