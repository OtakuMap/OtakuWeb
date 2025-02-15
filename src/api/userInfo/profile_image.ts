import instance from '@/api/axios';
import { UpdateProfileImageResponse } from '@/types/userInfo/profile_image';

export const updateProfileImage = async (imageUrl: string): Promise<UpdateProfileImageResponse> => {
  try {
    const response = await instance.patch<UpdateProfileImageResponse>('/users/profile-image', {
      profileImage: imageUrl,
    });

    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error('인증이 필요합니다. 다시 로그인해주세요.');
    }
    if (error.response) {
      throw new Error(error.response.data.message || '프로필 이미지 업데이트에 실패했습니다.');
    }
    if (error.request) {
      throw new Error('서버와 통신할 수 없습니다. 네트워크 연결을 확인해주세요.');
    }
    throw new Error('프로필 이미지 업데이트 중 오류가 발생했습니다.');
  }
};
