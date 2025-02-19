// api/review/review.ts

import { ReviewResponse, SortType } from '../../types/review/PlaceReview';

export const fetchReviews = async (
  placeId: string,
  page: number = 0,
  size: number = 10,
  sort: SortType = 'latest',
): Promise<ReviewResponse> => {
  try {
    // localStorage에서 토큰 가져오기
    const token = localStorage.getItem('accessToken'); // 또는 다른 방식으로 저장된 토큰

    const response = await fetch(
      `/api/places/${placeId}/reviews?page=${page}&size=${size}&sort=${sort}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Bearer 토큰 방식 사용
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error fetching reviews');
  }
};
