import instance from '@/api/axios';
import { UpdateRouteRequest, RouteResponse } from '@/types/map/route';

export const updateRoute = async (request: UpdateRouteRequest): Promise<RouteResponse> => {
  try {
    console.log('=== 루트 수정 요청 데이터 ===');
    console.log('Route:', request);
    console.log('Route ID:', request.routeId);
    console.log('Name:', request.name);
    console.log('Route Items:', request.routeItems);

    const response = await instance.patch<RouteResponse>('/route-likes', request);

    // 응답 데이터 로깅
    console.log('=== 루트 수정 응답 데이터 ===');
    console.log('Success:', response.data.isSuccess);
    console.log('Code:', response.data.code);
    console.log('Message:', response.data.message);
    console.log('Result:', response.data.result);

    if (!response.data.isSuccess) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error: any) {
    console.error('=== 루트 수정 실패 ===');
    console.error('Error:', error);
    console.error('Response:', error.response?.data);

    if (error.response?.status === 401) {
      throw error;
    }

    throw new Error(error.response?.data?.message || '루트 수정에 실패했습니다.');
  }
};
