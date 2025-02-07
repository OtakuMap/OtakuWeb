// api/userInfo/logout.ts
import instance from '@/api/axios';
import { LogoutResponse } from '@/types/userInfo/logout';
import { tokenStorage } from '@/utils/token';

export const logout = async (): Promise<LogoutResponse> => {
  try {
    const response = await instance.post<LogoutResponse>('/auth/logout');
    // 로그아웃 성공 시 로컬 스토리지의 토큰 제거
    if (response.data.isSuccess) {
      tokenStorage.clearTokens();
    }
    return response.data;
  } catch (error: any) {
    // axios 에러인 경우
    if (error.response) {
      throw new Error(error.response.data.message || '로그아웃 처리 중 오류가 발생했습니다.');
    }
    // 네트워크 에러인 경우
    if (error.request) {
      throw new Error('서버와 통신할 수 없습니다. 네트워크 연결을 확인해주세요.');
    }
    // 기타 에러
    throw new Error('로그아웃 처리 중 오류가 발생했습니다.');
  }
};
