import { useQuery } from '@tanstack/react-query';
import { getTopReviews } from '../../api/main/review';
import { Review } from '../../types/main/review';
import { useAppSelector } from '../reduxHooks';

export const useTopReviews = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  return useQuery<Review[]>({
    queryKey: ['topReviews'],
    queryFn: async () => {
      if (!isLoggedIn) {
        return [];
      }
      const response = await getTopReviews();

      if (response.isSuccess && response.result?.reviews) {
        return response.result.reviews;
      }
      return [];
    },
    // 불필요한 리패칭 방지
    refetchOnWindowFocus: false, // 윈도우 포커스시 리패칭 방지
    refetchOnReconnect: false, // 재연결시 리패칭 방지
    staleTime: Infinity, // 데이터를 항상 신선한 것으로 간주
    retry: 0, // 실패시 재시도 횟수
    enabled: isLoggedIn,
  });
};
