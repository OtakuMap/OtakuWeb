import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import baseball from '../assets/baseball.png';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as S from '../styles/review/ReviewPage.style';
import { useSearchResults } from '../hooks/review/useSearchResult';

const ReviewPage2: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const [searchInput, setSearchInput] = useState(keyword);
  const { searchResults, loading, error } = useSearchResults(keyword);

  const handleSearch = () => {
    if (searchInput.trim()) {
      setSearchParams({ keyword: searchInput });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSortChange = (sort: 'latest' | 'views') => {
    setSearchParams((prev) => {
      prev.set('sort', sort);
      return prev;
    });
  };
  const handleReviewClick = (reviewId: number, type: string) => {
    navigate(`/review/${reviewId}?type=${type.toUpperCase()}`);
  };

  if (loading) return <div>검색 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <S.Container>
      <S.SearchBar>
        <S.SearchInput
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="검색어를 입력하세요"
        />
        <S.SearchButton onClick={handleSearch}>
          <FaSearch />
        </S.SearchButton>
      </S.SearchBar>

      <S.WhiteContainer>
        <S.Header>
          <S.BTitle>{keyword ? `'${keyword}' 검색 결과` : '전체 검색 결과'}</S.BTitle>
        </S.Header>
        <S.SortOptionsWrapper>
          <S.SortOptions>
            <span
              onClick={() => handleSortChange('latest')}
              style={{ cursor: 'pointer', marginRight: '10px' }}
            >
              최신순
            </span>
            {' / '}
            <span
              onClick={() => handleSortChange('views')}
              style={{ cursor: 'pointer', marginLeft: '10px' }}
            >
              조회순
            </span>
          </S.SortOptions>
        </S.SortOptionsWrapper>

        <S.BSectionTitle>후기 전체 &gt;</S.BSectionTitle>
        <S.ReviewList>
          {searchResults && searchResults.length > 0 ? (
            searchResults.map((review) => (
              <S.ReviewItem key={review.id}>
                <S.ReviewContent onClick={() => handleReviewClick(review.reviewId, review.type)}>
                  <S.ReviewTitle>{review.title}</S.ReviewTitle>
                  <S.ReviewText>{review.content}</S.ReviewText>
                </S.ReviewContent>
                <S.ReviewImageWrapper>
                  <S.ReviewImage src={review.reviewImage?.fileUrl || baseball} alt={review.title} />
                </S.ReviewImageWrapper>
              </S.ReviewItem>
            ))
          ) : (
            <S.NoResults>
              {keyword ? '검색 결과가 없습니다.' : '검색어를 입력해주세요.'}
            </S.NoResults>
          )}
        </S.ReviewList>
      </S.WhiteContainer>
    </S.Container>
  );
};

export default ReviewPage2;
