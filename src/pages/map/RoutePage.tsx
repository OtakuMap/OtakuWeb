import React, { useState, useMemo, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import RouteLeftContainer from '../../components/map/RouteLeftContainer';
import MapContainer from '../../components/map/MapContainer';
import LocationDetail from '@/components/map/LocationDetail';
import { RouteLocation } from '@/types/map/route';
import { PlaceDetails } from '../../utils/mapUtils';
import { RouteSource } from '@/types/map/routeSource';

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

// 임시 위치 데이터
const sampleLocations: RouteLocation[] = [
  {
    id: 1,
    name: '건담 베이스 오다이바',
    isSelected: false,
    latitude: 35.6245,
    longitude: 139.7755,
    animeName: '기동전사 건담',
    hashtags: ['건담', '오다이바', '다이버시티도쿄'],
  },
  {
    id: 2,
    name: '아키하바라 라디오 회관',
    isSelected: false,
    latitude: 35.6985,
    longitude: 139.7715,
    animeName: '스테인즈 게이트',
    hashtags: ['아키하바라', '오타쿠', '전자상가'],
  },
  {
    id: 3,
    name: '지브리 미술관',
    isSelected: false,
    latitude: 35.6962,
    longitude: 139.5704,
    animeName: '지브리 작품들',
    hashtags: ['지브리', '미야자키하야오', '토토로'],
  },
  {
    id: 4,
    name: '나카노 브로드웨이',
    isSelected: false,
    latitude: 35.708,
    longitude: 139.665,
    animeName: '여러 작품',
    hashtags: ['중고피규어', '레트로게임', '만화'],
  },
  {
    id: 5,
    name: '포케몬 센터 메가 도쿄',
    isSelected: false,
    latitude: 35.729,
    longitude: 139.7177,
    animeName: '포케몬',
    hashtags: ['포케몬', '이케부쿠로', '선샤인시티'],
  },
  {
    id: 6,
    name: '애니메이트 이케부쿠로 본점',
    isSelected: false,
    latitude: 35.7294,
    longitude: 139.7137,
    animeName: '여러 작품',
    hashtags: ['애니메이트', '이케부쿠로', '굿즈'],
  },
  {
    id: 7,
    name: '니코니코 본사',
    isSelected: false,
    latitude: 35.7016,
    longitude: 139.7741,
    animeName: '여러 작품',
    hashtags: ['니코니코', '아키하바라', '동영상'],
  },
];

interface RouteState {
  routeSource: RouteSource;
  initialLocations?: RouteLocation[]; // 후기에서 넘어올 때 사용
}

const RoutePage = () => {
  const { routeId } = useParams<{ routeId: string }>();
  const location = useLocation();
  const state = location.state as RouteState;

  const routeSource = state?.routeSource || RouteSource.SAVED_ROUTE;
  const initialLocations = state?.initialLocations || sampleLocations;

  // routeId가 URL에 있으면 그것을 사용하고, 없으면 state에서 가져옴
  const currentRouteId = routeId ? parseInt(routeId) : undefined;

  const mapInstance = useRef<google.maps.Map | null>(null);
  const [locations, setLocations] = useState<RouteLocation[]>(
    state?.initialLocations || sampleLocations,
  );
  const [selectedLocation, setSelectedLocation] = useState<RouteLocation | null>(null);
  const [selectedPlaceDetails, setSelectedPlaceDetails] = useState<PlaceDetails | undefined>(
    undefined,
  );

  const handleMarkerClick = (location: RouteLocation, placeDetails?: PlaceDetails) => {
    console.log('Location selected:', location);
    console.log('Place details:', placeDetails);
    setSelectedLocation(location);
    setSelectedPlaceDetails(placeDetails);
  };

  const handleCloseDetail = () => {
    setSelectedLocation(null);
    setSelectedPlaceDetails(undefined);
    // mapSettings의 zoom level로 되돌리기
    if (window.google?.maps && mapInstance.current) {
      mapInstance.current.setZoom(mapSettings.zoom);
      mapInstance.current.panTo(mapSettings.center);
    }
  };

  const handleLocationsChange = (newLocations: RouteLocation[]) => {
    setLocations(newLocations);
  };

  // 중심점과 줌 레벨 계산
  const mapSettings = useMemo(() => {
    if (locations.length === 0) {
      return {
        center: { lat: 35.6995, lng: 139.7711 }, // 기본값
        zoom: 12,
      };
    }

    // 모든 위치의 최소/최대 위도/경도 찾기
    const bounds = locations.reduce(
      (acc, location) => {
        return {
          minLat: Math.min(acc.minLat, location.latitude),
          maxLat: Math.max(acc.maxLat, location.latitude),
          minLng: Math.min(acc.minLng, location.longitude),
          maxLng: Math.max(acc.maxLng, location.longitude),
        };
      },
      {
        minLat: locations[0].latitude,
        maxLat: locations[0].latitude,
        minLng: locations[0].longitude,
        maxLng: locations[0].longitude,
      },
    );

    // 중심점 계산
    const center = {
      lat: (bounds.minLat + bounds.maxLat) / 2,
      lng: (bounds.minLng + bounds.maxLng) / 2,
    };

    // 적절한 줌 레벨 계산
    const latDiff = bounds.maxLat - bounds.minLat;
    const lngDiff = bounds.maxLng - bounds.minLng;
    const maxDiff = Math.max(latDiff, lngDiff);

    let zoom = 13;
    if (maxDiff > 0.2) zoom = 12;
    if (maxDiff > 0.5) zoom = 11;
    if (maxDiff > 1) zoom = 10;

    const padding = 0.02;
    center.lat += padding;

    return { center, zoom };
  }, [locations]);

  return (
    <PageContainer>
      <RouteLeftContainer
        initialLocations={initialLocations}
        onLocationsChange={handleLocationsChange}
        routeSource={routeSource}
        routeId={currentRouteId}
      />
      <MapWrapper>
        <MapContainer
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          center={mapSettings.center}
          zoom={mapSettings.zoom}
          locations={locations}
          selectedLocation={selectedLocation}
          onMarkerClick={handleMarkerClick}
          ref={mapInstance}
        />
        {selectedLocation && (
          <LocationDetail
            location={selectedLocation}
            placeDetails={selectedPlaceDetails}
            onClose={handleCloseDetail}
          />
        )}
      </MapWrapper>
    </PageContainer>
  );
};

export default RoutePage;
