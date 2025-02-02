// api/event/review.ts
import instance from '@/api/axios';
import { EventReviewListResponse } from '@/types/event/review';

export const getEventReviews = async (
  eventId: number,
  page: number = 0,
): Promise<EventReviewListResponse> => {
  try {
    const response = await instance.get<EventReviewListResponse>(
      `/events/${eventId}/reviews?page=${page}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching event reviews:', error);
    throw error;
  }
};
