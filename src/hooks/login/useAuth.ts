import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../api/login/authAPI';
import { loginSuccess, loginFailure, logout as logoutAction } from '../../store/auth/authSlice';
import { tokenStorage } from '@/utils/token';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const login = async (userId: string, password: string) => {
    setLoading(true);
    try {
      const response = await authAPI.login({ userId, password });
      console.log('Login response:', response); //응답 확인

      if (response.isSuccess && response.result) {
        //성공 시 두 토큰 모두 저장
        tokenStorage.setTokens(response.result.accessToken, response.result.refreshToken);
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

  const logout = async () => {
    try {
      const response = await authAPI.logout();

      if (response.isSuccess) {
        dispatch(logoutAction());
        tokenStorage.clearTokens();
        navigate('/');
      } else {
        console.error('Logout failed:', response.message);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return { login, logout, loading };
};
