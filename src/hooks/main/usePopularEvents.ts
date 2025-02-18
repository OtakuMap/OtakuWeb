import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPopularEvents, toggleEventLike } from '@/api/main/event';
import { Event } from '@/types/main/event';
import { useAppSelector } from '@/hooks/reduxHooks';

interface PopularEventsOptions {
  enabled?: boolean;
}

export const usePopularEvents = (options?: PopularEventsOptions) => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  return useQuery<Event[]>({
    queryKey: ['popularEvents', isLoggedIn],
    queryFn: async () => {
      const response = await getPopularEvents();
      if (response.isSuccess && Array.isArray(response.result)) {
        return response.result;
      }
      throw new Error('Invalid data format');
    },
    enabled: options?.enabled ?? true,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// export const usePopularEvents = () => {
//   const { isLoggedIn } = useAppSelector((state) => state.auth);

//   return useQuery<Event[]>({
//     queryKey: ['popularEvents', isLoggedIn], // isLoggedIn을 queryKey에 추가
//     queryFn: async () => {
//       const response = await getPopularEvents();
//       if (response.isSuccess && Array.isArray(response.result)) {
//         return response.result;
//       }
//       throw new Error('Invalid data format');
//     },
//     refetchOnWindowFocus: false,
//     refetchOnReconnect: false,
//     staleTime: 5 * 60 * 1000,
//     retry: 2,
//     retryDelay: 1000,
//   });
// };
