import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tokenStorage } from '@/utils/token';

export interface AuthState {
  isLoggedIn: boolean;
  userId: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: !!tokenStorage.getAccessToken(),
  userId: tokenStorage.getUserId(),
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
      const userId = String(action.payload.id);
      state.isLoggedIn = true;
      state.userId = userId;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
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
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
