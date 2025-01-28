import axios, { AxiosError } from 'axios';
import { LoginRequest, LoginResponse } from '../../types/login/auth';

const instance = axios.create({
  baseURL: '/api', // VITE_API_URL 대신 '/api'로 변경
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const authAPI = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      console.log('Request URL:', '/auth/login');
      console.log('Request Data:', credentials);
      const response = await instance.post<LoginResponse>('/auth/login', credentials);
      console.log('Response:', response);
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
};