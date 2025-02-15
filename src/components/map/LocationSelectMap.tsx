import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface LocationSelectMapProps {
  apiKey: string;
  onLocationSelect: (location: LocationInfo) => void;
}

interface LocationInfo {
  latitude: number;
  longitude: number;
  placeName?: string;
  address?: string;
}

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 400px;
  position: relative;
`;

const SearchContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  z-index: 10000;
`;

const mapStyles = `
  .pac-container {
    z-index: 10002 !important;
    margin-top: 4px;
    border-radius: 8px;
    border: 1px solid #eee;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    font-family: inherit;
  }

  .pac-container:after {
    display: none;  // Google 로고 제거
  }

  .pac-item {
    padding: 8px 16px;
    cursor: pointer;
  }

  .pac-item:hover {
    background-color: #f8f9fa;
  }

  .pac-item-query {
    font-size: 14px;
    color: #333;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  color: #333;
  font-size: 14px;
  outline: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  background: white;

  &:focus {
    box-shadow: 0 0 0 2px #4c6ef5;
  }
`;

const LocationSelectMap: React.FC<LocationSelectMapProps> = ({ apiKey, onLocationSelect }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LocationInfo | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = mapStyles;
    document.head.appendChild(styleSheet);

    // 스크립트가 이미 로드되어 있는지 확인
    if (window.google?.maps) {
      setIsScriptLoaded(true);
      initializeMap();
      return;
    }

    // 스크립트 로드
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setIsScriptLoaded(true);
      initializeMap();
    };
    document.head.appendChild(script);

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
    };
  }, [apiKey]);

  const initializeMap = () => {
    if (!mapRef.current || !window.google?.maps) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 37.5665, lng: 126.978 },
      zoom: 14,
      disableDefaultUI: false,
      mapTypeControl: false,
      zoomControl: true,
      streetViewControl: false,
      fullscreenControl: false, // 전체화면 버튼 제거
    });
    googleMapRef.current = map;

    const input = document.getElementById('map-search-input') as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input, {
      fields: ['formatted_address', 'geometry', 'name'],
    });

    // Autocomplete 결과 처리
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        console.log('선택된 장소에 대한 정보가 없습니다.');
        return;
      }

      // 지도 이동 및 줌 설정
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      const newLocation = {
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
        placeName: place.name,
        address: place.formatted_address,
      };

      updateMarker(newLocation);
      onLocationSelect(newLocation);
    });

    // 지도 클릭 이벤트
    map.addListener('click', (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return;

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        { location: e.latLng },
        (results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) => {
          if (status === 'OK' && results?.[0]) {
            const newLocation = {
              latitude: e.latLng!.lat(),
              longitude: e.latLng!.lng(),
              placeName: results[0].formatted_address,
              address: results[0].formatted_address,
            };
            updateMarker(newLocation);
            onLocationSelect(newLocation);
          }
        },
      );
    });
  };

  const updateMarker = (location: LocationInfo) => {
    if (!googleMapRef.current) return;

    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    const marker = new google.maps.Marker({
      position: { lat: location.latitude, lng: location.longitude },
      map: googleMapRef.current,
      animation: google.maps.Animation.DROP,
    });
    markerRef.current = marker;
    setSelectedLocation(location);
  };

  return (
    <MapContainer>
      <SearchContainer>
        <SearchInput
          id="map-search-input"
          type="text"
          placeholder="장소 검색..."
          autoComplete="off"
        />
      </SearchContainer>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      {/* <StyledLocationInfo $isVisible={!!selectedLocation}>
        {selectedLocation && (
          <>
            <LocationName>{selectedLocation.placeName}</LocationName>
            <LocationAddress>{selectedLocation.address}</LocationAddress>
          </>
        )}
      </StyledLocationInfo> */}
    </MapContainer>
  );
};

export default LocationSelectMap;
