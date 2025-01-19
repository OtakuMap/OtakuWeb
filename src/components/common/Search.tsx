import React, { useState } from 'react';
import * as S from '../../styles/common/Search.styles';

interface SearchProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({
  placeholder = '이벤트나 작품명을 검색하세요',
  onSearch,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    if (inputValue.trim() && onSearch) {
      onSearch(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <S.SearchContainer>
      <S.SearchIcon onClick={handleSubmit} />
      <S.SearchInput
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <S.SearchLine />
    </S.SearchContainer>
  );
};

export default Search;
