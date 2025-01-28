import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tokenStorage } from '@/utils/token';

export interface AuthState {
  isLoggedIn: boolean;
  userId: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;
}

// localStorage의 토큰으로 초기 상태 설정
const initialState: AuthState = {
  isLoggedIn: !!tokenStorage.getAccessToken(), // 토큰 존재하면 true
  userId: null,
  accessToken: tokenStorage.getAccessToken(),
  refreshToken: tokenStorage.getRefreshToken(),
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
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = false;
      state.error = action.payload;
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
