import { useState, useEffect } from 'react';
import { Notification } from '@/types/user/notification';
import { getNotifications, markNotificationAsRead } from '@/api/user/notification';
import { useAppSelector } from '../reduxHooks';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const fetchNotifications = async () => {
    if (!isLoggedIn) {
      setNotifications([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await getNotifications();

      if (response.isSuccess) {
        setNotifications(response.result.notifications);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      const error = err as Error;
      setError(error);
      console.error('Failed to fetch notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (notificationId: number) => {
    try {
      const response = await markNotificationAsRead(notificationId);
      if (response.isSuccess) {
        // 알림 목록에서 해당 알림 제거
        setNotifications((prev) =>
          prev.filter((notification) => notification.id !== notificationId),
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
      return false;
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchNotifications();
    } else {
      setNotifications([]);
    }
  }, [isLoggedIn]);

  return {
    notifications,
    isLoading,
    error,
    refetchNotifications: fetchNotifications,
    markAsRead,
  };
};
