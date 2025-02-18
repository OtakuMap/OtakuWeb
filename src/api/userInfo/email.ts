// api/userInfo/email.ts
import axios from 'axios';
import instance from '@/api/axios';
import { UpdateEmailRequest, UpdateEmailResponse } from '@/types/userInfo/email';
import { tokenStorage } from '@/utils/token';

export const updateEmail = async (email: string): Promise<UpdateEmailResponse> => {
  try {
    // 토큰 확인
    const token = tokenStorage.getAccessToken();
    if (!token) {
      throw new Error('인증 토큰이 없습니다.');
    }

    const data: UpdateEmailRequest = {
      email,
    };

    const response = await instance.patch<UpdateEmailResponse>('/users/email', data);

    if (response.data.isSuccess) {
      return response.data;
    } else {
      throw new Error(response.data.message || '이메일 변경에 실패했습니다.');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('이메일 변경 에러:', error.response?.data);

      if (error.response?.status === 400) {
        throw new Error('잘못된 이메일 형식입니다.');
      } else if (error.response?.status === 401) {
        window.location.href = '/login';
        throw new Error('로그인이 필요합니다.');
      } else if (error.response?.status === 409) {
        throw new Error('이미 사용 중인 이메일입니다.');
      }
    }
    throw new Error('이메일 변경 중 오류가 발생했습니다.');
  }
};
