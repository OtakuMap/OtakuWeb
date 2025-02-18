import { AxiosResponse, AxiosError } from 'axios';
import publicInstance from '../publicInstance';

export interface BannerResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    id: number;
    uuid: string;
    fileName: string;
    fileUrl: string;
  };
}

export const getBanner = async (): Promise<BannerResponse> => {
  try {
    const response: AxiosResponse<BannerResponse> = await publicInstance.get('/events/banner');
    // 응답 전체를 자세히 로깅
    console.log('Banner API Success:', {
      status: response.status,
      headers: response.headers,
      data: response.data,
      imageUrl: response.data?.result?.fileUrl,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Banner API Error Details:', {
        message: error.message,
        config: error.config,
        status: error.response?.status,
        responseData: error.response?.data,
      });
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};
