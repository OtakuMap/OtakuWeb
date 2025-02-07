import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  // ModalState를 export 추가
  isLoginModalOpen: boolean;
}

const initialState: ModalState = {
  isLoginModalOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.isLoginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.isLoginModalOpen = false;
    },
  },
});

export const { openLoginModal, closeLoginModal } = modalSlice.actions;
export default modalSlice.reducer;
