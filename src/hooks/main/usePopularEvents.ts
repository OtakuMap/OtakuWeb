import { useQuery } from '@tanstack/react-query';
import { getPopularEvents } from '../../api/main/event';
import { Event } from '../../types/main/event';
import { useAppSelector } from '../reduxHooks';

export const usePopularEvents = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  return useQuery<Event[]>({
    queryKey: ['popularEvents'],
    queryFn: async () => {
      if (!isLoggedIn) {
        return [];
      }
      const response = await getPopularEvents();

      if (response.isSuccess && response.result) {
        console.log('Popular events response:', response.result);
        return response.result;
      }
      console.log('No events data available');
      return [];
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    retry: 0,
    enabled: isLoggedIn,
  });
};
