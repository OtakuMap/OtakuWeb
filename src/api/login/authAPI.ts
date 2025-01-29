import axios, { AxiosError } from 'axios';
import {
  LoginRequest,
  LoginResponse,
  OAuthLoginRequest,
  RegisterRequest,
  RegisterResponse,
  CheckEmailDuplicationResponse,
  CheckIDDuplicationResponse,
  SearchIdResponse,
  EmailVerifyCodeRequest,
  EmailVerifyCodeResponse,
  LogoutResponse,
} from '../../types/login/auth';
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

export const authAPI = {
  // 일반 로그인
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
      return handleError<LoginResponse>(error);
    }
  },

  // OAuth 로그인
  oauthLogin: async (provider: 'google' | 'kakao' | 'naver', oauthData: OAuthLoginRequest): Promise<LoginResponse> => {
    try {
      const url = `/auth/social/${provider}`;
      console.log('Request URL:', url);
      console.log('Request Data:', oauthData);

      const response = await instance.post<LoginResponse>(url, oauthData);
      console.log('Response:', response);
      return response.data;
    } catch (error: unknown) {
      console.error('Error during OAuth login:', error);
      return handleError<LoginResponse>(error);
    }
  },

  // 회원가입
  register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
    try {
      console.log('Request URL:', '/auth/signup');
      console.log('Request Data:', userData);

      const response = await instance.post<RegisterResponse>('/auth/register', userData);
      console.log('Response:', response);
      return response.data;
    } catch (error: unknown) {
      console.error('Error during registration:', error);
      return handleError<RegisterResponse>(error);
    }
  },

  // 아이디 중복 확인
  checkIdDuplication: async (userId: string): Promise<CheckIDDuplicationResponse> => {
    try {
      console.log('Request URL:', '/auth/check-id');
      console.log('Request Data:', { userId });

      const response = await instance.get<CheckIDDuplicationResponse>('/auth/check-id', {
        params: { userId },
      });
      console.log('Response:', response);
      return response.data;
    } catch (error: unknown) {
      console.error('Error during checkIdDuplication:', error);
      return handleError<CheckIDDuplicationResponse>(error);
    }
  },

  // 이메일 중복 확인
  checkEmailDuplication: async (email: string): Promise<CheckEmailDuplicationResponse> => {
    try {
      console.log('Request URL:', '/auth/check-email');
      console.log('Request Data:', { email });

      const response = await instance.get<CheckEmailDuplicationResponse>('/auth/check-email', {
        params: { email },
      });
      console.log('Response:', response);
      return response.data;
    } catch (error: unknown) {
      console.error('Error during checkEmailDuplication:', error);
      return handleError<CheckEmailDuplicationResponse>(error);
    }
  },

  // 아이디 찾기
  searchId: async (userId: string): Promise<SearchIdResponse> => {
    try {
      console.log('Request URL:', '/auth/find-id');
      console.log('Request Data:', { userId });

      const response = await instance.get<SearchIdResponse>('/auth/find-id', {
        params: { userId },
      });
      console.log('Response:', response);
      return response.data;
    } catch (error: unknown) {
      console.error('Error during searchId:', error);
      return handleError<SearchIdResponse>(error);
    }
  },

  // 이메일 인증
  emailVerifyCode: async (email: EmailVerifyCodeRequest): Promise<EmailVerifyCodeResponse> => {
    try {
      console.log('Request URL:', '/auth/verify-code');
      console.log('Request Data:', email);

      const response = await instance.post<EmailVerifyCodeResponse>('/auth/verify-code', email);
      console.log('Response:', response);
      return response.data;
    } catch (error: unknown) {
      console.error('Error during emailVerifyCode:', error);
      return handleError<EmailVerifyCodeResponse>(error);
    }
  },

  // 로그아웃
  logout: async (): Promise<LogoutResponse> => {
    try {
      console.log('Sending logout request');
      const response = await instance.post<LogoutResponse>('/auth/logout');
      console.log('Logout response:', response.data);
      return response.data;
    } catch (error: unknown) {
      console.error('Error during logout:', error);
      return handleError<LogoutResponse>(error);
    }
  },
};
