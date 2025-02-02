// api/review/top.ts
//import { AxiosError } from 'axios';

import instance from '@/api/axios';
import { TopReviewsResponse } from '../../types/review/top';

export const getTop7Reviews = async (): Promise<TopReviewsResponse> => {
  try {
    const response = await instance.get<TopReviewsResponse>('/reviews/top7');
    return response.data;
  } catch (err) {
    console.error('Failed to fetch top 7 reviews:', err);
    throw err;
  }
};

//API 연결 잘 된건지 console 확인용
// export const getTop7Reviews = async (): Promise<TopReviewsResponse> => {
//   console.log('Starting API call to fetch top 7 reviews...');
//   try {
//     const response = await instance.get<TopReviewsResponse>('/reviews/top7');
//     console.log('Full API response:', response); // 전체 response 객체 확인
//     console.log('Response data:', response.data); // data만 자세히 확인
//     return response.data;
//   } catch (err: unknown) {
//     if (err instanceof AxiosError) {
//       console.error('Failed to fetch top 7 reviews:', err);
//       console.error('Error details:', {
//         status: err.response?.status,
//         data: err.response?.data,
//         message: err.message,
//       });
//     } else {
//       console.error('An unexpected error occurred:', err);
//     }
//     throw err;
//   }
// };
