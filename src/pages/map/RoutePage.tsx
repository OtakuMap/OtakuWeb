import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import RouteLeftContainer from '../../components/map/RouteLeftContainer';
import MapContainer from '../../components/map/MapContainer';
import LocationDetail from '@/components/map/LocationDetail';
import { RouteLocation } from '@/types/map/route';

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

// 임시 위치 데이터
const sampleLocations: RouteLocation[] = [
  {
    id: 1,
    name: '건담 베이스 오다이바',
    isSelected: false,
    latitude: 35.6245,
    longitude: 139.7755,
    animeName: '기동전사 건담',
    address: '도쿄도 미나토구 오다이바 1-7-1 다이버시티 도쿄 플라자 7F',
    hashtags: ['건담', '오다이바', '다이버시티도쿄'],
  },
  {
    id: 2,
    name: '아키하바라 라디오 회관',
    isSelected: false,
    latitude: 35.6985,
    longitude: 139.7715,
    animeName: '스테인즈 게이트',
    address: '도쿄도 치요다구 소토칸다 1-15-16',
    hashtags: ['아키하바라', '오타쿠', '전자상가'],
  },
  {
    id: 3,
    name: '지브리 미술관',
    isSelected: false,
    latitude: 35.6962,
    longitude: 139.5704,
    animeName: '지브리 작품들',
    address: '도쿄도 미타카시 시모렌자쿠 1-1-83',
    hashtags: ['지브리', '미야자키하야오', '토토로'],
  },
  {
    id: 4,
    name: '나카노 브로드웨이',
    isSelected: false,
    latitude: 35.708,
    longitude: 139.665,
    animeName: '여러 작품',
    address: '도쿄도 나카노구 나카노 5-52-15',
    hashtags: ['중고피규어', '레트로게임', '만화'],
  },
  {
    id: 5,
    name: '포케몬 센터 메가 도쿄',
    isSelected: false,
    latitude: 35.729,
    longitude: 139.7177,
    animeName: '포케몬',
    address: '도쿄도 도시마구 히가시이케부쿠로 3-1-2 선샤인시티 알파도메 3F',
    hashtags: ['포케몬', '이케부쿠로', '선샤인시티'],
  },
];

const RoutePage = () => {
  const [locations, setLocations] = useState<RouteLocation[]>(sampleLocations);
  const [selectedLocation, setSelectedLocation] = useState<RouteLocation | null>(null);

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

    // 거리에 따른 줌 레벨 조정
    let zoom = 12; // 기본값
    if (maxDiff > 0.2) zoom = 11;
    if (maxDiff > 0.5) zoom = 10;
    if (maxDiff > 1) zoom = 9;

    // 마진을 조금 주기 위해 약간의 패딩 효과
    const padding = 0.02; // 약간의 여백
    center.lat += padding;

    return { center, zoom };
  }, [locations]);

  const handleMarkerClick = (location: RouteLocation) => {
    setSelectedLocation(location);
  };

  const handleCloseDetail = () => {
    setSelectedLocation(null);
  };

  const handleLocationsChange = (newLocations: RouteLocation[]) => {
    setLocations(newLocations);
  };

  return (
    <PageContainer>
      <RouteLeftContainer initialLocations={locations} onLocationsChange={handleLocationsChange} />
      <MapWrapper>
        <MapContainer
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          center={mapSettings.center}
          zoom={mapSettings.zoom}
          locations={locations}
          onMarkerClick={handleMarkerClick}
        />
        {selectedLocation && (
          <LocationDetail location={selectedLocation} onClose={handleCloseDetail} />
        )}
      </MapWrapper>
    </PageContainer>
  );
};

export default RoutePage;