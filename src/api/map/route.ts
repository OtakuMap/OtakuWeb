import instance from '@/api/axios';
import { AxiosError } from 'axios';
import { tokenStorage } from '@/utils/token';

interface RouteApiResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    routeId: number;
    routeName: string;
    animationId: number;
    animationName: string;
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
    const token = tokenStorage.getAccessToken();
    if (!token) {
      throw new Error('인증이 필요합니다.');
    }

    console.log('Requesting route with token:', token);

    const response = await instance.get<RouteApiResponse>(`/routes/${routeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(response);

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;

    console.error('Route fetch error:', {
      status: axiosError.response?.status,
      data: axiosError.response?.data,
      headers: axiosError.response?.config?.headers,
    });

    if (axiosError.response?.status === 401) {
      throw new Error('인증이 필요합니다.');
    }

    throw new Error(axiosError.response?.data?.message || '루트 정보를 불러오는데 실패했습니다.');
  }
};
