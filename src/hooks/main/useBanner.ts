import { useQuery } from '@tanstack/react-query';
import { getBanner, BannerResponse } from '@/api/main/banner';

export const useBanner = () => {
  return useQuery<BannerResponse>({
    queryKey: ['banner'],
    queryFn: getBanner,
  });
};
