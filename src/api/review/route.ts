// api/review/route.ts
import { AxiosError } from 'axios';
import instance from '@/api/axios';
import { RouteApiResponse, RouteData } from '@/types/review/route';

export const saveRoute = async (
  reviewId: number,
  routeData: RouteData[],
): Promise<RouteApiResponse> => {
  try {
    // 페이로드 구조 로깅 강화
    const payload = routeData; // 백엔드가 원하는 정확한 형식 확인 필요

    console.log('Request Payload:', JSON.stringify(payload));
    console.log('Review ID:', reviewId);

    const response = await instance.post<RouteApiResponse>(`/route-likes/${reviewId}`, payload, {
      // 추가 헤더 및 설정
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      console.error('Full Axios Error:', {
        response: err.response?.data,
        status: err.response?.status,
        headers: err.response?.headers,
        requestData: err.config?.data,
      });
    }
    throw err;
  }
};
