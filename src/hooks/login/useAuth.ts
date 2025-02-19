import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../api/login/authAPI';
import {
  loginSuccess,
  loginFailure,
  oauthLoginSuccess,
  logout as logoutAction,
} from '../../store/auth/authSlice';
import { tokenStorage } from '@/utils/token';

export interface OAuthLoginRequest {
  code: string;
}

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // const login = async (userId: string, password: string) => {
  //   setLoading(true);
  //   try {
  //     const response = await authAPI.login({ userId, password });
  //     console.log('Login response:', response);

  //     if (response.isSuccess && response.result) {
  //       tokenStorage.setTokens(
  //         response.result.accessToken,
  //         response.result.refreshToken,
  //         String(response.result.id),
  //       );
  //       dispatch(loginSuccess(response.result));
  //       navigate('/');
  //       console.log('Login successful');
  //     } else {
  //       dispatch(loginFailure(response.message));
  //       console.log('Login failed:', response.message);
  //       throw new Error(response.message);
  //     }
  //   } catch (error) {
  //     console.error('Login error in useAuth:', error);
  //     throw error;
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const login = async (userId: string, password: string) => {
    setLoading(true);
    try {
      const response = await authAPI.login({ userId, password });
      console.log('Raw login response:', response);

      if (response.isSuccess && response.result) {
        // 응답의 id가 0인지 확인
        if (response.result.id === 0) {
          console.error('Server returned id as 0');
          throw new Error('Invalid user ID received');
        }

        const userIdString = String(response.result.id);

        console.log('Login process debug:', {
          rawId: response.result.id,
          userIdString,
          tokenCheck: {
            accessToken: !!response.result.accessToken,
            refreshToken: !!response.result.refreshToken,
          },
        });

        // localStorage에 직접 값이 제대로 저장되는지 확인
        localStorage.setItem('userId', userIdString);

        // tokenStorage를 통한 저장
        tokenStorage.setTokens(
          response.result.accessToken,
          response.result.refreshToken,
          userIdString,
        );

        // Redux 상태 업데이트 전 값 확인
        console.log('Before Redux update:', {
          userId: userIdString,
          type: typeof userIdString,
        });

        // Redux store 업데이트
        dispatch(
          loginSuccess({
            id: response.result.id,
            accessToken: response.result.accessToken,
            refreshToken: response.result.refreshToken,
          }),
        );

        // 모든 저장 후 값들 확인
        console.log('After login process:', {
          localStorage: localStorage.getItem('userId'),
          tokenStorage: tokenStorage.getUserId(),
          originalId: response.result.id,
        });

        navigate('/');
      } else {
        dispatch(loginFailure(response.message));
        console.error('Login failed:', response.message);
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Login error details:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const oauthLogin = async (provider: 'google' | 'kakao' | 'naver', code: string) => {
    setLoading(true);
    try {
      // 🔥 `code`가 string인지 확인하기 위해 로그 추가
      console.log('✅ OAuth Login 요청 시작');
      console.log('👉 Provider:', provider);
      console.log('👉 Raw Code:', code, 'Type:', typeof code);

      const oauthData: OAuthLoginRequest = { code: String(code) }; // Ensure it's always a string

      console.log('📡 OAuth 요청 데이터:', oauthData);

      const response = await authAPI.oauthLogin(provider, oauthData);

      console.log('🔄 OAuth 로그인 응답:', response);

      if (response.isSuccess && response.result) {
        tokenStorage.setTokens(
          response.result.accessToken,
          response.result.refreshToken,
          String(response.result.id),
        );
        dispatch(
          oauthLoginSuccess({
            id: response.result.id,
            accessToken: response.result.accessToken,
            refreshToken: response.result.refreshToken,
            provider,
          }),
        );
        console.log('✅ OAuth 로그인 성공');
        navigate('/main');
      } else {
        console.log('❌ OAuth 로그인 실패:', response.message);
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('🚨 OAuth 로그인 오류:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const response = await authAPI.logout();

      if (response.isSuccess) {
        // 순서가 중요: 먼저 로컬 스토리지를 정리하고, 리덕스 상태를 업데이트
        tokenStorage.clearTokens(); // 먼저 토큰 제거
        dispatch(logoutAction()); // 리덕스 상태 초기화
        navigate('/'); // 마지막으로 페이지 이동
      } else {
        // 로그아웃 실패 시 사용자에게 알림
        console.error('Logout failed:', response.message);
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Logout error:', error);
      // 에러 처리를 위해 상위 컴포넌트로 에러를 전파
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { login, oauthLogin, logout, loading };
};
