import { configureStore } from '@reduxjs/toolkit';
import authReducer, { AuthState } from './auth/authSlice';

// store의 전체 state 타입 정의
interface RootState {
  auth: AuthState;
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type { RootState }; // RootState 타입 export
export type AppDispatch = typeof store.dispatch;
