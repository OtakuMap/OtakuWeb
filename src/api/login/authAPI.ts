import axios, { AxiosError } from 'axios';
import { LoginRequest, 
  LoginResponse, 
  OAuthLoginRequest, 
  RegisterRequest, 
  RegisterResponse,
  CheckEmailDuplicationRequest,
  CheckEmailDuplicationResponse,
  CheckIDDuplicationRequest,
  CheckIDDuplicationResponse,
  SearchIdRequest,
  SearchIdResponse,
  EmailVerifyCodeRequest, 
  EmailVerifyCodeResponse} from '../../types/login/auth';

const instance = axios.create({
  baseURL: '/api', // VITE_API_URL 대신 '/api'로 설정
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 인증 정보(쿠키 등)를 포함
});

export const authAPI = {
  // 일반 로그인
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      console.log('Request URL:', '/auth/login');
      console.log('Request Data:', credentials);
      const response = await instance.post<LoginResponse>('/auth/login', credentials);
      console.log('Response:', response);
      return response.data;
    } catch (error: unknown) {
      console.error('Error during login:', error);
      return handleError<LoginResponse>(error);
    }
  },

  // OAuth 로그인
  oauthLogin: async (
    provider: 'google' | 'kakao' | 'naver',
    oauthData: OAuthLoginRequest 
  ): Promise<LoginResponse> => {
    try {
      // OAuth 경로는 /auth/social/{provider} 형식으로 설정
      const url = `/auth/social/${provider}`;  // 백틱 사용
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
      return handleError<RegisterResponse>(error); // 제네릭으로 타입 전달
    }
  },

// 아이디 중복 확인
checkIdDuplication: async (userId: string): Promise<CheckIDDuplicationResponse> => {
  try {
    console.log('Request URL:', '/auth/check-id');
    console.log('Request Data:', { userId }); // userId만 전달

    // GET 방식으로 URL에 쿼리 파라미터로 전달
    const response = await instance.get<CheckIDDuplicationResponse>('/auth/check-id', {
      params: { userId }, // 쿼리 파라미터로 전달
    });
    console.log('Response:', response);
    return response.data;
  } catch (error: unknown) {
    console.error('Error during checkIdDuplication:', error);
    return handleError<CheckIDDuplicationResponse>(error); // 제네릭으로 타입 전달
  }
},


  // 이메일 중복 확인
  checkEmailDuplication: async (userEmail: string): Promise<CheckEmailDuplicationResponse> => {
    try {
      console.log('Request URL:', '/auth/check-email');
      console.log('Request Data:', { userEmail }); // userId만 전달
  
      // GET 방식으로 URL에 쿼리 파라미터로 전달
      const response = await instance.get<CheckEmailDuplicationResponse>('/auth/check-email', {
        params: { userEmail }, // 쿼리 파라미터로 전달
      });
      console.log('Response:', response);
      return response.data;
    } catch (error: unknown) {
      console.error('Error during checkEmailDuplication:', error);
      return handleError<CheckEmailDuplicationResponse>(error); // 제네릭으로 타입 전달
    }
  },

    // 아이디 찾기
    searchId: async (userId: string): Promise<SearchIdResponse> => {
      try {
        console.log('Request URL:', '/auth/find-id');
        console.log('Request Data:', { userId }); // userId만 전달
    
        // GET 방식으로 URL에 쿼리 파라미터로 전달
        const response = await instance.get<SearchIdResponse>('/auth/find-id', {
          params: { userId }, // 쿼리 파라미터로 전달
        });
        console.log('Response:', response);
        return response.data;
      } catch (error: unknown) {
        console.error('Error during searchId:', error);
        return handleError<SearchIdResponse>(error); // 제네릭으로 타입 전달
      }
    },

    // 이메일 인증
    EmailVerifyCode: async (userData: EmailVerifyCodeRequest): Promise<EmailVerifyCodeResponse> => {
      try {
        console.log('Request URL:', '/auth/verify-code');
        console.log('Request Data:', userData);
  
        const response = await instance.post<EmailVerifyCodeResponse>('/auth/verify-code', userData);
        console.log('Response:', response);
        return response.data;
      } catch (error: unknown) {
        console.error('Error during emailverifycode:', error);
        return handleError<EmailVerifyCodeResponse>(error); // 제네릭으로 타입 전달
      }
    },

};



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
