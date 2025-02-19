import axios, { AxiosError } from 'axios';
import {
  ReviewpurchaseRequest,
  ReviewpurchaseResponse,
  PointbalanceResponse,
  PointchargeRequest,
  PointchargeResponse,
  PointverifyRequest,
  PointverifyResponse,
  TransactionsChargeResponse,
  TransactionsUsagesResponse,
  TransactionsEarningsResponse,
} from '../../types/point/point';
import { tokenStorage } from '@/utils/token';

const instance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 인증 정보(쿠키 등)를 포함
});

// 요청 인터셉터 추가
instance.interceptors.request.use(
  (config) => {
    const token = tokenStorage.getAccessToken();
    console.log('🔹 현재 accessToken:', token); // ✅ 로그 추가
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Request Config:', {
      url: config.url,
      headers: config.headers,
      method: config.method,
    });
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response Error:', error.response);
    return Promise.reject(error);
  },
);

// 공통 에러 처리 함수 (제네릭 사용)
const handleError = <T>(error: unknown): T => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<T>;
    console.log('Error Response:', axiosError.response?.data);

    return {
      ...(axiosError.response?.data || {}),
      isSuccess: false,
      code: axiosError.response?.data?.code || 'UNKNOWN_ERROR',
      message: axiosError.response?.data?.message || '알 수 없는 오류가 발생했습니다.',
    } as T;
  }

  return {
    isSuccess: false,
    code: 'UNKNOWN_ERROR',
    message: '알 수 없는 오류가 발생했습니다.',
  } as T;
};

export const pointAPI = {
  // 후기 구매
  purchase: async (credentials: ReviewpurchaseRequest): Promise<ReviewpurchaseResponse> => {
    try {
      console.log('review purchase Request:', {
        url: '/reviews/purchase',
        data: credentials,
        headers: instance.defaults.headers,
      });
      const response = await instance.post<ReviewpurchaseResponse>(
        '/reviews/purchase',
        credentials,
      );
      console.log('Raw Response:', response);
      return response.data;
    } catch (error: unknown) {
      console.error('Error review purchase:', error);
      return handleError<ReviewpurchaseResponse>(error);
    }
  },

  // 포인트 잔액 조회
  balance: async (): Promise<PointbalanceResponse> => {
    try {
      console.log('Request URL:', '/points/balance');

      const response = await instance.get<PointbalanceResponse>('/points/balance');
      console.log('Response:', response);
      return response.data;
    } catch (error: unknown) {
      console.error('Error during point balance:', error);
      return handleError<PointbalanceResponse>(error);
    }
  },

  // 결제 검증

  verify: async (credentials: PointverifyRequest): Promise<PointverifyResponse> => {
    try {
      console.log('point verify Request:', {
        url: `/payments/verify`,
        data: credentials,
        headers: instance.defaults.headers,
      });

      const response = await instance.post<PointverifyResponse>(
        `/payments/verify`, // 쿼리 스트링 제거
        credentials, // 데이터를 request body에 포함
      );

      console.log('Raw Response:', response);
      return response.data;
    } catch (error: unknown) {
      console.error('Error point verify:', error);
      return handleError<PointverifyResponse>(error);
    }
  },

  // 포인트 충전
  charge: async (credentials: PointchargeRequest): Promise<PointchargeResponse> => {
    try {
      console.log('point charge Request:', {
        url: '/points/charge',
        data: credentials,
        headers: instance.defaults.headers,
      });
      const response = await instance.post<PointchargeResponse>('/points/charge', credentials);
      console.log('Raw Response:', response);
      return response.data;
    } catch (error: unknown) {
      console.error('Error point charge:', error);
      return handleError<PointchargeResponse>(error);
    }
  },

  // 포인트 충전 내역 조회 (POST 방식, page 쿼리 파라미터 포함)
  transactionscharge: async (page: number = 1): Promise<TransactionsChargeResponse> => {
    try {
      console.log('Request URL:', '/points/transactions/charges', 'Page:', page);

      const response = await instance.post<TransactionsChargeResponse>(
        '/points/transactions/charges',
        {}, // 본문은 비워두고
        { params: { page } }, // 쿼리 파라미터로 page를 전송
      );
      console.log('Response:', response);
      return response.data;
    } catch (error: unknown) {
      console.error('Error during transactionscharge:', error);
      return handleError<TransactionsChargeResponse>(error);
    }
  },

  // 포인트 사용 내역 조회 (GET 방식, page와 size 쿼리 파라미터 포함)
  transactionsusages: async (
    page: number = 1,
    size: number = 10,
  ): Promise<TransactionsUsagesResponse> => {
    try {
      console.log('Request URL:', '/transactions/usages', 'Page:', page, 'Size:', size);

      const response = await instance.get<TransactionsUsagesResponse>(
        '/transactions/usages',

        { params: { page, size } }, // 쿼리 파라미터로 page와 size 전달
      );
      console.log('Response:', response);
      return response.data;
    } catch (error: unknown) {
      console.error('Error during transactionsusages:', error);
      return handleError<TransactionsUsagesResponse>(error);
    }
  },

  // 포인트 수익 내역 조회 (GET 방식, page와 size 쿼리 파라미터 포함)
  transactionsearning: async (
    page: number = 1,
    size: number = 10,
  ): Promise<TransactionsEarningsResponse> => {
    try {
      console.log('Request URL:', '/transactions/earnings', 'Page:', page, 'Size:', size);

      const response = await instance.get<TransactionsEarningsResponse>(
        '/transactions/earnings',
        { params: { page, size } }, // 쿼리 파라미터로 page와 size 전달
      );
      console.log('Response:', response);
      return response.data;
    } catch (error: unknown) {
      console.error('Error during transactionsearning:', error);
      return handleError<TransactionsEarningsResponse>(error);
    }
  },
};
