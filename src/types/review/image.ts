// types/review/image.ts

export type ImageFolder = 'profile' | 'review' | 'event';

export interface ImageUploadRequest {
  folder: ImageFolder;
  image: File;
}

export interface ImageUploadResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string; // 업로드된 이미지 URL
}
