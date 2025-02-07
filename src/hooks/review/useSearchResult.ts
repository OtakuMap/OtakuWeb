// hooks/review/useSearchResults.ts
import { useState, useEffect } from 'react';
import { searchReviews } from '../../api/review/search';
import { ReviewContent } from '../../types/review/search';

export const useSearchResults = (keyword: string) => {
  const [searchResults, setSearchResults] = useState<ReviewContent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!keyword) return;

      setLoading(true);
      try {
        const response = await searchReviews({
          keyword,
          page: 0,
          size: 10,
          sort: 'latest',
        });

        if (response.isSuccess) {
          setSearchResults(response.result.content);
        } else {
          setError('검색에 실패했습니다.');
        }
      } catch (err) {
        setError('검색 중 오류가 발생했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [keyword]);

  return { searchResults, loading, error };
};
