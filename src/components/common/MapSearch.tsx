import React, { useState, useEffect, useCallback } from 'react';
import * as S from '../../styles/common/Search.styles';
import { Place } from '@/types/map/place';
import { useSearch, SearchSuggestion } from '@/hooks/map/useMapSearch';
import { debounce } from 'lodash';
import searchIcon from '../../assets/search.png';

interface SearchProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  onPlaceSelect?: (place: SearchSuggestion['data']) => void;
  onEventSelect?: (event: SearchSuggestion['data']) => void;
}

const Search: React.FC<SearchProps> = ({
  placeholder = '이벤트나 작품명을 검색하세요',
  onSearch,
  onPlaceSelect,
  onEventSelect,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { suggestions, isLoading, searchKeyword, saveRecentSearch } = useSearch();

  // useCallback으로 debounce 함수 메모이제이션
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      console.log('Debounced search called with:', value); // 디버깅 로그
      searchKeyword(value);
    }, 300),
    [searchKeyword],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      console.log('Input changed:', value); // 디버깅 로그
      setInputValue(value);
      setShowSuggestions(true);
      debouncedSearch(value);
    },
    [debouncedSearch],
  );

  const handleSubmit = useCallback(() => {
    if (inputValue.trim()) {
      console.log('Submit with value:', inputValue); // 디버깅 로그
      saveRecentSearch(inputValue.trim());
      if (onSearch) {
        onSearch(inputValue.trim());
      }
      setShowSuggestions(false);
    }
  }, [inputValue, onSearch, saveRecentSearch]);

  const handleSuggestionClick = useCallback(
    (suggestion: SearchSuggestion) => {
      console.log('Suggestion clicked:', suggestion);
      setInputValue(suggestion.name);

      // 최근 검색어에 추가
      const searchText = suggestion.animeName
        ? `${suggestion.animeName} - ${suggestion.name}`
        : suggestion.name;
      saveRecentSearch(searchText);

      setShowSuggestions(false);

      if (suggestion.type === 'place' && onPlaceSelect) {
        onPlaceSelect(suggestion.data);
      } else if (suggestion.type === 'event' && onEventSelect) {
        onEventSelect(suggestion.data);
      }
    },
    [onPlaceSelect, onEventSelect, saveRecentSearch],
  );

  useEffect(() => {
    console.log('Current suggestions:', suggestions); // 디버깅 로그
  }, [suggestions]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.search-container')) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <S.SearchContainer className="search-container">
      <S.SearchIcon src={searchIcon} alt="Search" onClick={handleSubmit} />
      <S.SearchInput
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <S.SearchLine />

      {showSuggestions && (suggestions.length > 0 || isLoading) && (
        <S.SuggestionsContainer>
          {isLoading ? (
            <S.LoadingItem>검색 중...</S.LoadingItem>
          ) : (
            suggestions.map((suggestion) => (
              <S.SuggestionItem
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <S.SuggestionContent>
                  {suggestion.animeName && (
                    <S.SuggestionAnime>{suggestion.animeName}</S.SuggestionAnime>
                  )}
                  <S.SuggestionTitle>{suggestion.name}</S.SuggestionTitle>
                </S.SuggestionContent>
                <S.SuggestionType>
                  {suggestion.type === 'place' ? '장소' : '이벤트'}
                </S.SuggestionType>
              </S.SuggestionItem>
            ))
          )}
        </S.SuggestionsContainer>
      )}
    </S.SearchContainer>
  );
};

export default Search;
