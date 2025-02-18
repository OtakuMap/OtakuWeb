import instance from '../axios';
import { DeleteRoutesResponse } from '../../types/like/delete-route';
import { tokenStorage } from '../../utils/token';

export const deleteRoutes = async (routeIds: number[]): Promise<DeleteRoutesResponse> => {
  const token = tokenStorage.getAccessToken();
  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }

  try {
    const { data } = await instance.delete<DeleteRoutesResponse>('/route-likes', {
      params: {
        routeIds: routeIds.join(','), // 배열을 쉼표로 구분된 문자열로 변환
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    if (error.response?.status === 401) {
      tokenStorage.clearTokens();
      window.location.href = '/login';
    }
    throw error;
  }
};
