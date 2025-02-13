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
  const [selectedPlaceLikeId, setSelectedPlaceLikeId] = useState<number | null>(null);
  const [showLocationDetail, setShowLocationDetail] = useState(false);
  const [placeDetails, setPlaceDetails] = useState<PlaceDetails | undefined>();
  const mapInstance = useRef<google.maps.Map | null>(null);
  const { placeLikeDetail, fetchPlaceLikeDetail } = usePlaceLikeDetail();

  const defaultLocation: LocationDetailType = {
    id: 0,
    name: '',
    isSelected: false,
    latitude: 34.72145462036133,
    longitude: 135.3616485595703,
    animeName: '',
    address: '',
    hashtags: [], // 빈 HashTag 배열
  };

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

  // MapPage.tsx의 useEffect 부분 수정
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
        }
      } catch (error) {
        console.error('MapPage - Failed to fetch place details:', error);
      }
    };

    fetchDetails();
  }, [selectedPlace, placeLikeDetail]);

  const handleFilterChange = (filter: 'spot' | 'event') => {
    console.log('Filter state:', filter);
  };

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
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
    setSelectedPlaceLikeId(null);
  };

  const currentLocation = React.useMemo(() => {
    if (selectedPlace) {
      return {
        latitude: selectedPlace.latitude,
        longitude: selectedPlace.longitude,
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
  }, [selectedPlace, placeLikeDetail]);

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
          hashtags: selectedPlace.hashtags.map((tag) => ({ hashTagId: 0, name: tag })), // HashTag 형식으로 변환
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
          hashtags: placeLikeDetail.hashtags, // 이미 HashTag[] 형식
        },
      ];
    }
    return [];
  }, [selectedPlace, placeLikeDetail]);

  const getLocationDetailData = (): LocationDetailType => {
    if (selectedPlace) {
      return {
        id: selectedPlace.id,
        name: selectedPlace.name,
        isSelected: true,
        latitude: selectedPlace.latitude,
        longitude: selectedPlace.longitude,
        animeName: selectedPlace.animeName,
        address: placeDetails?.address || '',
        hashtags: selectedPlace.hashtags.map((tag) => ({ hashTagId: 0, name: tag })), // HashTag 형식으로 변환
      };
    }
    if (placeLikeDetail) {
      return {
        id: placeLikeDetail.placeLikeId,
        name: placeLikeDetail.placeName,
        isSelected: true,
        latitude: placeLikeDetail.lat,
        longitude: placeLikeDetail.lng,
        animeName: placeLikeDetail.animationName,
        address: placeDetails?.address || '',
        hashtags: placeLikeDetail.hashtags, // 이미 HashTag[] 형식
      };
    }
    return defaultLocation;
  };

  return (
    <PageContainer>
      <LeftContainer
        onPlaceSelect={handlePlaceSelect}
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
          zoom={selectedPlace || placeLikeDetail ? 17 : 16}
          locations={mapLocations}
          selectedLocation={mapLocations[0] || null}
          onMarkerClick={(location, details) => {
            setPlaceDetails(details);
            setShowLocationDetail(true);
          }}
        />
        <FilterButton onFilterChange={handleFilterChange} />
        {showLocationDetail && (
          <LocationDetail
            location={getLocationDetailData()}
            placeDetails={placeDetails}
            onClose={handleCloseDetail}
            placeLikeId={selectedPlaceLikeId || undefined}
            // 선택된 장소의 원본 이름을 사용
            originalName={selectedPlace?.name}
          />
        )}
      </MapWrapper>
    </PageContainer>
  );
};

export default MapPage;
