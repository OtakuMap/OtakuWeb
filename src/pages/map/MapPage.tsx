import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import LeftContainer from '../../components/map/LeftContainter';
import MapContainer from '../../components/map/MapContainer';
import FilterButton from '@/components/map/FilterButton';
import LocationDetail from '@/components/map/LocationDetail';
import { Place, Event } from '@/types/map/place';
import { RouteLocation, HashTag } from '@/types/map/route';
import { getPlaceDetails, PlaceDetails } from '../../utils/mapUtils';
import { usePlaceLikeDetail } from '@/hooks/map/usePlaceLikeDetail';
// import { SearchSuggestion } from '@/hooks/map/useMapSearch';
import { LocationGroup, SearchSuggestion } from '@/types/map/search';

const PageContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
`;

const MapWrapper = styled.div`
  flex: 1;
  height: 100vh;
  position: relative;
  margin: 0;
  padding: 0;
`;

const MapPage = () => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedPlaceLikeId, setSelectedPlaceLikeId] = useState<number | null>(null);
  const [showLocationDetail, setShowLocationDetail] = useState(false);
  const [placeDetails, setPlaceDetails] = useState<PlaceDetails | undefined>();
  const mapInstance = useRef<google.maps.Map | null>(null);
  const { placeLikeDetail, fetchPlaceLikeDetail } = usePlaceLikeDetail();
  const [selectedLocationGroup, setSelectedLocationGroup] = useState<LocationGroup | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (selectedPlaceLikeId) {
        try {
          await fetchPlaceLikeDetail(selectedPlaceLikeId);
        } catch (error) {
          console.error('Failed to fetch place like detail:', error);
        }
      }
    };

    fetchDetails();
  }, [selectedPlaceLikeId]);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!window.google?.maps || !mapInstance.current) {
        console.log('MapPage - Google Maps not initialized');
        return;
      }

      try {
        if (placeLikeDetail) {
          console.log('MapPage - Fetching details for placeLikeDetail:', placeLikeDetail);
          const details = await getPlaceDetails(
            placeLikeDetail.lat,
            placeLikeDetail.lng,
            import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
            mapInstance.current,
          );
          console.log('MapPage - Fetched place details:', details);
          setPlaceDetails(details);
        } else if (selectedPlace) {
          console.log('MapPage - Fetching details for selectedPlace:', selectedPlace);
          const details = await getPlaceDetails(
            selectedPlace.latitude,
            selectedPlace.longitude,
            import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
            mapInstance.current,
          );
          console.log('MapPage - Fetched place details:', details);
          setPlaceDetails(details);
        } else if (selectedEvent) {
          console.log('MapPage - Fetching details for selectedEvent:', selectedEvent);
          const details = await getPlaceDetails(
            selectedEvent.latitude,
            selectedEvent.longitude,
            import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
            mapInstance.current,
          );
          console.log('MapPage - Fetched place details:', details);
          setPlaceDetails(details);
        }
      } catch (error) {
        console.error('MapPage - Failed to fetch place details:', error);
      }
    };

    fetchDetails();
  }, [selectedPlace, selectedEvent, placeLikeDetail]);

  const handleFilterChange = (filter: 'spot' | 'event') => {
    console.log('Filter state:', filter);
  };

  const handlePlaceSelect = (place: SearchSuggestion['data'], locationGroup: LocationGroup) => {
    console.log('Raw place data:', place);
    console.log('Location group:', locationGroup);

    // Place 타입에 맞게 데이터 변환
    const placeData: Place = {
      id: place.placeId || 0,
      title: place.name,
      name: place.name,
      isSelected: true,
      latitude: place.latitude,
      longitude: place.longitude,
      animeName: place.animeName || '',
      address: '', // placeDetails에서 나중에 설정됨
      hashtags: place.selectedAnimation?.hashTags?.map((tag) => tag.name) || [],
      isLiked: place.selectedAnimation?.isLiked || false,
      selectedAnimation: {
        animationId: place.selectedAnimation?.animationId || 0,
        animationName: place.selectedAnimation?.animationName || '',
        isLiked: place.selectedAnimation?.isLiked || false,
        hashTags: place.selectedAnimation?.hashTags || [],
      },
    };

    setSelectedPlace(placeData);
    setSelectedLocationGroup(locationGroup);
    setSelectedEvent(null);
    setSelectedPlaceLikeId(null);
    setShowLocationDetail(true);
  };

  //이벤트 선택
  const handleEventSelect = (eventData: SearchSuggestion['data'], locationGroup: LocationGroup) => {
    const event: Event = {
      eventId: eventData.eventId!,
      name: eventData.name,
      isLiked: eventData.isLiked,
      animationTitle: eventData.animationTitle!,
      latitude: eventData.latitude,
      longitude: eventData.longitude,
      hashTags: eventData.hashTags, // 인터페이스에 맞춰서 대소문자 유지
    };

    console.log('Selected Event Data:', event);
    console.log('Location Group:', locationGroup);

    setSelectedEvent(event);
    setSelectedLocationGroup(locationGroup);
    setSelectedPlace(null);
    setSelectedPlaceLikeId(null);
    setShowLocationDetail(true);
  };

  const handleFavoritePlaceClick = (placeId: number) => {
    setSelectedPlaceLikeId(placeId);
    setSelectedPlace(null);
    setShowLocationDetail(true);
  };

  const handleCloseDetail = () => {
    setShowLocationDetail(false);
    setSelectedPlace(null);
    setSelectedEvent(null);
    setSelectedPlaceLikeId(null);
  };

  const currentLocation = React.useMemo(() => {
    if (selectedPlace) {
      return {
        latitude: selectedPlace.latitude,
        longitude: selectedPlace.longitude,
      };
    }
    if (selectedEvent) {
      return {
        latitude: selectedEvent.latitude,
        longitude: selectedEvent.longitude,
      };
    }
    if (placeLikeDetail) {
      return {
        latitude: placeLikeDetail.lat,
        longitude: placeLikeDetail.lng,
      };
    }
    return {
      latitude: 34.72145462036133,
      longitude: 135.3616485595703,
    };
  }, [selectedPlace, selectedEvent, placeLikeDetail]);

  const initialIsLiked = React.useMemo(() => {
    if (selectedEvent) {
      return selectedEvent.isLiked;
    }
    if (selectedPlace) {
      return selectedPlace.isLiked;
    }
    if (placeLikeDetail) {
      return placeLikeDetail.isLiked;
    }
    return false;
  }, [selectedEvent, selectedPlace, placeLikeDetail]);

  const mapLocations = React.useMemo((): RouteLocation[] => {
    if (selectedLocationGroup?.items) {
      const currentSelectedId = selectedEvent
        ? selectedEvent.eventId
        : selectedPlace
          ? selectedPlace.id
          : null;

      const sortedItems = [...selectedLocationGroup.items].sort((a, b) => {
        const aId = a.type === 'place' ? a.data.placeId : a.data.eventId;
        const bId = b.type === 'place' ? b.data.placeId : b.data.eventId;

        if (aId === currentSelectedId) return -1;
        if (bId === currentSelectedId) return 1;
        return 0;
      });

      return sortedItems
        .map((item) => {
          const id = item.type === 'place' ? item.data.placeId : item.data.eventId;
          if (!id) return null; // id가 없는 경우 처리

          return {
            id,
            name: item.name,
            isSelected: true,
            latitude: item.data.latitude,
            longitude: item.data.longitude,
            animeName:
              item.type === 'place' ? item.data.animeName || '' : item.data.animationTitle || '',
            hashtags:
              item.type === 'place'
                ? item.data.selectedAnimation?.hashTags || []
                : item.data.hashTags || [],
            type: item.type,
          };
        })
        .filter((item): item is RouteLocation => item !== null);
    }

    if (selectedEvent) {
      return [
        {
          id: selectedEvent.eventId,
          name: selectedEvent.name,
          isSelected: true,
          latitude: selectedEvent.latitude,
          longitude: selectedEvent.longitude,
          animeName: selectedEvent.animationTitle,
          hashtags: selectedEvent.hashTags,
          type: 'event',
        },
      ];
    }
    if (placeLikeDetail) {
      return [
        {
          id: placeLikeDetail.placeId,
          name: placeLikeDetail.placeName,
          isSelected: true,
          latitude: placeLikeDetail.lat,
          longitude: placeLikeDetail.lng,
          animeName: placeLikeDetail.animation.name,
          hashtags: placeLikeDetail.hashtags.map((tag: HashTag) => tag.name),
          type: 'place',
        },
      ];
    }
    return [];
  }, [selectedPlace, selectedEvent, placeLikeDetail, selectedLocationGroup]);

  return (
    <PageContainer>
      <LeftContainer
        onPlaceSelect={handlePlaceSelect}
        onEventSelect={handleEventSelect}
        onFavoritePlaceClick={handleFavoritePlaceClick}
      />
      <MapWrapper>
        <MapContainer
          ref={mapInstance}
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          center={{
            lat: currentLocation.latitude,
            lng: currentLocation.longitude,
          }}
          zoom={selectedPlace || selectedEvent || placeLikeDetail ? 17 : 16}
          locations={mapLocations}
          selectedLocation={mapLocations[0] || null}
          onMarkerClick={(location, details) => {
            setPlaceDetails(details);
            setShowLocationDetail(true);
          }}
        />
        <FilterButton onFilterChange={handleFilterChange} />
        {showLocationDetail && (selectedPlace || selectedEvent || placeLikeDetail) && (
          <LocationDetail
            location={mapLocations[0]}
            placeDetails={placeDetails}
            onClose={handleCloseDetail}
            routeDetail={null}
            isLoading={false}
            originalName={selectedPlace?.name || selectedEvent?.name || placeLikeDetail?.placeName}
            isEvent={!!selectedEvent}
            eventId={selectedEvent?.eventId}
            initialIsLiked={initialIsLiked}
            locationItems={selectedLocationGroup?.items}
            placeLikeDetail={placeLikeDetail} // 추가
          />
        )}
      </MapWrapper>
    </PageContainer>
  );
};

export default MapPage;
