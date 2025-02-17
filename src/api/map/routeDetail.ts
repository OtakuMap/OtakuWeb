import instance from '@/api/axios';
import { AxiosError } from 'axios';

export interface RouteDetailResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    isFavorite: boolean;
    isLiked: boolean;
    animationName: string;
    hashtags: {
      hashTagId: number;
      name: string;
    }[];
  };
}

// API 에러 응답 타입 정의
interface ApiErrorResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: null;
}

export const getRouteDetail = async (routeId: number, placeId: number, animationId: number) => {
  try {
    const url = `/routes/${routeId}/places/${placeId}`;
    console.log('=== Route Detail API Request ===');
    console.log('URL:', url);
    console.log('Query Parameters:', { animationId });

    const response = await instance.get<RouteDetailResponse>(url, {
      params: { animationId },
    });

    console.log('=== Route Detail API Response ===');
    console.log('Status:', response.status);
    console.log('Headers:', response.headers);
    console.log('Data:', response.data);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('=== Route Detail API Error ===');
      console.error('Error Status:', error.response?.status);
      console.error('Error Data:', error.response?.data);
      console.error('Error Config:', {
        url: error.config?.url,
        method: error.config?.method,
        params: error.config?.params,
        headers: error.config?.headers,
      });

      if (error.response?.data) {
        throw new Error(error.response.data.message);
      }
    }
    throw new Error('장소 상세 정보를 불러오는데 실패했습니다.');
  }
};
