import React, { useState, useEffect, useCallback } from 'react';
import * as S from '../../styles/common/Search.styles';
import { Place } from '@/types/map/place';
import { koreanMatch } from '@/utils/searchUtils';

interface SearchProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  onSuggestionSelect?: (place: Place) => void;
}

// 실제 환경에서는 API로 받아올 데이터
const mockPlaces: Place[] = [
  {
    id: 1,
    title: '아키하바라 애니메이션 센터',
    name: '아키하바라 애니메이션 센터',
    isSelected: false,
    latitude: 35.6995,
    longitude: 139.7711,
    animeName: '러브라이브!, 스테인즈 게이트',
    address: '도쿄도 치요다구 소토칸다 1-7-6 아키바UDX 4F',
    hashtags: ['아키하바라', '애니메이션', '피규어'],
  },
  // ... 더 많은 mockPlaces 데이터
];

const Search: React.FC<SearchProps> = ({
  placeholder = '이벤트나 작품명을 검색하세요',
  onSearch,
  onSuggestionSelect,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<Place[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // 검색어 필터링 함수
  const filterSuggestions = useCallback((searchText: string) => {
    if (!searchText.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = mockPlaces.filter(
      (place) =>
        koreanMatch(place.title, searchText) ||
        koreanMatch(place.animeName, searchText) ||
        place.hashtags.some((tag) => koreanMatch(tag, searchText)),
    );

    setSuggestions(filtered.slice(0, 5)); // 최대 5개까지만 표시
  }, []);

  // 입력값 변경 시 실행되는 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    filterSuggestions(value);
    setShowSuggestions(true);
  };

  // 검색어 제출 핸들러
  const handleSubmit = () => {
    if (inputValue.trim() && onSearch) {
      onSearch(inputValue.trim());
      setShowSuggestions(false);
    }
  };

  // 검색어 제안 선택 핸들러
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

  // 검색창 외부 클릭 시 제안 목록 닫기
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
              <S.SuggestionTitle>{suggestion.title}</S.SuggestionTitle>
              <S.SuggestionAnime>{suggestion.animeName}</S.SuggestionAnime>
              <S.HashtagContainer>
                {suggestion.hashtags.map((tag, index) => (
                  <S.Hashtag key={index}>#{tag}</S.Hashtag>
                ))}
              </S.HashtagContainer>
            </S.SuggestionItem>
          ))}
        </S.SuggestionsContainer>
      )}
    </S.SearchContainer>
  );
};

export default Search;
