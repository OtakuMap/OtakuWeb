import instance from '../axios';
import { ResetPasswordRequest, ResetPasswordResponse } from '../../types/userInfo/reset-password';
import { tokenStorage } from '../../utils/token';

export const resetPassword = async (data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
  const token = tokenStorage.getAccessToken();
  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }

  try {
    const { data: responseData } = await instance.post<ResetPasswordResponse>(
      '/users/reset-password',
      data,
    );
    return responseData;
  } catch (error) {
    console.error('Password reset error:', error);
    if (error.response?.status === 401) {
      tokenStorage.clearTokens();
      window.location.href = '/login';
    }
    throw error;
  }
};
