import { useState, useCallback } from 'react';
import { searchAPI } from '@/api/map/mapSearch';
import { useAppSelector } from '../reduxHooks';

export interface LocationGroup {
  latitude: number;
  longitude: number;
  items: SearchSuggestion[];
}

export interface SearchSuggestion {
  id: string;
  name: string;
  animeName?: string;
  type: 'place' | 'event';
  data: any;
}

export const useSearch = () => {
  const { isLoggedIn, userId } = useAppSelector((state) => state.auth);
  const [groupedSuggestions, setGroupedSuggestions] = useState<LocationGroup[]>([]);
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

  const searchKeyword = useCallback(
    async (keyword: string) => {
      if (!keyword.trim()) {
        setGroupedSuggestions([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await searchAPI.search(keyword, isLoggedIn);
        console.log('Raw Search Response:', response);

        if (response.isSuccess) {
          // Group by location
          const locationGroups = response.result.map((location) => {
            const suggestions: SearchSuggestion[] = [];

            // Process places
            location.places.forEach((place) => {
              if (place.animations?.length > 0) {
                const selectedAnimation = place.animations[0];
                suggestions.push({
                  id: `place-${place.placeId}`,
                  name: place.name,
                  animeName: selectedAnimation.animationName,
                  type: 'place',
                  data: {
                    id: place.placeId,
                    placeId: place.placeId,
                    name: place.name,
                    latitude: location.latitude,
                    longitude: location.longitude,
                    animeName: selectedAnimation.animationName,
                    hashtags: selectedAnimation.hashTags,
                    isLiked: selectedAnimation.isLiked,
                    animations: place.animations,
                    selectedAnimation: {
                      animationId: selectedAnimation.animationId,
                      animationName: selectedAnimation.animationName,
                      isLiked: selectedAnimation.isLiked,
                      hashTags: selectedAnimation.hashTags,
                    },
                  },
                });
              }
            });

            // Process events
            location.events.forEach((event) => {
              suggestions.push({
                id: `event-${event.eventId}`,
                name: event.name,
                animeName: event.animationTitle,
                type: 'event',
                data: {
                  eventId: event.eventId,
                  name: event.name,
                  animationTitle: event.animationTitle,
                  isLiked: event.isLiked,
                  hashTags: event.hashTags,
                  latitude: location.latitude,
                  longitude: location.longitude,
                },
              });
            });

            return {
              latitude: location.latitude,
              longitude: location.longitude,
              items: suggestions,
            };
          });

          console.log('Grouped suggestions:', locationGroups);
          setGroupedSuggestions(locationGroups);
        }
      } catch (err) {
        console.error('Search error:', err);
        setError(err instanceof Error ? err : new Error('Search failed'));
        setGroupedSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoggedIn],
  );

  return {
    groupedSuggestions,
    isLoading,
    error,
    searchKeyword,
    loadRecentSearches,
    saveRecentSearch,
    deleteRecentSearch,
    clearRecentSearches,
  };
};
