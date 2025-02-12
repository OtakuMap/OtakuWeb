// hooks/review/useRecentSearches.ts
import { useState } from 'react';
import { NavigateFunction } from 'react-router-dom';

interface SearchItem {
  text: string;
  date: string;
}

export const useRecentSearches = (initialSearches: SearchItem[]) => {
  const [recentSearches, setRecentSearches] = useState<SearchItem[]>(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : initialSearches;
  });

  const handleSearch = async (searchInput: string, navigate: NavigateFunction) => {
    if (searchInput.trim()) {
      const newSearch = {
        text: searchInput,
        date: new Date()
          .toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .split(' ')
          .join('')
          .replace(/\./g, '')
          .replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3'),
      };

      const updatedSearches = [newSearch, ...recentSearches].slice(0, 3);
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));

      // URL 파라미터로 검색어 전달
      navigate(`/review2?keyword=${encodeURIComponent(searchInput)}`);
    }
  };

  const handleDelete = (index: number) => {
    const updatedSearches = recentSearches.filter((_item: SearchItem, i: number) => i !== index);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  return { recentSearches, handleSearch, handleDelete };
};
