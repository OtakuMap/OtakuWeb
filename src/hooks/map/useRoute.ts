import { useState, useEffect } from 'react';
import { RouteLocation, RouteInfo, RouteApiResponse } from '@/types/map/route';
import { getRouteById } from '@/api/map/route';
import { toast } from 'react-toastify';

interface UseRouteProps {
  routeId?: string;
  initialLocations?: RouteLocation[];
}

interface UseRouteReturn {
  routeInfo: RouteInfo;
  locations: RouteLocation[];
  setLocations: (locations: RouteLocation[]) => void;
  isLoading: boolean;
  error: Error | null;
}

export const useRoute = ({ routeId, initialLocations }: UseRouteProps): UseRouteReturn => {
  const [routeInfo, setRouteInfo] = useState<RouteInfo>({
    routeName: '',
    animationId: 0,
    animationName: '',
  });
  const [locations, setLocations] = useState<RouteLocation[]>(initialLocations || []);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRouteData = async () => {
      if (!routeId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const response = await getRouteById(parseInt(routeId));

        setRouteInfo({
          routeName: response.result.routeName,
          animationId: response.result.animationId,
          animationName: response.result.animationName,
        });

        const transformedLocations = response.result.places.map((place) => ({
          id: place.id,
          name: place.name,
          latitude: place.latitude,
          longitude: place.longitude,
          isSelected: false,
          animeName: response.result.animationName,
          hashtags: [],
        }));

        setLocations(transformedLocations);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : '루트 정보를 불러오는데 실패했습니다.';
        setError(new Error(errorMessage));
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRouteData();
  }, [routeId]);

  return {
    routeInfo,
    locations,
    setLocations,
    isLoading,
    error,
  };
};
