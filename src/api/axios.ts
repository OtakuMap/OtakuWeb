import axios from 'axios';
import { tokenStorage } from '../utils/token';

const API_BASE = window.location.hostname === 'localhost' ? import.meta.env.VITE_API_URL : '/api';

const instance = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    const token = tokenStorage.getAccessToken();
    console.log('Request interceptor token:', token); // 토큰 확인 로그
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터 (토큰 만료 처리)
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = tokenStorage.getRefreshToken();
        if (!refreshToken) {
          tokenStorage.clearTokens();
          window.location.href = '/';
          return Promise.reject(new Error('No refresh token available'));
        }

        // 토큰 재발급 요청
        const response = await axios.post('/api/auth/reissue', null, {
          headers: {
            RefreshToken: refreshToken,
          },
        });

        // 응답에서 새 토큰들 저장 (userId와 role 모두 저장)
        const { accessToken, refreshToken: newRefreshToken, userId, role } = response.data.result;

        tokenStorage.setTokens(accessToken, newRefreshToken, userId, role);

        // 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        // refresh token이 만료된 경우
        tokenStorage.clearTokens();
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
