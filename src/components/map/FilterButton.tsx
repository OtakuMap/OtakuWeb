import React, { useState } from 'react';
import * as S from '../../styles/map/FilterButton.styles';

interface FilterButtonProps {
  onFilterChange?: (isActive: boolean) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onFilterChange }) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    const newState = !isActive;
    setIsActive(newState);
    onFilterChange?.(newState);
  };

  return (
    <S.FilterContainer>
      <S.ToggleButton $isActive={isActive} onClick={handleToggle} />
      <S.FilterText>명소만</S.FilterText>
    </S.FilterContainer>
  );
};

export default FilterButton;
