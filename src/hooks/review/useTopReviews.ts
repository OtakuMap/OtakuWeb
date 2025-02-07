// hooks/review/useTopReviews.ts
import { useState, useEffect } from 'react';
import { TopReview } from '../../types/review/top';
import { getTop7Reviews } from '../../api/review/top';

export const useTopReviews = (fakeTopReviews: TopReview[]) => {
  const [topReviews, setTopReviews] = useState<TopReview[]>(fakeTopReviews);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getTop7Reviews();

        if (response.isSuccess && response.result?.reviews?.length > 0) {
          const validReviews = response.result.reviews.filter(
            (review) => review && review.reviewImage && review.reviewImage.fileUrl,
          );
          setTopReviews(validReviews.length > 0 ? validReviews : fakeTopReviews);
        } else {
          setTopReviews(fakeTopReviews);
        }
      } catch (err) {
        console.error('Failed to fetch top reviews:', err);
        setError('Failed to load reviews. Using sample data instead.');
        setTopReviews(fakeTopReviews);
      } finally {
        setLoading(false);
      }
    };

    fetchTopReviews();
  }, [fakeTopReviews]);

  return { topReviews, loading, error };
};
