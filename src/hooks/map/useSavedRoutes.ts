import { useState } from 'react';
import { RouteLike } from '@/types/map/routeLikes';
import { getSavedRoutes } from '@/api/map/routeLikes';

interface FetchParams {
  lastId?: number;
  limit?: number;
}

export const useSavedRoutes = () => {
  const [savedRoutes, setSavedRoutes] = useState<RouteLike[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasNext, setHasNext] = useState(false);
  const [lastId, setLastId] = useState(0);

  const fetchSavedRoutes = async (params: FetchParams) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getSavedRoutes(params);

      if (response.isSuccess) {
        setSavedRoutes(response.result.routeLikes);
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
    savedRoutes,
    isLoading,
    error,
    fetchSavedRoutes,
    hasNext,
    lastId,
  };
};
