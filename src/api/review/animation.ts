// api/review/animation.ts
import { PlaceAnimationsResponse, AnimationResult } from '@/types/review/animation';
import instance from '@/api/axios';
import { tokenStorage } from '@/utils/token';

export const fetchPlaceAnimations = async (placeId: string | number): Promise<AnimationResult> => {
  try {
    console.log('Requesting animations for placeId:', placeId);
    console.log('Full URL:', `/places/${placeId}/animations`);

    const currentToken = tokenStorage.getAccessToken();

    const response = await instance.get<PlaceAnimationsResponse>(`/places/${placeId}/animations`, {
      // 쿼리 파라미터 제거
      params: {
        // 필요한 경우 추가 파라미터
        placeId: placeId,
      },
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    });

    if (response.data.isSuccess) {
      return {
        isSuccess: true,
        result: {
          placeAnimations: response.data.result.placeAnimations,
          listSize: response.data.result.listSize,
        },
      };
    }

    return {
      isSuccess: false,
      message: response.data.message || '애니메이션을 불러오는 데 실패했습니다.',
    };
  } catch (error) {
    console.error('Fetch place animations error:', error);
    return {
      isSuccess: false,
      message: '애니메이션을 불러오는 데 실패했습니다.',
    };
  }
};
