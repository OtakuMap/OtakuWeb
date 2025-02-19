export interface UpdateProfileImageRequest {
  profileImage: string;
}

export interface UpdateProfileImageResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}
