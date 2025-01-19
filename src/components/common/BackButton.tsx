import React from 'react';
import { StyledBackButton } from '@/styles/common/BackButton.styles';

interface BackButtonProps {
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return <StyledBackButton onClick={onClick} aria-label="뒤로 가기" />;
};

export default BackButton;
