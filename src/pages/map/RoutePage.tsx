import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import RouteLeftContainer from '../../components/map/RouteLeftContainer';
import MapContainer from '../../components/map/MapContainer';
import LocationDetail from '@/components/map/LocationDetail';
import { RouteLocation } from '@/types/map/route';
import { PlaceDetails } from '../../utils/mapUtils';
import { RouteSource } from '@/types/map/routeSource';
import { useRoute } from '@/hooks/map/useRoute';
import { useRouteDetail } from '@/hooks/map/useRouteDetail';

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

interface RouteState {
  routeSource: RouteSource;
  initialLocations?: RouteLocation[];
}

const RoutePage = () => {
  const { routeId } = useParams<{ routeId: string }>();
  const location = useLocation();
  const state = location.state as RouteState;
  const routeSource = state?.routeSource || RouteSource.SAVED_ROUTE;

  const mapInstance = useRef<google.maps.Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<RouteLocation | null>(null);
  const [selectedPlaceDetails, setSelectedPlaceDetails] = useState<PlaceDetails | undefined>(
    undefined,
  );

  // placeDetails 로딩 상태
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const {
    locations,
    setLocations,
    routeInfo,
    isLoading: isRoutesLoading,
  } = useRoute({
    routeId,
    initialLocations: state?.initialLocations,
  });

  // const { routeDetail, isLoading: isDetailLoading, fetchRouteDetail } = useRouteDetail();
  const { routeDetail, fetchRouteDetail } = useRouteDetail();

  const handleMarkerClick = async (location: RouteLocation, placeDetails?: PlaceDetails) => {
    // 로딩 시작
    setIsLoadingDetails(true);
    setSelectedLocation(location);

    if (placeDetails) {
      setSelectedPlaceDetails(placeDetails);
      // placeDetails가 있으면 바로 로딩 완료
      setIsLoadingDetails(false);
    }

    if (routeId && routeInfo.animationId) {
      try {
        await fetchRouteDetail(parseInt(routeId), location.id, routeInfo.animationId);
      } catch (error) {
        console.error('Failed to fetch route detail:', error);
      }
    }

    // 모든 데이터 로딩 완료
    setIsLoadingDetails(false);
  };

  const handleCloseDetail = () => {
    setSelectedLocation(null);
    setSelectedPlaceDetails(undefined);
    setIsLoadingDetails(false); // 닫을 때 로딩 상태도 리셋
    if (mapInstance.current) {
      mapInstance.current.setZoom(mapSettings.zoom);
      mapInstance.current.panTo(mapSettings.center);
    }
  };

  // const handleCloseDetail = () => {
  //   setSelectedLocation(null);
  //   setSelectedPlaceDetails(undefined);
  //   if (mapInstance.current) {
  //     mapInstance.current.setZoom(mapSettings.zoom);
  //     mapInstance.current.panTo(mapSettings.center);
  //   }
  // };

  const mapSettings = useMemo(() => {
    if (locations.length === 0) {
      return {
        center: { lat: 35.6995, lng: 139.7711 }, // Default to Tokyo
        zoom: 12,
      };
    }

    const bounds = locations.reduce(
      (acc, location) => ({
        minLat: Math.min(acc.minLat, location.latitude),
        maxLat: Math.max(acc.maxLat, location.latitude),
        minLng: Math.min(acc.minLng, location.longitude),
        maxLng: Math.max(acc.maxLng, location.longitude),
      }),
      {
        minLat: locations[0].latitude,
        maxLat: locations[0].latitude,
        minLng: locations[0].longitude,
        maxLng: locations[0].longitude,
      },
    );

    const center = {
      lat: (bounds.minLat + bounds.maxLat) / 2,
      lng: (bounds.minLng + bounds.maxLng) / 2,
    };

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

  if (isRoutesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer>
      <RouteLeftContainer
        initialLocations={locations}
        onLocationsChange={setLocations}
        routeSource={routeSource}
        routeId={routeId ? parseInt(routeId) : undefined}
        routeInfo={routeInfo}
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
          isRoute={true}
        />
        {selectedLocation && (
          <LocationDetail
            location={selectedLocation}
            placeDetails={selectedPlaceDetails}
            onClose={handleCloseDetail}
            routeDetail={routeDetail}
            isLoading={isLoadingDetails}
            // isLoading={isLoadingDetails || isDetailLoading} // 두 로딩 상태 combined
            routeAnimationId={routeInfo.animationId}
          />
        )}
      </MapWrapper>
    </PageContainer>
  );
};

export default RoutePage;
