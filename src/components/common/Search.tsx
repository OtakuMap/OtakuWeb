import React, { useState, useEffect, useCallback } from 'react';
import * as S from '../../styles/common/Search.styles';
import { Place } from '@/types/map/place';
import { koreanMatch } from '@/utils/searchUtils';

interface SearchProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  onSuggestionSelect?: (place: Place) => void;
}

const mockPlaces: Place[] = [
  {
    id: 1,
    title: '코난',
    name: '코난',
    isSelected: false,
    latitude: 35.6995,
    longitude: 139.7711,
    animeName: '',
    address: '',
    hashtags: [],
  },
  {
    id: 2,
    title: '코난 이벤트',
    name: '코난 이벤트',
    isSelected: false,
    latitude: 35.6995,
    longitude: 139.7711,
    animeName: '',
    address: '',
    hashtags: [],
  },
  {
    id: 3,
    title: '명탐정 코난',
    name: '명탐정 코난',
    isSelected: false,
    latitude: 35.6995,
    longitude: 139.7711,
    animeName: '',
    address: '',
    hashtags: [],
  },
  {
    id: 4,
    title: '명탐정 코난 이벤트',
    name: '명탐정 코난 이벤트',
    isSelected: false,
    latitude: 35.6995,
    longitude: 139.7711,
    animeName: '',
    address: '',
    hashtags: [],
  },
];

const Search: React.FC<SearchProps> = ({
  placeholder = '이벤트나 작품명을 검색하세요',
  onSearch,
  onSuggestionSelect,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<Place[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filterSuggestions = useCallback((searchText: string) => {
    if (!searchText.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = mockPlaces.filter((place) => koreanMatch(place.title, searchText));

    setSuggestions(filtered);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    filterSuggestions(value);
    setShowSuggestions(true);
  };

  const handleSubmit = () => {
    if (inputValue.trim() && onSearch) {
      onSearch(inputValue.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (place: Place) => {
    setInputValue(place.title);
    setSuggestions([]);
    setShowSuggestions(false);
    if (onSuggestionSelect) {
      onSuggestionSelect(place);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.search-container')) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <S.SearchContainer className="search-container">
      <S.SearchIcon onClick={handleSubmit} />
      <S.SearchInput
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <S.SearchLine />

      {showSuggestions && suggestions.length > 0 && (
        <S.SuggestionsContainer>
          {suggestions.map((suggestion) => (
            <S.SuggestionItem key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.title}
            </S.SuggestionItem>
          ))}
        </S.SuggestionsContainer>
      )}
    </S.SearchContainer>
  );
};

export default Search;
