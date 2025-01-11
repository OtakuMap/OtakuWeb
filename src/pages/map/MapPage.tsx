import styled from 'styled-components';
import LeftContainer from '../../components/map/LeftContainter';
import MapContainer from '../../components/map/MapContainer';
import FilterButton from '@/components/map/FilterButton';

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
  const handleFilterChange = (isActive: boolean) => {
    // 필터 상태 변경 시 처리할 로직
    console.log('Filter state:', isActive);
  };

  return (
    <PageContainer>
      <LeftContainer />
      <MapWrapper>
        <MapContainer
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          center={{
            lat: 34.72145462036133,
            lng: 135.3616485595703,
          }}
          zoom={17}
        />
        <FilterButton onFilterChange={handleFilterChange} />
      </MapWrapper>
    </PageContainer>
  );
};

export default MapPage;
