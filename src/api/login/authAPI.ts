import axios, { AxiosError } from 'axios';
import { LoginRequest, LoginResponse, LogoutResponse } from '../../types/login/auth';
import { tokenStorage } from '@/utils/token';

const instance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 요청 인터셉터 추가
instance.interceptors.request.use(
  (config) => {
    const token = tokenStorage.getAccessToken();
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
  (error) => {
    return Promise.reject(error);
  },
);

export const authAPI = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      console.log('Login Request:', {
        url: '/auth/login',
        data: credentials,
        headers: instance.defaults.headers,
      });
      const response = await instance.post<LoginResponse>('/auth/login', credentials);
      console.log('Raw Response:', response);
      return response.data;
    } catch (error: unknown) {
      console.error('Error during login:', error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<LoginResponse>;
        console.log('Error Response:', axiosError.response?.data);
        return {
          isSuccess: false,
          code: axiosError.response?.data?.code || 'UNKNOWN_ERROR',
          message: axiosError.response?.data?.message || '알 수 없는 오류가 발생했습니다.',
        };
      }
      return {
        isSuccess: false,
        code: 'UNKNOWN_ERROR',
        message: '알 수 없는 오류가 발생했습니다.',
      };
    }
  },
  logout: async (): Promise<LogoutResponse> => {
    try {
      // 요청 전 토큰 확인을 위한 로그
      console.log('Logout request headers:', {
        Authorization: `Bearer ${tokenStorage.getAccessToken()}`,
      });

      const response = await instance.post<LogoutResponse>('/auth/logout', null, {
        headers: {
          Authorization: `Bearer ${tokenStorage.getAccessToken()}`,
        },
      });

      console.log('Logout response:', response.data);
      return response.data;
    } catch (error: unknown) {
      console.error('Error during logout:', error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<LogoutResponse>;
        console.log('Error details:', {
          status: axiosError.response?.status,
          data: axiosError.response?.data,
        });
        return {
          isSuccess: false,
          code: axiosError.response?.data?.code || 'UNKNOWN_ERROR',
          message: axiosError.response?.data?.message || '로그아웃 중 오류가 발생했습니다.',
        };
      }
      return {
        isSuccess: false,
        code: 'UNKNOWN_ERROR',
        message: '로그아웃 중 오류가 발생했습니다.',
      };
    }
  },
};
