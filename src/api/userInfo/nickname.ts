import instance from '@/api/axios';
import type { NicknameRequest, NicknameResponse } from '@/types/userInfo/nickname';
import axios, { AxiosError } from 'axios'; // AxiosError 추가

export const updateNickname = async (nickname: string) => {
  const requestData: NicknameRequest = {
    nickname,
  };

  try {
    const response = await instance.patch<NicknameResponse>('/users/nickname', requestData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios 에러인 경우
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // 서버에서 응답이 왔지만 에러인 경우
        throw new Error(axiosError.response.data?.message || '닉네임 수정에 실패했습니다.');
      } else if (axiosError.request) {
        // 요청은 보냈지만 응답을 받지 못한 경우
        throw new Error('서버로부터 응답을 받지 못했습니다.');
      } else {
        // 요청 설정 중 에러가 발생한 경우
        throw new Error('요청 설정 중 오류가 발생했습니다.');
      }
    } else {
      // Axios 에러가 아닌 경우
      throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  }
};
