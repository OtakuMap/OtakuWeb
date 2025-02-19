import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import sectionImage from '../assets/1.png';
import deleteIcon from '../assets/X.png';
import conanImage from '../assets/conan.png';
import * as S from '../styles/review/ReviewPage.style';
import { useTopReviews } from '../hooks/main/useTopReviews';
import { useRecentSearches } from '../hooks/review/useRecentSearch';
import ReviewSlider from '@/components/main/ReviewSlider';

const ReviewPage1: React.FC = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [searchError, setSearchError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const { data: topReviews = [], isLoading, error } = useTopReviews();
  const { recentSearches, handleSearch, handleDelete } = useRecentSearches([
    { text: '검색어검색어', date: '2024.12.04' },
    { text: '검색어검색어', date: '2024.11.14' },
    { text: '검색어검색어', date: '2024.11.14' },
  ]);

  const handleReviewClick = (reviewId: string) => {
    navigate(`/review/${reviewId}`);
  };

  const handleSearchWithValidation = async (searchTerm: string) => {
    const trimmedSearch = searchTerm.trim();

    if (!trimmedSearch) {
      setSearchError('검색어를 입력해주세요');
      return;
    }

    setIsSearching(true);
    setSearchError('');

    try {
      await handleSearch(trimmedSearch, navigate);
    } catch (error: any) {
      // 404 에러 (검색 결과 없음) 처리
      if (error?.response?.status === 404) {
        setSearchError('검색된 후기가 없습니다.');
      } else {
        setSearchError('검색된 후기가 없습니다.');
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchWithValidation(searchInput);
    }
  };

  // const handleKeyPress = (e: React.KeyboardEvent) => {
  //   if (e.key === 'Enter') {
  //     handleSearch(searchInput, navigate);
  //   }
  // };

  return (
    <S.Container>
      <S.SearchWrapper>
        <S.SearchBarWrapper>
          <S.SearchInput
            placeholder="검색할 후기의 관련 키워드를 공백 없이 입력하세요."
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setSearchError(''); // 입력 시 에러 메시지 초기화
            }}
            onKeyPress={handleKeyPress}
            disabled={isSearching}
          />
          <S.SearchButton
            onClick={() => handleSearchWithValidation(searchInput)}
            disabled={isSearching}
          >
            <FaSearch />
          </S.SearchButton>
        </S.SearchBarWrapper>

        {/* 에러 메시지 표시 */}
        {searchError && <S.ErrorMessage>{searchError}</S.ErrorMessage>}

        {/* 검색 상태 표시 */}
        {isSearching && <S.LoadingText>검색 중...</S.LoadingText>}

        {/* 검색어가 없을 때 가이드 메시지 */}
        {!searchInput.trim() && !searchError && !isSearching && (
          <S.NoResults>관심있는 여행 후기를 검색해보세요!</S.NoResults>
        )}

        <S.RecentSearch>
          <S.Title>최근검색어</S.Title>
          <S.SearchList>
            {recentSearches.length > 0 ? (
              recentSearches.map((search, index) => (
                <S.SearchItem key={index}>
                  <S.DeleteButton onClick={() => handleDelete(index)}>
                    <S.DeleteIcon src={deleteIcon} alt="delete" />
                  </S.DeleteButton>
                  <S.SearchText
                    onClick={() => handleSearchWithValidation(search.text)}
                    style={{ cursor: 'pointer' }}
                  >
                    {search.text}
                  </S.SearchText>
                  <S.SearchDate>{search.date}</S.SearchDate>
                </S.SearchItem>
              ))
            ) : (
              <S.NoResults>최근 검색 기록이 없습니다.</S.NoResults>
            )}
          </S.SearchList>
        </S.RecentSearch>
      </S.SearchWrapper>

      <S.TopReviews>
        <S.SectionTitle>
          <S.Image src={sectionImage} alt="Section Icon" />
          조회수 TOP 7 여행 후기
        </S.SectionTitle>
        {isLoading ? (
          <div>로딩 중...</div>
        ) : (
          <ReviewSlider reviews={topReviews} onReviewClick={handleReviewClick} />
        )}
      </S.TopReviews>
    </S.Container>
    // <S.Container>
    //   <S.SearchWrapper>
    //     <S.SearchBarWrapper>
    //       <S.SearchInput
    //         placeholder="검색할 후기의 관련 키워드를 입력하세요"
    //         value={searchInput}
    //         onChange={(e) => setSearchInput(e.target.value)}
    //         onKeyPress={handleKeyPress}
    //       />
    //       <S.SearchButton onClick={() => handleSearch(searchInput, navigate)}>
    //         <FaSearch />
    //       </S.SearchButton>
    //     </S.SearchBarWrapper>
    //     <S.RecentSearch>
    //       <S.Title>최근검색어</S.Title>
    //       <S.SearchList>
    //         {recentSearches.map((search, index) => (
    //           <S.SearchItem key={index}>
    //             <S.DeleteButton onClick={() => handleDelete(index)}>
    //               <S.DeleteIcon src={deleteIcon} alt="delete" />
    //             </S.DeleteButton>
    //             <S.SearchText>{search.text}</S.SearchText>
    //             <S.SearchDate>{search.date}</S.SearchDate>
    //           </S.SearchItem>
    //         ))}
    //       </S.SearchList>
    //     </S.RecentSearch>
    //   </S.SearchWrapper>
    //   <S.TopReviews>
    //     <S.SectionTitle>
    //       <S.Image src={sectionImage} alt="Section Icon" />
    //       조회수 TOP 7 여행 후기
    //     </S.SectionTitle>
    //     {/* {error && <S.ErrorMessage>{error}</S.ErrorMessage>} */}
    //     <S.ReviewGrid>
    //       {/* {loading ? (
    //         <div>로딩 중...</div>
    //       ) : (
    //         topReviews.map((review, index) => (
    //           <S.ReviewCard key={review.id}>
    //             <S.ImageWrapper src={review?.reviewImage?.fileUrl || conanImage}>
    //               <S.Rank>{index + 1}</S.Rank>
    //             </S.ImageWrapper>
    //             <S.Description>{review.title}</S.Description>
    //           </S.ReviewCard>
    //         ))
    //       )} */}
    //     </S.ReviewGrid>
    //   </S.TopReviews>
    // </S.Container>
  );
};

export default ReviewPage1;
