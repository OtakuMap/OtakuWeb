import { useState } from 'react';
import { PlaceLikeDetail } from '@/types/map/placeLikeDetail';
import { getPlaceLikeDetail } from '@/api/map/placeLikeDetail';

export const usePlaceLikeDetail = () => {
  const [placeLikeDetail, setPlaceLikeDetail] = useState<PlaceLikeDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPlaceLikeDetail = async (placeLikeId: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getPlaceLikeDetail(placeLikeId);

      if (response.isSuccess) {
        setPlaceLikeDetail(response.result);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    placeLikeDetail,
    isLoading,
    error,
    fetchPlaceLikeDetail,
  };
};
