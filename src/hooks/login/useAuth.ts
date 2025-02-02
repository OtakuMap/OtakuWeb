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

  const login = async (userId: string, password: string) => {
    setLoading(true);
    try {
      const response = await authAPI.login({ userId, password });
      console.log('Login response:', response);

      if (response.isSuccess && response.result) {
        tokenStorage.setTokens(
          response.result.accessToken,
          response.result.refreshToken,
          String(response.result.id),
        );
        dispatch(loginSuccess(response.result));
        navigate('/main');
        console.log('Login successful');
      } else {
        dispatch(loginFailure(response.message));
        console.log('Login failed:', response.message);
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Login error in useAuth:', error);
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
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch(logoutAction());
      navigate('/');
    }
  };

  return { login, oauthLogin, logout, loading };
};
