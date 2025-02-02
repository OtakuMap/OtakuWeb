import instance from '@/api/axios';
import type { DeleteReviewResponse } from '@/types/userInfo/deleteReview';
import axios, { AxiosError } from 'axios';

export const deleteAllReviews = async () => {
  try {
    const response = await instance.delete<DeleteReviewResponse>('/users/reviews');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        throw new Error(axiosError.response.data?.message || '후기 삭제에 실패했습니다.');
      }
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};
