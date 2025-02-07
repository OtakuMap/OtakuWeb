export interface UpdateProfileImageResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}

export interface ProfileImageRequest {
  profileImage: File;
}
