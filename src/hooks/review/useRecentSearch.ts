// hooks/review/useRecentSearches.ts
import { useState } from 'react';
import { NavigateFunction } from 'react-router-dom';
import instance from '@/api/axios';
import { AxiosError } from 'axios';

interface SearchItem {
  text: string;
  date: string;
}

interface SearchError {
  isSuccess: boolean;
  code: string;
  message: string;
}

export const useRecentSearches = (initialSearches: SearchItem[]) => {
  const [recentSearches, setRecentSearches] = useState<SearchItem[]>(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : initialSearches;
  });

  const handleSearch = async (searchInput: string, navigate: NavigateFunction) => {
    if (!searchInput.trim()) return;

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

    // 검색 API 호출 및 에러 처리
    await instance
      .get<SearchError>(
        `/reviews/search?keyword=${encodeURIComponent(searchInput)}&page=0&size=10&sort=latest`,
      )
      .catch((error: AxiosError<SearchError>) => {
        if (error.response?.data) {
          throw new Error(error.response.data.message || '관련 후기가 존재하지 않습니다.');
        }
        throw new Error('관련 후기가 존재하지 않습니다.');
      });

    // 검색 성공시 최근 검색어 업데이트
    const updatedSearches = [newSearch, ...recentSearches]
      .filter((search, index, self) => index === self.findIndex((s) => s.text === search.text))
      .slice(0, 3);

    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));

    // 검색 성공시 페이지 이동
    navigate(`/review2?keyword=${encodeURIComponent(searchInput)}`);
  };

  const handleDelete = (index: number) => {
    const updatedSearches = recentSearches.filter((_item: SearchItem, i: number) => i !== index);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  return { recentSearches, handleSearch, handleDelete };
};
// export const useRecentSearches = (initialSearches: SearchItem[]) => {
//   const [recentSearches, setRecentSearches] = useState<SearchItem[]>(() => {
//     const saved = localStorage.getItem('recentSearches');
//     return saved ? JSON.parse(saved) : initialSearches;
//   });

//   const handleSearch = async (searchInput: string, navigate: NavigateFunction) => {
//     if (searchInput.trim()) {
//       const newSearch = {
//         text: searchInput,
//         date: new Date()
//           .toLocaleDateString('ko-KR', {
//             year: 'numeric',
//             month: '2-digit',
//             day: '2-digit',
//           })
//           .split(' ')
//           .join('')
//           .replace(/\./g, '')
//           .replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3'),
//       };

//       const updatedSearches = [newSearch, ...recentSearches].slice(0, 3);
//       setRecentSearches(updatedSearches);
//       localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));

//       // URL 파라미터로 검색어 전달
//       navigate(`/review2?keyword=${encodeURIComponent(searchInput)}`);
//     }
//   };

//   const handleDelete = (index: number) => {
//     const updatedSearches = recentSearches.filter((_item: SearchItem, i: number) => i !== index);
//     setRecentSearches(updatedSearches);
//     localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
//   };

//   return { recentSearches, handleSearch, handleDelete };
// };
