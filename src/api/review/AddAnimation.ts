// api/review/AddAnimation.ts
import instance from '@/api/axios';
import {
  ApiResponse,
  AddAnimationRequest,
  AddAnimationResponse,
  SearchAnimationsResponse,
} from '@/types/review/AddAnimation';

// 애니메이션 검색 API
export const searchAnimations = async (
  keyword: string,
): Promise<ApiResponse<SearchAnimationsResponse>> => {
  try {
    const response = await instance.get<ApiResponse<SearchAnimationsResponse>>(
      '/animations/search',
      {
        params: { keyword },
      },
    );
    return response.data;
  } catch (error) {
    console.error('애니메이션 검색 실패:', error);
    throw error;
  }
};

// 애니메이션 등록 API
export const addAnimation = async (
  request: AddAnimationRequest,
): Promise<ApiResponse<AddAnimationResponse>> => {
  try {
    const response = await instance.post<ApiResponse<AddAnimationResponse>>('/animations', request);
    return response.data;
  } catch (error) {
    console.error('애니메이션 등록 실패:', error);
    throw error;
  }
};
