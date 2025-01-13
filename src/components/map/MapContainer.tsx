import React, { useEffect, useRef, useCallback } from 'react';
import * as S from '../../styles/map/MapContainer.styles';

interface MapContainerProps {
  apiKey: string;
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  mapId?: string;
  markerTitle?: string;
}

declare global {
  interface Window {
    google: {
      maps: {
        Map: {
          new (
            container: HTMLElement,
            options: {
              center: { lat: number; lng: number };
              zoom: number;
              mapId: string;
            },
          ): google.maps.Map;
        };
        marker: {
          AdvancedMarkerElement: {
            new (options: {
              map: google.maps.Map;
              position: { lat: number; lng: number };
              title: string;
            }): google.maps.marker.AdvancedMarkerElement;
          };
        };
      };
    };
  }
}

const GOOGLE_MAPS_LOADING_STATE = {
  loading: false,
  loaded: false,
  error: false,
  promise: null as Promise<void> | null,
};

const loadGoogleMapsApi = (apiKey: string): Promise<void> => {
  if (GOOGLE_MAPS_LOADING_STATE.loaded) {
    return Promise.resolve();
  }

  if (GOOGLE_MAPS_LOADING_STATE.loading && GOOGLE_MAPS_LOADING_STATE.promise) {
    return GOOGLE_MAPS_LOADING_STATE.promise;
  }

  GOOGLE_MAPS_LOADING_STATE.loading = true;

  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker&v=beta`;
  script.async = true; // async 설정

  GOOGLE_MAPS_LOADING_STATE.promise = new Promise((resolve, reject) => {
    script.addEventListener('load', () => {
      GOOGLE_MAPS_LOADING_STATE.loaded = true;
      GOOGLE_MAPS_LOADING_STATE.loading = false;
      resolve();
    });

    script.addEventListener('error', (error) => {
      GOOGLE_MAPS_LOADING_STATE.error = true;
      GOOGLE_MAPS_LOADING_STATE.loading = false;
      reject(error);
    });
  });

  document.head.appendChild(script);
  return GOOGLE_MAPS_LOADING_STATE.promise;
};

const MapContainer: React.FC<MapContainerProps> = ({
  apiKey,
  center,
  zoom = 16,
  mapId = 'DEMO_MAP_ID',
  // markerTitle = 'My location',
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);

  const initializeMap = useCallback(async () => {
    const mapContainer = mapContainerRef.current;
    if (!mapContainer || !window.google?.maps) return;

    try {
      if (!mapInstance.current) {
        mapInstance.current = new window.google.maps.Map(mapContainer, {
          center,
          zoom,
          mapId,
        });

        // const { AdvancedMarkerElement } = window.google.maps.marker;
        // if (AdvancedMarkerElement) {
        //   new AdvancedMarkerElement({
        //     map: mapInstance.current,
        //     position: center,
        //     title: markerTitle,
        //   });
        // }
      } else {
        mapInstance.current.setCenter(center);
        mapInstance.current.setZoom(zoom);
      }
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, [center, zoom, mapId]);

  useEffect(() => {
    const setupMap = async () => {
      try {
        await loadGoogleMapsApi(apiKey);
        await initializeMap();
      } catch (error) {
        console.error('Error setting up Google Maps:', error);
      }
    };

    setupMap();

    return () => {
      if (mapInstance.current) {
        mapInstance.current = null;
      }
    };
  }, [apiKey, initializeMap]);

  return <S.MapDiv ref={mapContainerRef} />;
};

export default MapContainer;
