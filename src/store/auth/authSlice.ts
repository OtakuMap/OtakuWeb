import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  isLoggedIn: boolean;
  userId: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  userId: null,
  accessToken: null,
  refreshToken: null,
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
