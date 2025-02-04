import { AxiosResponse } from 'axios';
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
    console.log('Banner API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Banner API Error:', error);
    throw error;
  }
};
