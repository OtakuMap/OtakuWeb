import { useState, useEffect } from 'react';
import { EventDetails } from '@/types/event/details';
import { getEventDetails } from '@/api/event/details';
import { createShortReview } from '@/api/event/short-review';

interface Review {
  id: number;
  profileImage: string;
  username: string;
  rating: number;
  maxRating: number;
  likes: number;
  dislikes: number;
  content: string;
  userVote: 'like' | 'dislike' | null;
}

export const useEventDetails = (eventId: number) => {
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!eventId) {
        console.log('No eventId provided, using temporary data');
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

export const useReviews = (initialReviews: Review[]) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [editRating, setEditRating] = useState(0);

  const handleEditStart = (review: Review) => {
    setEditingId(review.id);
    setEditText(review.content);
    setEditRating(review.rating);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditText('');
    setEditRating(0);
  };

  const handleEditComplete = (reviewId: number) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId ? { ...review, content: editText, rating: editRating } : review,
      ),
    );
    setEditingId(null);
    setEditText('');
    setEditRating(0);
  };

  const handleDelete = (reviewId: number) => {
    if (window.confirm('리뷰를 삭제하시겠습니까?')) {
      setReviews(reviews.filter((review) => review.id !== reviewId));
    }
  };

  const handleLike = (reviewId: number) => {
    setReviews(
      reviews.map((review) => {
        if (review.id === reviewId) {
          if (review.userVote === 'like') {
            return { ...review, likes: review.likes - 1, userVote: null };
          } else {
            const newLikes = review.likes + 1;
            const newDislikes =
              review.userVote === 'dislike' ? review.dislikes - 1 : review.dislikes;
            return { ...review, likes: newLikes, dislikes: newDislikes, userVote: 'like' };
          }
        }
        return review;
      }),
    );
  };

  const handleDislike = (reviewId: number) => {
    setReviews(
      reviews.map((review) => {
        if (review.id === reviewId) {
          if (review.userVote === 'dislike') {
            return { ...review, dislikes: review.dislikes - 1, userVote: null };
          } else {
            const newDislikes = review.dislikes + 1;
            const newLikes = review.userVote === 'like' ? review.likes - 1 : review.likes;
            return { ...review, likes: newLikes, dislikes: newDislikes, userVote: 'dislike' };
          }
        }
        return review;
      }),
    );
  };

  return {
    reviews,
    setReviews,
    editingId,
    editText,
    editRating,
    setEditText,
    setEditRating,
    handleEditStart,
    handleEditCancel,
    handleEditComplete,
    handleDelete,
    handleLike,
    handleDislike,
  };
};

export const useReviewSubmission = (
  eventId: number,
  reviews: Review[],
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>,
  profileData: {
    profileImage: string;
    name: string;
    rating: number;
    maxRating: number;
  },
) => {
  const [reviewText, setReviewText] = useState('');
  const [inputRating, setInputRating] = useState(0);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleReviewSubmit = async () => {
    if (reviewText.trim() === '') {
      window.confirm('후기를 등록해주세요!');
      return;
    }
    if (inputRating === 0) {
      window.confirm('별점을 등록해주세요!');
      return;
    }

    try {
      setSubmitError(null);
      const reviewData = {
        userId: 1, // 현재 로그인한 사용자 ID
        rating: inputRating,
        content: reviewText,
      };

      const response = await createShortReview(eventId, reviewData);

      if (response.isSuccess) {
        const newReview: Review = {
          id: reviews.length + 1,
          profileImage: profileData.profileImage,
          username: profileData.name,
          rating: inputRating,
          maxRating: 4,
          likes: 0,
          dislikes: 0,
          content: reviewText,
          userVote: null,
        };

        setReviews([newReview, ...reviews]);
        setReviewText('');
        setInputRating(0);
      } else {
        setSubmitError('리뷰 등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('Failed to submit review:', error);
      setSubmitError('리뷰 등록 중 오류가 발생했습니다.');
    }
  };

  return {
    reviewText,
    setReviewText,
    inputRating,
    setInputRating,
    submitError,
    handleReviewSubmit,
  };
};

export const calculateAverageRating = (reviews: Review[]) => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / reviews.length).toFixed(1);
};
