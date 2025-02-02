import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { closeLoginModal } from '@/store/slices/modalSlice';
import * as S from '../../styles/common/LoginModal.styles';

const LoginModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(closeLoginModal());
  };

  const handleLogin = () => {
    dispatch(closeLoginModal());
    navigate('/login');
  };

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.ModalTitle>로그인 후 이용해주세요</S.ModalTitle>
        <S.ButtonGroup>
          <S.ModalButton onClick={handleClose}>뒤로가기</S.ModalButton>
          <S.ModalButton onClick={handleLogin}>로그인</S.ModalButton>
        </S.ButtonGroup>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default LoginModal;
