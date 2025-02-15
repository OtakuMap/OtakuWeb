// usePlaceLikeDetail.ts
import { useState, useCallback } from 'react';
import { PlaceLikeDetail } from '@/types/map/placeLikeDetail';
import { getPlaceLikeDetail } from '@/api/map/placeLikeDetail';

export const usePlaceLikeDetail = () => {
  const [placeLikeDetail, setPlaceLikeDetail] = useState<PlaceLikeDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPlaceLikeDetail = useCallback(async (placeLikeId: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getPlaceLikeDetail(placeLikeId);

      if (response.isSuccess && response.result) {
        setPlaceLikeDetail(response.result);
      } else {
        throw new Error(response.message || '데이터를 불러오는데 실패했습니다.');
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []); // 의존성 배열을 비워서 함수가 다시 생성되지 않도록 함

  return {
    placeLikeDetail,
    isLoading,
    error,
    fetchPlaceLikeDetail,
  };
};
