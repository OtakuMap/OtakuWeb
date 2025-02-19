import instance from '@/api/axios';

export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

export interface ShortReviewReactionResponse {
  reviewId: number;
  likes: number;
  dislikes: number;
  isLiked: boolean;
  isDisliked: boolean;
}

export const addShortReviewReaction = (
  placeId: number,
  reviewId: number,
  reactionType: 0 | 1,
): Promise<ApiResponse<ShortReviewReactionResponse>> =>
  instance.post(`/places/${placeId}/short-reviews/${reviewId}/reaction`, reactionType);
