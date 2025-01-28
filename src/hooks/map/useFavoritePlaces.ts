import { useState } from 'react';
import { PlaceLike } from '@/types/map/favorite';
import { getFavoritePlaces } from '@/api/map/favorite';
import { Place } from '@/types/map/place';

export const useFavoritePlaces = () => {
  const [favoritePlaces, setFavoritePlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchFavoritePlaces = async (userId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getFavoritePlaces(userId);

      // PlaceLike를 Place 타입으로 변환
      const convertedPlaces: Place[] = response.result.placeLikes.slice(0, 3).map((place) => ({
        id: place.id,
        title: place.name,
        name: place.name,
        isSelected: false,
        latitude: place.lat,
        longitude: place.lng,
        animeName: '', // API에서 제공하지 않는 정보는 기본값으로
        address: place.detail,
        hashtags: [], // API에서 제공하지 않는 정보는 빈 배열로
        relatedPlaces: [], // API에서 제공하지 않는 정보는 빈 배열로
      }));

      setFavoritePlaces(convertedPlaces);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    favoritePlaces,
    isLoading,
    error,
    fetchFavoritePlaces,
  };
};
