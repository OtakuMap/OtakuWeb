import { useState, useCallback } from 'react';
import { searchAPI } from '@/api/map/mapSearch';
import { useAppSelector } from '../reduxHooks';

export interface SearchSuggestion {
  id: string;
  name: string;
  animeName?: string;
  type: 'place' | 'event';
  data: any;
}

export const useSearch = () => {
  const { isLoggedIn, userId } = useAppSelector((state) => state.auth);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 로그인 상태에 따라 다른 키 사용
  const getStorageKey = useCallback(() => {
    return isLoggedIn && userId ? `recentSearches_${userId}` : 'recentSearches_guest';
  }, [isLoggedIn, userId]);

  const loadRecentSearches = useCallback((): string[] => {
    const saved = localStorage.getItem(getStorageKey());
    return saved ? JSON.parse(saved) : [];
  }, [getStorageKey]);

  const saveRecentSearch = useCallback(
    (search: string) => {
      const recent = loadRecentSearches();
      const updated = [...recent.filter((item) => item !== search), search].slice(-5);
      localStorage.setItem(getStorageKey(), JSON.stringify(updated));
    },
    [loadRecentSearches, getStorageKey],
  );

  const deleteRecentSearch = useCallback(
    (search: string) => {
      const recent = loadRecentSearches();
      const updated = recent.filter((item) => item !== search);
      localStorage.setItem(getStorageKey(), JSON.stringify(updated));
    },
    [loadRecentSearches, getStorageKey],
  );

  const clearRecentSearches = useCallback(() => {
    localStorage.removeItem(getStorageKey());
  }, [getStorageKey]);

  const searchKeyword = useCallback(async (keyword: string) => {
    if (!keyword.trim()) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await searchAPI.search(keyword);
      console.log('Search response:', response);

      if (response.isSuccess) {
        const newSuggestions: SearchSuggestion[] = [];

        response.result.forEach((location) => {
          // 장소 처리 - 첫 번째 애니메이션만 사용
          location.places.forEach((place) => {
            // 장소당 하나의 suggestion만 생성
            if (place.animations.length > 0) {
              newSuggestions.push({
                id: `place-${place.placeId}`,
                name: place.name,
                animeName: place.animations[0].animationName, // 첫 번째 애니메이션 사용
                type: 'place',
                data: {
                  ...place,
                  latitude: location.latitude,
                  longitude: location.longitude,
                  selectedAnimation: place.animations[0],
                },
              });
            }
          });

          // 이벤트 처리
          location.events.forEach((event) => {
            newSuggestions.push({
              id: `event-${event.eventId}`,
              name: event.name,
              animeName: event.animationTitle,
              type: 'event',
              data: {
                ...event,
                latitude: location.latitude,
                longitude: location.longitude,
              },
            });
          });
        });

        console.log('Processed suggestions:', newSuggestions);
        setSuggestions(newSuggestions);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Search failed'));
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    suggestions,
    isLoading,
    error,
    searchKeyword,
    loadRecentSearches,
    saveRecentSearch,
    deleteRecentSearch,
    clearRecentSearches,
  };
};
