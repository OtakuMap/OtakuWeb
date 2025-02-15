import React from 'react';
import RoutePage from '@/pages/map/RoutePage';
import { useLocation, useNavigate } from 'react-router-dom';
import { RouteSource } from '@/types/map/routeSource';
import { saveCustomRoute } from '@/api/map/routeSave';
import { updateRoute } from '@/api/map/routeUpdate';
import { toast } from 'react-toastify';

interface RouteState {
  routeSource: RouteSource;
  routeId?: number;
}

export const RoutePageContainer: React.FC = () => {
  const location = useLocation();
  const state = location.state as RouteState;
  const routeSource = state?.routeSource || RouteSource.SAVED_ROUTE;
  const routeId = state?.routeId;

  const handleSaveRoute = async (routeData: any) => {
    try {
      if (routeSource === RouteSource.REVIEW) {
        // 후기에서 온 경우 - POST 요청
        const response = await saveCustomRoute({
          name: routeData.title,
          routeItems: routeData.locations.map((loc: any, index: number) => ({
            placeId: loc.id,
            itemOrder: index,
          })),
        });
        toast.success('새로운 루트가 저장되었습니다!');
        return response;
      } else {
        // 저장된 루트나 좋아요한 루트에서 온 경우 - PATCH 요청
        if (!routeId) {
          throw new Error('루트 ID가 없습니다.');
        }
        const response = await updateRoute({
          name: routeData.title,
          routeId: routeId,
          routeItems: routeData.locations.map((loc: any, index: number) => ({
            placeId: loc.id,
            itemOrder: index,
          })),
        });
        toast.success('루트가 수정되었습니다!');
        return response;
      }
    } catch (error: any) {
      toast.error(error.message || '루트 저장에 실패했습니다.');
      throw error;
    }
  };

  return <RoutePage onSaveRoute={handleSaveRoute} routeSource={routeSource} />;
};
