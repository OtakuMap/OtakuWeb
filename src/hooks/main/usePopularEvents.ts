import { useQuery } from '@tanstack/react-query';
import { getPopularEvents } from '../../api/main/event';
import { Event } from '../../types/main/event';

export const usePopularEvents = () => {
  return useQuery<Event[]>({
    queryKey: ['popularEvents'],
    queryFn: async () => {
      try {
        const response = await getPopularEvents();
        console.log('API Response:', response); // 디버깅용 로그

        if (response.isSuccess && Array.isArray(response.result)) {
          return response.result;
        }

        // 더미 데이터 반환
        return Array(8)
          .fill(null)
          .map((_, index) => ({
            id: index + 1,
            title: `이벤트 ${index + 1}`,
            startDate: '2024-01-01',
            endDate: '2024-12-31',
            thumbnail: {
              id: index + 1,
              uuid: `event-${index + 1}`,
              fileName: `event-${index + 1}.jpg`,
              fileUrl: `https://picsum.photos/300/400?random=${index + 1}`,
            },
          }));
      } catch (error) {
        console.error('Error in usePopularEvents:', error);
        throw error;
      }
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity, // 5분
    gcTime: Infinity, //쿼리 결과가 비활성화된 후 가비지 컬렉션되기까지의 시간
    retry: 1,
  });
};
