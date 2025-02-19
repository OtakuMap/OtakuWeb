export interface ShortReviewReactionRequest {
  reactionType: 0 | 1; // 0: dislike, 1: like
}

export interface ShortReviewReactionResponse {
  reviewId: number;
  likes: number;
  dislikes: number;
  isLiked: boolean;
  isDisliked: boolean;
}
