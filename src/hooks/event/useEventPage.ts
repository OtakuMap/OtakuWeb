// hooks/event/useEventPage.ts
import { useState, useEffect } from 'react';
import { EventDetails } from '@/types/event/details';
import { EventShortReview } from '@/types/event/short-review';
import { getEventDetails } from '@/api/event/details';
import {
  createShortReview,
  updateShortReview,
  deleteShortReview,
  toggleShortReviewReaction,
} from '@/api/event/short-review';

// EventDetails hook (기존 코드 동일)
export const useEventDetails = (eventId: number) => {
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!eventId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await getEventDetails(Number(eventId));
        if (response.isSuccess) {
          setEventDetails(response.result);
        }
      } catch (err) {
        console.error('Failed to fetch event details:', err);
        setError('이벤트 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  return { eventDetails, loading, error };
};

// Reviews hook (기존 코드 동일)
export const useReviews = (initialReviews: EventShortReview[]) => {
  const [reviews, setReviews] = useState<EventShortReview[]>(initialReviews);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [editRating, setEditRating] = useState(0);
  const [editError, setEditError] = useState<string | null>(null);
  const [isReactionLoading, setIsReactionLoading] = useState(false);

  const handleEditStart = (review: EventShortReview) => {
    if (!review || typeof review.id !== 'number') {
      console.error('Invalid review object:', review);
      return;
    }

    setEditingId(review.id);
    setEditText(review.content);
    setEditRating(review.rating);
    setEditError(null);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditText('');
    setEditRating(0);
    setEditError(null);
  };

  const handleEditComplete = async (reviewId: number) => {
    console.log('handleEditComplete called with reviewId:', reviewId); // 디버깅용 로그

    if (typeof reviewId !== 'number' || reviewId <= 0) {
      console.error('Invalid Review ID:', reviewId);
      setEditError('유효하지 않은 리뷰 ID입니다.');
      return;
    }

    if (!editText || !editRating) {
      setEditError('별점과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      const response = await updateShortReview(reviewId, {
        rating: editRating,
        content: editText,
      });

      if (response.isSuccess) {
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.id === reviewId ? { ...review, content: editText, rating: editRating } : review,
          ),
        );
        setEditingId(null);
        setEditText('');
        setEditRating(0);
        setEditError(null);
      } else {
        setEditError(response.message);
      }
    } catch (error) {
      console.error('Error updating review:', error);
      setEditError('리뷰 수정 중 오류가 발생했습니다.');
    }
  };

  const handleDelete = async (reviewId: number) => {
    if (window.confirm('리뷰를 삭제하시겠습니까?')) {
      try {
        const response = await deleteShortReview(reviewId);

        if (response.isSuccess) {
          setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
        } else {
          console.error('Failed to delete review:', response.message);
        }
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    }
  };

  const handleLike = async (reviewId: number, isLoggedIn: boolean) => {
    if (!isLoggedIn) return;
    if (isReactionLoading) return;

    try {
      setIsReactionLoading(true);

      // 좋아요는 reactionType: 1로 설정
      const response = await toggleShortReviewReaction(reviewId, 1);

      if (response.isSuccess) {
        setReviews((prevReviews) =>
          prevReviews.map((review) => {
            if (review.id === reviewId) {
              // API 응답에 따라 좋아요/싫어요 상태와 개수를 업데이트
              return {
                ...review,
                likes: response.result.likeCount,
                dislikes: response.result.dislikeCount,
                isLiked: response.result.isLiked,
                isDisliked: response.result.isDisliked,
                userVote: response.result.isLiked
                  ? 'like'
                  : response.result.isDisliked
                    ? 'dislike'
                    : null,
              };
            }
            return review;
          }),
        );
      } else {
        console.error('Failed to toggle like:', response.message);
      }
    } catch (error) {
      console.error('Error when liking review:', error);
    } finally {
      setIsReactionLoading(false);
    }
  };

  const handleDislike = async (reviewId: number, isLoggedIn: boolean) => {
    if (!isLoggedIn) return;
    if (isReactionLoading) return;

    try {
      setIsReactionLoading(true);

      // 싫어요는 reactionType: 0으로 설정
      const response = await toggleShortReviewReaction(reviewId, 0);

      if (response.isSuccess) {
        setReviews((prevReviews) =>
          prevReviews.map((review) => {
            if (review.id === reviewId) {
              // API 응답에 따라 좋아요/싫어요 상태와 개수를 업데이트
              return {
                ...review,
                likes: response.result.likeCount,
                dislikes: response.result.dislikeCount,
                isLiked: response.result.isLiked,
                isDisliked: response.result.isDisliked,
                userVote: response.result.isLiked
                  ? 'like'
                  : response.result.isDisliked
                    ? 'dislike'
                    : null,
              };
            }
            return review;
          }),
        );
      } else {
        console.error('Failed to toggle dislike:', response.message);
      }
    } catch (error) {
      console.error('Error when disliking review:', error);
    } finally {
      setIsReactionLoading(false);
    }
  };

  return {
    reviews,
    setReviews,
    editingId,
    editText,
    editRating,
    editError,
    setEditText,
    setEditRating,
    handleEditStart,
    handleEditCancel,
    handleEditComplete,
    handleDelete,
    handleLike,
    handleDislike,
    isReactionLoading,
  };
};

// Review submission hook
export const useReviewSubmission = (
  eventId: number,
  userId: number, // userId 추가
) => {
  const [reviewText, setReviewText] = useState('');
  const [inputRating, setInputRating] = useState(0);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReviewSubmit = async (): Promise<
    { isSuccess: boolean; result?: any } | undefined
  > => {
    if (reviewText.trim() === '') {
      setSubmitError('후기를 입력해주세요.');
      return;
    }
    if (inputRating === 0) {
      setSubmitError('별점을 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const reviewData = {
        userId, // 사용자 ID 추가
        rating: inputRating,
        content: reviewText,
      };

      const response = await createShortReview(eventId, reviewData);

      if (response.isSuccess) {
        // 성공 시 응답 반환
        setReviewText('');
        setInputRating(0);

        return response; // 응답 반환
      } else {
        setSubmitError('리뷰 등록에 실패했습니다.');
        return { isSuccess: false };
      }
    } catch (error) {
      console.error('Failed to submit review:', error);
      setSubmitError('리뷰 등록 중 오류가 발생했습니다.');
      return { isSuccess: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    reviewText,
    setReviewText,
    inputRating,
    setInputRating,
    submitError,
    isSubmitting,
    handleReviewSubmit,
  };
};

// Utility function
export const calculateAverageRating = (reviews: EventShortReview[]) => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / reviews.length).toFixed(1);
};
