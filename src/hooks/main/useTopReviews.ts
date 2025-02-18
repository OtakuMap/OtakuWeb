import { useQuery } from '@tanstack/react-query';
import { getTopReviews } from '../../api/main/review';
import { Review } from '../../types/main/review';

interface TopReviewsOptions {
  enabled?: boolean;
}

export const useTopReviews = (options?: TopReviewsOptions) => {
  return useQuery<Review[]>({
    queryKey: ['topReviews'],
    queryFn: async () => {
      const response = await getTopReviews();
      if (response.isSuccess && response.result?.reviews) {
        return response.result.reviews;
      }
      return [];
    },
    enabled: options?.enabled ?? true, // 이 부분 추가
    staleTime: 5 * 60 * 1000, // Infinity 대신 5분으로 수정
    gcTime: 30 * 60 * 1000, // Infinity 대신 30분으로 수정
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// export const useTopReviews = (options?: { enabled?: boolean }) => {
//   return useQuery<Review[]>({
//     queryKey: ['topReviews'],
//     queryFn: async () => {
//       const response = await getTopReviews();

//       if (response.isSuccess && response.result?.reviews) {
//         return response.result.reviews;
//       }
//       return [];
//     },
//     refetchOnWindowFocus: false,
//     refetchOnReconnect: false,
//     staleTime: Infinity,
//     gcTime: Infinity, // 캐시 계속 유지
//     retry: 1,
//     enabled: options?.enabled ?? true,
//   });
// };
