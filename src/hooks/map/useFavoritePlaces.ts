import { useState } from 'react';
import { PlaceLike } from '@/types/map/favorite';
import { getFavoritePlaces } from '@/api/map/favorite';
import { Place } from '@/types/map/place';

interface FetchParams {
  userId: number;
  lastId?: number;
  limit?: number;
}

export const useFavoritePlaces = () => {
  const [favoritePlaces, setFavoritePlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasNext, setHasNext] = useState(false);
  const [lastId, setLastId] = useState(0);

  const fetchFavoritePlaces = async (params: FetchParams) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getFavoritePlaces(params);

      // PlaceLike를 Place 타입으로 변환
      const convertedPlaces: Place[] = response.result.placeLikes.map((place) => ({
        id: place.id,
        title: place.name,
        name: place.name,
        isSelected: false,
        latitude: 0, // API 응답에 없는 데이터
        longitude: 0, // API 응답에 없는 데이터
        animeName: '',
        address: place.detail,
        hashtags: [],
        relatedPlaces: [],
      }));

      setFavoritePlaces(convertedPlaces);
      setHasNext(response.result.hasNext);
      setLastId(response.result.lastId);
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
    hasNext,
    lastId,
  };
};
