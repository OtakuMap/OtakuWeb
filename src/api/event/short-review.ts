// api/event/short-review.ts
import instance from '@/api/axios';
import {
  ShortReviewRequest,
  ShortReviewResponse,
  EventShortReviewListResponse,
  UpdateShortReviewRequest,
  DeleteShortReviewResponse,
  UpdateShortReviewResponse,
  ShortReviewReactionResponse,
} from '@/types/event/short-review';

export const createShortReview = async (
  eventId: number,
  reviewData: ShortReviewRequest,
): Promise<ShortReviewResponse> => {
  try {
    const response = await instance.post<ShortReviewResponse>(
      `/api/events/${eventId}/short-reviews`,
      reviewData,
    );
    return response.data;
  } catch (err) {
    console.error('Error creating short review:', err);
    throw err;
  }
};

export const getEventShortReviews = async (
  eventId: number,
  page: number = 0,
): Promise<EventShortReviewListResponse> => {
  try {
    const response = await instance.get<EventShortReviewListResponse>(
      `/api/events/${eventId}/short-reviews`,
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

export const updateShortReview = async (
  eventShortReviewId: number,
  data: UpdateShortReviewRequest,
): Promise<UpdateShortReviewResponse> => {
  try {
    const response = await instance.patch<UpdateShortReviewResponse>(
      `/api/events/short-reviews/${eventShortReviewId}`,
      data,
    );
    return response.data;
  } catch (err) {
    console.error('Error updating short review:', err);
    throw err;
  }
};

export const deleteShortReview = async (
  eventShortReviewId: number,
): Promise<DeleteShortReviewResponse> => {
  try {
    const response = await instance.delete<DeleteShortReviewResponse>(
      `/api/events/short-reviews/${eventShortReviewId}`,
    );
    return response.data;
  } catch (err) {
    console.error('Error deleting short review:', err);
    throw err;
  }
};

export const toggleShortReviewReaction = async (
  reviewId: number,
  reactionType: 0 | 1,
): Promise<ShortReviewReactionResponse> => {
  try {
    const response = await instance.post<ShortReviewReactionResponse>(
      `/api/events/short-reviews/${reviewId}/reaction`,
      { reactionType },
    );
    return response.data;
  } catch (err) {
    console.error('Error toggling short review reaction:', err);
    throw err;
  }
};
