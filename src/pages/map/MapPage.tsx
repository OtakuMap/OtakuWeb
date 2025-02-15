import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import LeftContainer from '../../components/map/LeftContainter';
import MapContainer from '../../components/map/MapContainer';
import FilterButton from '@/components/map/FilterButton';
import LocationDetail from '@/components/map/LocationDetail';
import { Place } from '@/types/map/place';
import { RouteLocation, LocationDetail as LocationDetailType } from '@/types/map/route';
import { getPlaceDetails, PlaceDetails } from '../../utils/mapUtils';
import { usePlaceLikeDetail } from '@/hooks/map/usePlaceLikeDetail';

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
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null); //선택된 이벤트
  const [selectedPlaceLikeId, setSelectedPlaceLikeId] = useState<number | null>(null);
  const [showLocationDetail, setShowLocationDetail] = useState(false);
  const [placeDetails, setPlaceDetails] = useState<PlaceDetails | undefined>();
  const mapInstance = useRef<google.maps.Map | null>(null);
  const { placeLikeDetail, fetchPlaceLikeDetail } = usePlaceLikeDetail();

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

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
    setSelectedEvent(null); // 이벤트 선택 초기화
    setSelectedPlaceLikeId(null);
    setShowLocationDetail(true);
  };

  //이벤트 선택
  const handleEventSelect = (event: any) => {
    setSelectedEvent(event);
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

  const mapLocations = React.useMemo((): RouteLocation[] => {
    if (selectedPlace) {
      return [
        {
          id: selectedPlace.id,
          name: selectedPlace.name,
          isSelected: true,
          latitude: selectedPlace.latitude,
          longitude: selectedPlace.longitude,
          animeName: selectedPlace.animeName,
          hashtags: selectedPlace.hashtags,
        },
      ];
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
          hashtags: selectedEvent.hashTags.map((tag: HashTag) => tag.name), // HashTag[] -> string[]
        },
      ];
    }
    if (placeLikeDetail) {
      return [
        {
          id: placeLikeDetail.placeLikeId,
          name: placeLikeDetail.placeName,
          isSelected: true,
          latitude: placeLikeDetail.lat,
          longitude: placeLikeDetail.lng,
          animeName: placeLikeDetail.animationName,
          hashtags: placeLikeDetail.hashtags.map((tag) => tag.name), // HashTag[] -> string[]
        },
      ];
    }
    return [];
  }, [selectedPlace, selectedEvent, placeLikeDetail]);

  return (
    <PageContainer>
      <LeftContainer
        onPlaceSelect={handlePlaceSelect}
        onEventSelect={handleEventSelect} // 추가: 이벤트 선택 핸들러 전달
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
        {showLocationDetail && mapLocations.length > 0 && (
          <LocationDetail
            location={mapLocations[0]}
            placeDetails={placeDetails}
            onClose={handleCloseDetail}
            routeDetail={null} // routeDetail이 필요한 경우 적절한 값 설정
            isLoading={false} // 로딩 상태 관리가 필요한 경우 적절한 값 설정
            originalName={selectedPlace?.name || selectedEvent?.name || placeLikeDetail?.placeName}
            isEvent={!!selectedEvent}
            eventId={selectedEvent?.eventId}
          />
        )}
      </MapWrapper>
    </PageContainer>
  );
};

export default MapPage;
