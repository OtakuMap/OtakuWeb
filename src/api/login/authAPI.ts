import axios, { AxiosError } from 'axios';
import {
  LoginRequest,
  LoginResponse,
  OAuthLoginRequest,
  RegisterRequest,
  RegisterResponse,
  CheckEmailDuplicationResponse,
  CheckIDDuplicationResponse,
  SearchIdRequest,
  SearchIdResponse,
  SearchPwRequest,
  SearchPwResponse,
  SearchPwSendEmailVerifyCodeRequest,
  SearchPwSendEmailVerifyCodeResponse,
  sendEmailVerifyCodeRequest,
  sendEmailVerifyCodeResponse,
  EmailVerifyCodeRequest,
  EmailVerifyCodeResponse,
  LogoutResponse,
  resetPwRequest,
  resetPwResponse,
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
  // 로그인
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

  oauthLogin: async (
    provider: 'google' | 'kakao' | 'naver',
    oauthData: OAuthLoginRequest,
  ): Promise<LoginResponse> => {
    try {
      const url = `/auth/social/${provider}`;
      console.log('OAuth 요청 URL:', url);
      console.log('OAuth 요청 데이터:', oauthData);

      const response = await instance.post<LoginResponse>(url, oauthData);
      console.log('OAuth 응답:', response.data);

      return response.data;
    } catch (error) {
      console.error('OAuth 로그인 오류:', error);
      return handleError<LoginResponse>(error);
    }
  },

  // 회원가입
  register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
    try {
      console.log('Request URL:', '/auth/signup');
      console.log('Request Data:', userData);

      const response = await instance.post<RegisterResponse>('/auth/signup', userData);
      console.log('Response:', response);
      return response.data;
    } catch (error: unknown) {
      console.error('Error during registration:', error);
      return handleError<RegisterResponse>(error);
    }
  },

  // 회원가입 - 아이디 중복 확인
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

  // 회원가입 - 이메일 중복 확인
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

  // 아이디 비밀번호 찾기
  // 아이디 찾기
  searchId: async (params: SearchIdRequest): Promise<SearchIdResponse> => {
    try {
      console.log('Request URL:', '/auth/find-id');
      console.log('Request Params:', params);

      const response = await instance.get<SearchIdResponse>('/auth/find-id', {
        params, // GET 요청에서는 params 사용
      });

      console.log('Response:', response);
      return response.data;
    } catch (error: unknown) {
      console.error('Error during searchId:', error);
      return handleError<SearchIdResponse>(error);
    }
  },

  // 비밀번호 찾기 (인증번호 요청)

  searchPw: async (userData: SearchPwRequest): Promise<SearchPwResponse> => {
    try {
      console.log('Request URL:', '/auth/find-password');
      console.log('Request Data:', userData);

      const response = await instance.post<SearchPwResponse>('/auth/find-password', userData);
      console.log('Response:', response);
      return response.data;
    } catch (error: unknown) {
      console.error('Error during searchPw:', error);
      return handleError<SearchPwResponse>(error);
    }
  },

  // 비밀번호 찾기 코드 인증
  searchPwsendEmailVerifyCode: async (
    userData: SearchPwSendEmailVerifyCodeRequest,
  ): Promise<SearchPwSendEmailVerifyCodeResponse> => {
    try {
      console.log('Request URL:', '/auth/verify-password-code');
      console.log('Request Data:', userData);

      const response = await instance.post<SearchPwSendEmailVerifyCodeResponse>(
        '/auth/verify-password-code',
        userData,
      );
      console.log('Response:', response);
      return response.data;
    } catch (error: unknown) {
      console.error('Error during searchPwsendEmailVerifyCode:', error);
      return handleError<SearchPwSendEmailVerifyCodeResponse>(error);
    }
  },

  // 비밀번호 변경
  newsetPw: async (userData: resetPwRequest): Promise<resetPwResponse> => {
    try {
      console.log('Request URL:', '/users/reset-password');
      console.log('Request Data:', userData);

      const response = await instance.post<resetPwResponse>('/users/reset-password', userData);
      console.log('Response:', response);
      return response.data;
    } catch (error: unknown) {
      console.error('Error during resetPw:', error);
      return handleError<resetPwResponse>(error);
    }
  },

  // 회원가입 - 이메일 인증 메일 전송
  sendEmailVerifyCode: async (
    email: sendEmailVerifyCodeRequest,
  ): Promise<sendEmailVerifyCodeResponse> => {
    try {
      console.log('Request URL:', '/auth/verify-code');
      console.log('Request Data:', email);

      const response = await instance.post<sendEmailVerifyCodeResponse>(
        '/auth/verify-email',
        email,
      );
      console.log('Response:', response);
      return response.data;
    } catch (error: unknown) {
      console.error('Error during emailVerifyCode:', error);
      return handleError<sendEmailVerifyCodeResponse>(error);
    }
  },

  // 회원가입 - 이메일 코드 인증
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

  // logout: async (): Promise<LogoutResponse> => {
  //   try {
  //     // 토큰이 없는 경우 즉시 성공 반환
  //     const accessToken = tokenStorage.getAccessToken();
  //     if (!accessToken) {
  //       return {
  //         isSuccess: true,
  //         code: 'SUCCESS',
  //         message: '로그아웃 되었습니다.'
  //       };
  //     }

  //     const response = await instance.post<LogoutResponse>('/auth/logout');
  //     return response.data;
  //   } catch (error: unknown) {
  //     console.error('Error during logout:', error);
  //     if (axios.isAxiosError(error)) {
  //       // 401 에러는 이미 로그아웃된 상태로 간주
  //       if (error.response?.status === 401) {
  //         return {
  //           isSuccess: true,
  //           code: 'SUCCESS',
  //           message: '로그아웃 되었습니다.'
  //         };
  //       }
  //       return handleError<LogoutResponse>(error);
  //     }
  //     return {
  //       isSuccess: false,
  //       code: 'UNKNOWN_ERROR',
  //       message: '로그아웃 중 오류가 발생했습니다.'
  //     };
  //   }
  // };

  // 로그아웃
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
