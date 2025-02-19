// api/review/user.ts
import instance from '@/api/axios';
import { ApiResponse, UserProfile, UserReviewsResponse } from '@/types/review/user';

export const getUserProfile = async (): Promise<ApiResponse<UserProfile>> => {
  try {
    const response = await instance.get<ApiResponse<UserProfile>>('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const getUserReviews = async (
  page: number,
  sort: 'createdAt' | 'views' = 'createdAt',
): Promise<ApiResponse<UserReviewsResponse>> => {
  try {
    const response = await instance.get<ApiResponse<UserReviewsResponse>>('/users/my-reviews', {
      params: { page, sort },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    throw error;
  }
};
