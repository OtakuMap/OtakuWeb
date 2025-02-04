import React, { useState, useRef, useEffect } from 'react'; // useRef, useEffect 추가
import styled from 'styled-components';
import LeftContainer from '../../components/map/LeftContainter';
import MapContainer from '../../components/map/MapContainer';
import FilterButton from '@/components/map/FilterButton';
import LocationDetail from '@/components/map/LocationDetail';
import { Place } from '@/types/map/place';
import { LocationDetail as LocationDetailType } from '@/types/map/route'; // LocationDetailType 추가
import { getPlaceDetails, PlaceDetails } from '../../utils/mapUtils'; // getPlaceDetails와 PlaceDetails 타입 추가
import { getPlaceLikeDetail } from '@/api/map/placeLikeDetail'; // API 함수 추가

const PageContainer = styled.div`
  display: flex;
  width: 100vw; // 100vw로 변경
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

  const defaultLocation: LocationDetailType = {
    id: 0,
    name: '',
    isSelected: false,
    latitude: 34.72145462036133,
    longitude: 135.3616485595703,
    address: '',
    animeName: '',
    hashtags: [],
  };

  // placeLikeDetail이 있을 때 placeDetails 가져오기
  useEffect(() => {
    const fetchDetails = async () => {
      if (selectedPlaceLikeId && window.google?.maps && mapInstance.current) {
        try {
          const response = await getPlaceLikeDetail(selectedPlaceLikeId);
          if (response.isSuccess) {
            const details = await getPlaceDetails(
              response.result.lat,
              response.result.lng,
              import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
              mapInstance.current,
            );
            setPlaceDetails(details);
          }
        } catch (error) {
          console.error('Failed to fetch place details:', error);
        }
      }
    };

    fetchDetails();
  }, [selectedPlaceLikeId]);

  // selectedPlace가 변경될 때 placeDetails 가져오기
  useEffect(() => {
    const fetchDetails = async () => {
      if (selectedPlace && window.google?.maps && mapInstance.current) {
        try {
          const details = await getPlaceDetails(
            selectedPlace.latitude,
            selectedPlace.longitude,
            import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
            mapInstance.current,
          );
          setPlaceDetails(details);
        } catch (error) {
          console.error('Failed to fetch place details:', error);
        }
      }
    };

    fetchDetails();
  }, [selectedPlace]);

  const handleFilterChange = (filter: 'spot' | 'event') => {
    console.log('Filter state:', filter);
  };

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
    setSelectedPlaceLikeId(null); // 일반 장소 선택 시 placeLikeId 초기화
    setShowLocationDetail(true);
  };

  // 저장된 장소 클릭 핸들러 추가
  const handleFavoritePlaceClick = (placeId: number) => {
    setSelectedPlaceLikeId(placeId);
    setSelectedPlace(null); // 저장된 장소 선택 시 일반 장소 초기화
    setShowLocationDetail(true);
  };

  const handleCloseDetail = () => {
    setShowLocationDetail(false);
    setSelectedPlaceLikeId(null);
  };

  return (
    <PageContainer>
      <LeftContainer
        onPlaceSelect={handlePlaceSelect}
        onFavoritePlaceClick={handleFavoritePlaceClick}
      />
      <MapWrapper>
        <MapContainer
          ref={mapInstance} // ref 추가
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          center={
            selectedPlace
              ? {
                  lat: selectedPlace.latitude,
                  lng: selectedPlace.longitude,
                }
              : {
                  lat: 34.72145462036133,
                  lng: 135.3616485595703,
                }
          }
          zoom={selectedPlace ? 17 : 16}
          locations={selectedPlace ? [selectedPlace] : []}
          onMarkerClick={() => setShowLocationDetail(true)}
        />
        <FilterButton onFilterChange={handleFilterChange} />
        {showLocationDetail && (
          <LocationDetail
            location={selectedPlace || defaultLocation}
            placeDetails={placeDetails} // placeDetails 전달
            onClose={handleCloseDetail}
            placeLikeId={selectedPlaceLikeId || undefined}
          />
        )}
      </MapWrapper>
    </PageContainer>
  );
};

export default MapPage;
