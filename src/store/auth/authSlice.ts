import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tokenStorage } from '@/utils/token';

export interface AuthState {
  isLoggedIn: boolean;
  userId: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  provider: string | null;
  error: string | null;
}

// userId 유효성 검사
const storedUserId = tokenStorage.getUserId();
const validUserId = storedUserId && storedUserId !== 'undefined' ? storedUserId : null;

const initialState: AuthState = {
  isLoggedIn: !!tokenStorage.getAccessToken(),
  // userId: tokenStorage.getUserId(),
  userId: validUserId, // 여기만 수정
  accessToken: tokenStorage.getAccessToken(),
  refreshToken: tokenStorage.getRefreshToken(),
  provider: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        id: number;
        accessToken: string;
        refreshToken: string;
      }>,
    ) => {
      const userId = String(action.payload.id);
      state.isLoggedIn = true;
      state.userId = userId;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.provider = null;
      state.error = null;

      tokenStorage.setTokens(action.payload.accessToken, action.payload.refreshToken, userId);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userId = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
      tokenStorage.clearTokens();
    },
    oauthLoginSuccess: (
      state,
      action: PayloadAction<{
        id: number;
        accessToken: string;
        refreshToken: string;
        provider: string;
      }>,
    ) => {
      const userId = String(action.payload.id);
      state.isLoggedIn = true;
      state.userId = userId;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.provider = action.payload.provider; // OAuth provider 정보 추가
      state.error = null;

      tokenStorage.setTokens(action.payload.accessToken, action.payload.refreshToken, userId);
    },
  },
});

export const { loginSuccess, loginFailure, logout, oauthLoginSuccess } = authSlice.actions;
export default authSlice.reducer;
