import instance from '../axios';
import { ResetPasswordRequest, ResetPasswordResponse } from '@/types/userInfo/reset-password';

export const resetPassword = async (data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
  try {
    // 비밀번호 기본 유효성 검사
    if (!data.password) {
      throw new Error('새 비밀번호를 입력해주세요.');
    }

    if (data.password.length < 8) {
      throw new Error('비밀번호는 최소 8자 이상이어야 합니다.');
    }

    const response = await instance.patch<ResetPasswordResponse>('/users/password', {
      password: data.password,
    });

    // API 응답 확인
    if (!response.data.isSuccess) {
      // 사용자 없음 등의 특정 오류 처리
      if (response.data.code === 'USER4001') {
        throw new Error('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
      }
      throw new Error(response.data.message || '비밀번호 변경에 실패했습니다.');
    }

    return response.data;
  } catch (error) {
    // 네트워크 오류 또는 API 오류 처리
    if (error.response) {
      // 서버 응답 있는 경우
      if (error.response.data.code === 'USER4001') {
        throw new Error('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
      }
      throw new Error(error.response.data.message || '비밀번호 변경 중 오류가 발생했습니다.');
    } else if (error.request) {
      // 요청은 보냈지만 응답을 받지 못한 경우
      throw new Error('서버와 연결할 수 없습니다. 네트워크 상태를 확인해주세요.');
    } else {
      // 요청 설정 중 에러
      throw new Error('비밀번호 변경 요청 중 오류가 발생했습니다.');
    }
  }
};
