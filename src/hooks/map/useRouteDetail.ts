import { useState, useCallback } from 'react';
import { getRouteDetail, RouteDetailResponse } from '@/api/map/routeDetail';
import { toast } from 'react-toastify';

interface UseRouteDetailReturn {
  routeDetail: RouteDetailResponse['result'] | null;
  isLoading: boolean;
  error: Error | null;
  fetchRouteDetail: (routeId: number, placeId: number, animationId: number) => Promise<void>; // animationId 파라미터 추가
}

export const useRouteDetail = (): UseRouteDetailReturn => {
  const [routeDetail, setRouteDetail] = useState<RouteDetailResponse['result'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchRouteDetail = useCallback(
    async (routeId: number, placeId: number, animationId: number) => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getRouteDetail(routeId, placeId, animationId);
        setRouteDetail(response.result);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : '장소 상세 정보를 불러오는데 실패했습니다.';
        setError(new Error(errorMessage));
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return {
    routeDetail,
    isLoading,
    error,
    fetchRouteDetail,
  };
};
