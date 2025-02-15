export interface UploadImageResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string; // 업로드된 이미지 URL
}

export type FolderType = 'profile' | 'review' | 'event';

export interface UploadImageRequest {
  folder: FolderType;
  image: File;
}
