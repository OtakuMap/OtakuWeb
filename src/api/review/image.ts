// api/review/image.ts

import instance from '@/api/axios';
import { ImageFolder, ImageUploadResponse } from '@/types/review/image';

/**
 * 이미지 업로드 API
 * @param folder - 이미지를 업로드할 폴더 (profile, review, event)
 * @param image - 업로드할 이미지 파일
 * @returns 업로드된 이미지 URL
 */
export const uploadImage = async (
  folder: ImageFolder,
  image: File,
): Promise<ImageUploadResponse> => {
  try {
    const formData = new FormData();
    formData.append('folder', folder);
    formData.append('image', image);

    const response = await instance.post<ImageUploadResponse>('/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Hook for image upload
import { useState } from 'react';

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (folder: ImageFolder, image: File) => {
    try {
      setIsUploading(true);
      setError(null);
      const response = await uploadImage(folder, image);
      return response;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '이미지 업로드 중 오류가 발생했습니다.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    upload,
    isUploading,
    error,
  };
};
