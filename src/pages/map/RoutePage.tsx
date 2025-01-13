import styled from 'styled-components';
import RouteLeftContainer from '../../components/map/RouteLeftContainer';
import MapContainer from '../../components/map/MapContainer';

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

const RoutePage = () => {
  return (
    <PageContainer>
      <RouteLeftContainer />
      <MapWrapper>
        <MapContainer
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          center={{
            lat: 34.72145462036133,
            lng: 135.3616485595703,
          }}
        />
      </MapWrapper>
    </PageContainer>
  );
};

export default RoutePage;
