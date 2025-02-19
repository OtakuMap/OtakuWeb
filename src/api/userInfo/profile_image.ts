import instance from '@/api/axios';

import { UpdateProfileImageResponse } from '@/types/userInfo/profile-image';

export const updateProfileImage = async (
  formData: FormData,
): Promise<UpdateProfileImageResponse> => {
  try {
    const response = await instance.patch<UpdateProfileImageResponse>(
      '/users/profile_image',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
