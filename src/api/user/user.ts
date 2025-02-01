import instance from '@/api/axios';
import { UserResponse } from '@/types/user/user';
import { AxiosError } from 'axios';
import { tokenStorage } from '@/utils/token';

export const getUserProfile = async () => {
  try {
    const token = tokenStorage.getAccessToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await instance.get<UserResponse>('/users');
    console.log('User Profile API Response:', response.data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{
      isSuccess: boolean;
      code: string;
      message: string;
      result: string;
    }>;

    console.error('Failed to fetch user profile:', {
      status: axiosError.response?.status,
      statusText: axiosError.response?.statusText,
      data: axiosError.response?.data,
    });

    throw error;
  }
};
