import { configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer, { AuthState } from './auth/authSlice';
import modalReducer, { ModalState } from './slices/modalSlice';
import userReducer from './slices/userSlice'; // 추가
import { UserState } from './slices/userSlice'; // 추가 (타입 export 필요)

// store의 전체 state 타입 정의
interface RootState {
  auth: AuthState;
  modal: ModalState;
  user: UserState; // 추가
}

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    modal: modalReducer,
    user: userReducer, // 추가
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
export type { RootState };
export type AppDispatch = typeof store.dispatch;
