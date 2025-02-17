import React, { useState, useEffect, useCallback, forwardRef } from 'react';
import * as S from '../../styles/common/Search.styles';
import { useSearch } from '@/hooks/map/useMapSearch';
import { debounce } from 'lodash';
import { LocationGroup, SearchSuggestion } from '@/types/map/search';
import searchIcon from '../../assets/search.png';

interface SearchProps {
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onPlaceSelect?: (place: SearchSuggestion['data'], locationGroup: LocationGroup) => void;
  onEventSelect?: (event: SearchSuggestion['data'], locationGroup: LocationGroup) => void;
  showSuggestions?: boolean;
  onShowSuggestionsChange?: (show: boolean) => void;
  onLocationGroupSelect?: (locationGroup: LocationGroup) => void;
}

const Search = forwardRef<HTMLInputElement, SearchProps>((props, ref) => {
  const {
    placeholder = '이벤트나 작품명을 검색하세요',
    value,
    onLocationGroupSelect,
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

  // const { suggestions, isLoading, searchKeyword, saveRecentSearch } = useSearch();
  const { groupedSuggestions, isLoading, searchKeyword, saveRecentSearch } = useSearch();

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
    (suggestion: SearchSuggestion, locationGroup: LocationGroup) => {
      const newValue = suggestion.name;

      // Update input value and hide suggestions
      if (onValueChange) {
        onValueChange(newValue);
      } else {
        setInternalValue(newValue);
      }

      if (onShowSuggestionsChange) {
        onShowSuggestionsChange(false);
      } else {
        setInternalShowSuggestions(false);
      }

      // Save to recent searches
      const searchText = suggestion.animeName
        ? `${suggestion.animeName} - ${suggestion.name}`
        : suggestion.name;
      saveRecentSearch(searchText);

      // Pass the entire location group
      if (onLocationGroupSelect) {
        onLocationGroupSelect(locationGroup);
      }

      console.log('Suggestion clicked:', suggestion);
      console.log('Location group:', locationGroup);

      // onPlaceSelect와 onEventSelect 사용
      if (suggestion.type === 'place' && onPlaceSelect) {
        onPlaceSelect(suggestion.data, locationGroup);
      } else if (suggestion.type === 'event' && onEventSelect) {
        onEventSelect(suggestion.data, locationGroup);
      }
    },
    [
      onPlaceSelect,
      onEventSelect,
      onValueChange,
      onShowSuggestionsChange,
      onLocationGroupSelect,
      saveRecentSearch,
    ],
  );

  const handleSubmit = useCallback(() => {
    if (inputValue.trim()) {
      if (groupedSuggestions.length > 0) {
        // 첫 번째 그룹의 첫 번째 아이템 선택
        const firstGroup = groupedSuggestions[0];
        handleSuggestionClick(firstGroup.items[0], firstGroup);
      } else if (onSearch) {
        saveRecentSearch(inputValue.trim());
        onSearch(inputValue.trim());
      }

      if (onShowSuggestionsChange) {
        onShowSuggestionsChange(false);
      } else {
        setInternalShowSuggestions(false);
      }
    }
  }, [
    inputValue,
    groupedSuggestions,
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

      {showSuggestions && (groupedSuggestions.length > 0 || isLoading) && (
        <S.SuggestionsContainer>
          {isLoading ? (
            <S.LoadingItem>검색 중...</S.LoadingItem>
          ) : (
            groupedSuggestions.map((group) => (
              <S.LocationGroup key={`${group.latitude}-${group.longitude}`}>
                {group.items.map((suggestion) => (
                  <S.SuggestionItem
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion, group)}
                  >
                    <S.SuggestionContent>
                      {suggestion.animeName && (
                        <S.SuggestionAnime>{suggestion.animeName}</S.SuggestionAnime>
                      )}
                      <S.SuggestionTitle>{suggestion.name}</S.SuggestionTitle>
                    </S.SuggestionContent>
                    <S.SuggestionType>
                      {suggestion.type === 'place' ? '장소' : '이벤트'}
                      {group.items.length > 1 && ' +'}
                    </S.SuggestionType>
                  </S.SuggestionItem>
                ))}
              </S.LocationGroup>
            ))
          )}
        </S.SuggestionsContainer>
      )}
    </S.SearchContainer>
  );
});

Search.displayName = 'Search';

export default Search;
