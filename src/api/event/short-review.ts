import instance from '@/api/axios';
import {
  ShortReviewRequest,
  ShortReviewResponse,
  EventShortReviewListResponse,
} from '@/types/event/short-review';

// Existing function
export const createShortReview = async (
  eventId: number,
  reviewData: ShortReviewRequest,
): Promise<ShortReviewResponse> => {
  try {
    const response = await instance.post<ShortReviewResponse>(
      `/events/${eventId}/short-reviews`,
      reviewData,
    );
    return response.data;
  } catch (err) {
    console.error('Error creating short review:', err);
    throw err;
  }
};

// New function for fetching review list
export const getEventShortReviews = async (
  eventId: number,
  page: number = 0,
): Promise<EventShortReviewListResponse> => {
  try {
    const response = await instance.get<EventShortReviewListResponse>(
      `/events/${eventId}/short-reviews`,
      {
        params: { page },
      },
    );
    return response.data;
  } catch (err) {
    console.error('Error fetching short reviews:', err);
    throw err;
  }
};
