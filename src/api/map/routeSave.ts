import instance from '@/api/axios';
import { CustomRouteRequest, SaveRouteResponse } from '@/types/map/route';

export const saveCustomRoute = async (
  routeData: CustomRouteRequest,
): Promise<SaveRouteResponse> => {
  try {
    // 요청 데이터 로깅
    console.log('=== 루트 저장 요청 데이터 ===');
    console.log('Route ID:', routeData);

    const response = await instance.post<{
      isSuccess: boolean;
      code: string;
      message: string;
      result: SaveRouteResponse;
    }>('/route-likes/custom', routeData);

    // 응답 데이터 로깅
    console.log('=== 루트 저장 응답 데이터 ===');
    console.log('Success:', response.data.isSuccess);
    console.log('Code:', response.data.code);
    console.log('Message:', response.data.message);
    console.log('Result:', response.data.result);

    if (!response.data.isSuccess) {
      throw new Error(response.data.message);
    }

    return response.data.result;
  } catch (error: any) {
    console.error('=== 루트 저장 실패 ===');
    console.error('Error:', error);
    console.error('Response:', error.response?.data);

    if (error.response?.status === 401) {
      throw error;
    }

    throw new Error(error.response?.data?.message || '루트 저장에 실패했습니다.');
  }
};
