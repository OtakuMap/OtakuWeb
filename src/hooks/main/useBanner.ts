import { useQuery } from '@tanstack/react-query';
import { getBanner, BannerResponse } from '@/api/main/banner';

export const useBanner = () => {
  return useQuery<BannerResponse>({
    queryKey: ['banner'],
    queryFn: getBanner,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 30 * 60 * 1000, // 30분
    retry: 1,
    // enabled는 제거 - 배너는 독립적으로 로드
  });
};
