import instance from '@/api/axios';
import { AxiosError } from 'axios';
import { UserInfoResponse } from '../../types/userInfo/userType';

export const getUserInfo = async (): Promise<UserInfoResponse> => {
  try {
    const response = await instance.get<UserInfoResponse>('/users'); // '/api' 제거
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 403) {
      throw new Error('접근 권한이 없습니다.');
    }
    throw new Error('사용자 정보를 불러오는데 실패했습니다.');
  }
};
