import { SearchResult } from '@/api/map/mapSearch';
import { LocationEventData, PlaceLocationData, EventLocationData } from '@/types/map/locationEvent';

export const transformSearchResultToLocationData = (
  searchResult: SearchResult,
  selectedId?: number,
): LocationEventData[] => {
  const transformedData: LocationEventData[] = [];

  // Places 변환
  searchResult.places.forEach((place) => {
    if (!place.animations.length) return;

    const placeData: PlaceLocationData = {
      type: 'place',
      id: place.placeId,
      name: place.name,
      isSelected: selectedId ? selectedId === place.placeId : false,
      latitude: searchResult.latitude,
      longitude: searchResult.longitude,
      animeName: place.animations[0].animationName,
      isLiked: place.animations[0].isLiked,
      isFavorite: false,
      hashtags: place.animations[0].hashTags,
      animationListDTO: {
        placeAnimations: place.animations.map((animation) => ({
          placeAnimationId: 0,
          animationId: animation.animationId,
          animationName: animation.animationName,
        })),
        listSize: place.animations.length,
      },
    };

    transformedData.push(placeData);
  });

  // Events 변환
  searchResult.events.forEach((event) => {
    const eventData: EventLocationData = {
      type: 'event',
      id: event.eventId,
      name: event.name,
      isSelected: selectedId ? selectedId === event.eventId : false,
      latitude: searchResult.latitude,
      longitude: searchResult.longitude,
      animationTitle: event.animationTitle,
      isLiked: event.isLiked,
      hashtags: event.hashTags,
    };

    transformedData.push(eventData);
  });

  return transformedData;
};
