import instance from '@/api/axios';
import { AxiosError } from 'axios';

interface PlaceAnimation {
  placeAnimationId: number;
  animationId: number;
  animationName: string;
}

interface AnimationListDTO {
  placeAnimations: PlaceAnimation[];
  listSize: number;
}

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
    animationListDTO: AnimationListDTO;
    hashtags: string[];
  };
}

// API 에러 응답 타입 정의
interface ApiErrorResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: null;
}

export const getRouteDetail = async (routeId: number, placeId: number) => {
  try {
    const response = await instance.get<RouteDetailResponse>(`/route/${routeId}/${placeId}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;

    if (axiosError.response?.data) {
      throw new Error(axiosError.response.data.message);
    }

    throw new Error('장소 상세 정보를 불러오는데 실패했습니다.');
  }
};
