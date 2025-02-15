import { PlaceAnimationsResponse } from '@/types/review/animation';
import instance from '@/api/axios';

export const fetchPlaceAnimations = async (placeId: string | number) => {
  try {
    const response = await instance.get<PlaceAnimationsResponse>(`/places/${placeId}/animations`);
    return {
      isSuccess: true,
      result: {
        placeAnimations: response.data.results,
        listSize: response.data.results.length,
      },
    };
  } catch (error) {
    console.error('Failed to fetch place animations:', error);
    return {
      isSuccess: false,
      message: '애니메이션을 불러오는 데 실패했습니다.',
    };
  }
};
