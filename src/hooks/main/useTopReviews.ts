import { useQuery } from '@tanstack/react-query';
import { getTopReviews } from '../../api/main/review';
import { Review } from '../../types/main/review';

export const useTopReviews = (options?: { enabled?: boolean }) => {
  return useQuery<Review[]>({
    queryKey: ['topReviews'],
    queryFn: async () => {
      const response = await getTopReviews();

      if (response.isSuccess && response.result?.reviews) {
        return response.result.reviews;
      }
      return [];
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    gcTime: Infinity, // 캐시 계속 유지
    retry: 1,
    enabled: options?.enabled ?? true,
  });
};
