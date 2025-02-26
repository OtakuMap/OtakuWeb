// api/event/short-review.ts
import instance from '@/api/axios';
import {
  ShortReviewRequest,
  ShortReviewResponse,
  EventShortReviewListResponse,
  UpdateShortReviewRequest,
  DeleteShortReviewResponse,
  UpdateShortReviewResponse,
} from '@/types/event/short-review';

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

export const updateShortReview = async (
  eventShortReviewId: number,
  data: UpdateShortReviewRequest,
): Promise<UpdateShortReviewResponse> => {
  try {
    const response = await instance.patch<UpdateShortReviewResponse>(
      `/events/short-reviews/${eventShortReviewId}`,
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
      `/events/short-reviews/${eventShortReviewId}`,
    );
    return response.data;
  } catch (err) {
    console.error('Error deleting short review:', err);
    throw err;
  }
};

interface ShortReviewReactionResponse {
  isSuccess: boolean;
  message?: string;
  result: {
    likeCount: number;
    dislikeCount: number;
    isLiked: boolean;
    isDisliked: boolean;
  };
}

export const toggleShortReviewReaction = async (
  reviewId: number,
  reactionType: 0 | 1,
): Promise<ShortReviewReactionResponse> => {
  try {
    // 객체가 아닌 reactionType 값만 직접 전송
    const response = await instance.post<ShortReviewReactionResponse>(
      `/events/short-reviews/${reviewId}/reaction`,
      reactionType,
    );
    return response.data;
  } catch (err: any) {
    // 타입을 any로 명시
    console.error('Error toggling short review reaction:', err);

    // 에러 응답 로깅 추가 (타입 가드 사용)
    if (err.response) {
      console.error('Error response:', err.response.data);
    }
    throw err;
  }
};
