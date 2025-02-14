import instance from '@/api/axios';
import { AxiosError } from 'axios';

interface RouteApiResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    routeId: number;
    places: {
      id: number;
      name: string;
      latitude: number;
      longitude: number;
    }[];
  };
}

// API 에러 응답 타입 정의
interface ApiErrorResponse {
  isSuccess: boolean;
  code: string;
  message: string;
}

export const getRouteById = async (routeId: number) => {
  try {
    const response = await instance.get<RouteApiResponse>(`/route/${routeId}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(axiosError.response?.data?.message || '루트 정보를 불러오는데 실패했습니다.');
  }
};
