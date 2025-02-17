import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPopularEvents, toggleEventLike } from '@/api/main/event';
import { Event } from '@/types/main/event';

export const usePopularEvents = () => {
  return useQuery<Event[]>({
    queryKey: ['popularEvents'],
    queryFn: async () => {
      const response = await getPopularEvents();
      if (response.isSuccess && Array.isArray(response.result)) {
        return response.result;
      }
      throw new Error('Invalid data format');
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    retryDelay: 1000,
  });
};

// export const useEventLikeToggle = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: toggleEventLike,
//     onSuccess: (data, eventId) => {
//       // Update the cache optimistically
//       queryClient.setQueryData<Event[]>(['popularEvents'], (oldData) => {
//         if (!oldData) return oldData;
//         return oldData.map(event =>
//           event.id === eventId
//             ? { ...event, isLiked: data.result.isLiked }
//             : event
//         );
//       });
//     },
//   });
// };
