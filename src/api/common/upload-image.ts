import instance from '@/api/axios';
import { UploadImageResponse, FolderType } from '@/types/common/image';

export const uploadImage = async (
  folder: FolderType,
  image: File,
): Promise<UploadImageResponse> => {
  try {
    const formData = new FormData();
    formData.append('folder', folder);
    formData.append('image', image);

    const response = await instance.post<UploadImageResponse>('/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error('인증이 필요합니다. 다시 로그인해주세요.');
    }
    if (error.response) {
      throw new Error(error.response.data.message || '이미지 업로드에 실패했습니다.');
    }
    if (error.request) {
      throw new Error('서버와 통신할 수 없습니다. 네트워크 연결을 확인해주세요.');
    }
    throw new Error('이미지 업로드 중 오류가 발생했습니다.');
  }
};
