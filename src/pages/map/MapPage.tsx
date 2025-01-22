import React, { useState } from 'react';
import styled from 'styled-components';
import LeftContainer from '../../components/map/LeftContainter';
import MapContainer from '../../components/map/MapContainer';
import FilterButton from '@/components/map/FilterButton';
import LocationDetail from '@/components/map/LocationDetail';
import { Place } from '@/types/map/place';

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
  const [showLocationDetail, setShowLocationDetail] = useState(false);

  const handleFilterChange = (isActive: boolean) => {
    // 필터 상태 변경 시 처리할 로직
    console.log('Filter state:', isActive);
  };

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
    setShowLocationDetail(true);
  };

  const handleCloseDetail = () => {
    setShowLocationDetail(false);
  };

  return (
    <PageContainer>
      <LeftContainer onPlaceSelect={handlePlaceSelect} />
      <MapWrapper>
        <MapContainer
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
        {showLocationDetail && selectedPlace && (
          <LocationDetail location={selectedPlace} onClose={handleCloseDetail} />
        )}
      </MapWrapper>
    </PageContainer>
  );
};

export default MapPage;