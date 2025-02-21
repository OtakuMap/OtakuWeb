import instance from '../axios';
import { ResetPasswordRequest, ResetPasswordResponse } from '@/types/userInfo/reset-password';

export const resetPassword = async (data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
  try {
    const response = await instance.patch<ResetPasswordResponse>('/users/password', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
