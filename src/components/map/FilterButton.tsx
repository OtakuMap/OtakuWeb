import React, { useState } from 'react';
import * as S from '../../styles/map/FilterButton.styles';

interface FilterButtonProps {
  onFilterChange?: (filter: 'spot' | 'event') => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onFilterChange }) => {
  const [isEventMode, setIsEventMode] = useState(false);

  const handleClick = () => {
    setIsEventMode(!isEventMode);
    onFilterChange?.(isEventMode ? 'spot' : 'event');
  };

  return (
    <S.FilterContainer onClick={handleClick}>
      <S.FilterOption $isActive={!isEventMode} />
      <S.FilterOption $isActive={isEventMode} />
      <S.LeftText $isVisible={isEventMode}>이벤트만</S.LeftText>
      <S.RightText $isVisible={!isEventMode}>명소만</S.RightText>
    </S.FilterContainer>
  );
};

export default FilterButton;
