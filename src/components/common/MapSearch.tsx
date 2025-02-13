import React, { useState, useEffect, useCallback, forwardRef } from 'react';
import * as S from '../../styles/common/Search.styles';
import { useSearch, SearchSuggestion } from '@/hooks/map/useMapSearch';
import { debounce } from 'lodash';
import searchIcon from '../../assets/search.png';

interface SearchProps {
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onPlaceSelect?: (place: SearchSuggestion['data']) => void;
  onEventSelect?: (event: SearchSuggestion['data']) => void;
  showSuggestions?: boolean;
  onShowSuggestionsChange?: (show: boolean) => void;
}

const Search = forwardRef<HTMLInputElement, SearchProps>((props, ref) => {
  const {
    placeholder = '이벤트나 작품명을 검색하세요',
    value,
    onValueChange,
    onSearch,
    onPlaceSelect,
    onEventSelect,
    showSuggestions: externalShowSuggestions,
    onShowSuggestionsChange,
  } = props;

  // 내부 상태는 외부 props가 없을 때만 사용
  const [internalValue, setInternalValue] = useState('');
  const [internalShowSuggestions, setInternalShowSuggestions] = useState(false);

  // 실제 사용할 값들
  const inputValue = value ?? internalValue;
  const showSuggestions = externalShowSuggestions ?? internalShowSuggestions;

  const { suggestions, isLoading, searchKeyword, saveRecentSearch } = useSearch();

  // 외부에서 value가 변경될 때 검색 실행
  useEffect(() => {
    if (value) {
      searchKeyword(value);
      if (onShowSuggestionsChange) {
        onShowSuggestionsChange(true);
      } else {
        setInternalShowSuggestions(true);
      }
    }
  }, [value, searchKeyword, onShowSuggestionsChange]);

  const debouncedSearch = useCallback(
    debounce((searchValue: string) => {
      console.log('Debounced search called with:', searchValue);
      searchKeyword(searchValue);
    }, 300),
    [searchKeyword],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      // 외부 상태가 있으면 그것을 업데이트
      if (onValueChange) {
        onValueChange(newValue);
      } else {
        setInternalValue(newValue);
      }

      // 검색 제안 표시 상태 업데이트
      if (onShowSuggestionsChange) {
        onShowSuggestionsChange(true);
      } else {
        setInternalShowSuggestions(true);
      }

      debouncedSearch(newValue);
    },
    [debouncedSearch, onValueChange, onShowSuggestionsChange],
  );

  const handleSuggestionClick = useCallback(
    (suggestion: SearchSuggestion) => {
      const newValue = suggestion.name;

      // 입력값 업데이트
      if (onValueChange) {
        onValueChange(newValue);
      } else {
        setInternalValue(newValue);
      }

      // 검색 제안 숨기기
      if (onShowSuggestionsChange) {
        onShowSuggestionsChange(false);
      } else {
        setInternalShowSuggestions(false);
      }

      // 최근 검색어 저장
      const searchText = suggestion.animeName
        ? `${suggestion.animeName} - ${suggestion.name}`
        : suggestion.name;
      saveRecentSearch(searchText);

      // 선택된 항목 처리
      if (suggestion.type === 'place' && onPlaceSelect) {
        onPlaceSelect(suggestion.data);
      } else if (suggestion.type === 'event' && onEventSelect) {
        onEventSelect(suggestion.data);
      }
    },
    [onValueChange, onShowSuggestionsChange, onPlaceSelect, onEventSelect, saveRecentSearch],
  );

  const handleSubmit = useCallback(() => {
    if (inputValue.trim()) {
      if (suggestions.length > 0) {
        handleSuggestionClick(suggestions[0]);
      } else if (onSearch) {
        saveRecentSearch(inputValue.trim());
        onSearch(inputValue.trim());
      }

      // 검색 제안 숨기기
      if (onShowSuggestionsChange) {
        onShowSuggestionsChange(false);
      } else {
        setInternalShowSuggestions(false);
      }
    }
  }, [
    inputValue,
    suggestions,
    handleSuggestionClick,
    onSearch,
    saveRecentSearch,
    onShowSuggestionsChange,
  ]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.search-container')) {
        if (onShowSuggestionsChange) {
          onShowSuggestionsChange(false);
        } else {
          setInternalShowSuggestions(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      debouncedSearch.cancel();
    };
  }, [debouncedSearch, onShowSuggestionsChange]);

  return (
    <S.SearchContainer className="search-container">
      <S.SearchIcon src={searchIcon} alt="Search" onClick={handleSubmit} />
      <S.SearchInput
        ref={ref}
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
});

Search.displayName = 'Search';

export default Search;
