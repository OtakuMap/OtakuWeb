import instance from '@/api/axios';
import type { NicknameRequest, NicknameResponse } from '@/types/userInfo/nickname';

export const updateNickname = async (nickname: string) => {
  const requestData: NicknameRequest = {
    nickname,
  };

  try {
    const response = await instance.patch<NicknameResponse>('/users/nickname', requestData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
