import { useState } from 'react';
import { PlaceLike } from '@/types/map/favorite';
import { getFavoritePlaces } from '@/api/map/favorite';

interface FetchParams {
  lastId?: number;
  limit?: number;
}

export const useFavoritePlaces = () => {
  const [favoritePlaces, setFavoritePlaces] = useState<PlaceLike[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasNext, setHasNext] = useState(false);
  const [lastId, setLastId] = useState(0);

  const fetchFavoritePlaces = async (params: FetchParams) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getFavoritePlaces(params);

      if (response.isSuccess) {
        setFavoritePlaces(response.result.placeLikes);
        setHasNext(response.result.hasNext);
        setLastId(response.result.lastId);
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
    favoritePlaces,
    isLoading,
    error,
    fetchFavoritePlaces,
    hasNext,
    lastId,
  };
};
