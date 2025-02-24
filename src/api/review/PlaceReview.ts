// api/review/review.ts
import instance from '@/api/axios';
import { ReviewResponse, SortType } from '../../types/review/PlaceReview';

export const fetchReviews = async (
  placeId: string,
  page: number = 0,
  size: number = 10,
  sort: SortType = 'latest',
): Promise<ReviewResponse> => {
  try {
    const token = localStorage.getItem('accessToken');

    const response = await instance.get(`/places/${placeId}/reviews`, {
      params: {
        page,
        size,
        sort,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // axios에서는 바로 response.data를 반환
    return response.data;
  } catch (error) {
    console.error('Review fetch error:', error);
    throw new Error(error instanceof Error ? error.message : 'Error fetching reviews');
  }
};
