import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import sectionImage from '../assets/1.png';
import deleteIcon from '../assets/X.png';
import conanImage from '../assets/conan.png';
import * as S from '../styles/review/ReviewPage.style';
import { useTopReviews } from '../hooks/review/useTopReviews';
import { useRecentSearches } from '../hooks/review/useRecentSearch';

// 가짜 데이터를 TopReview 타입에 맞게 변환
const fakeTopReviews = [
  {
    id: 1,
    title: '유명한이 지금까지 코난한테 맞은 마취총 개수 아는사람',
    reviewImage: {
      id: 1,
      uuid: 'temp-1',
      fileName: 'conan.png',
      fileUrl: conanImage,
    },
    view: 100,
  },
  {
    id: 2,
    title: '유명한이 지금까지 코난한테 맞은 마취총 개수 아는사람',
    reviewImage: {
      id: 2,
      uuid: 'temp-2',
      fileName: 'conan.png',
      fileUrl: conanImage,
    },
    view: 90,
  },
  {
    id: 3,
    title: '유명한이 지금까지 코난한테 맞은 마취총 개수 아는사람',
    reviewImage: {
      id: 3,
      uuid: 'temp-3',
      fileName: 'conan.png',
      fileUrl: conanImage,
    },
    view: 80,
  },
  {
    id: 4,
    title: '유명한이 지금까지 코난한테 맞은 마취총 개수 아는사람',
    reviewImage: {
      id: 4,
      uuid: 'temp-4',
      fileName: 'conan.png',
      fileUrl: conanImage,
    },
    view: 70,
  },
];

const ReviewPage1: React.FC = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');

  // const { topReviews, loading, error } = useTopReviews(fakeTopReviews);
  const { recentSearches, handleSearch, handleDelete } = useRecentSearches([
    { text: '검색어검색어', date: '2024.12.04' },
    { text: '검색어검색어', date: '2024.11.14' },
    { text: '검색어검색어', date: '2024.11.14' },
  ]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(searchInput, navigate);
    }
  };

  return (
    <S.Container>
      <S.SearchWrapper>
        <S.SearchBarWrapper>
          <S.SearchInput
            placeholder="검색할 후기의 관련 키워드를 입력하세요"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <S.SearchButton onClick={() => handleSearch(searchInput, navigate)}>
            <FaSearch />
          </S.SearchButton>
        </S.SearchBarWrapper>
        <S.RecentSearch>
          <S.Title>최근검색어</S.Title>
          <S.SearchList>
            {recentSearches.map((search, index) => (
              <S.SearchItem key={index}>
                <S.DeleteButton onClick={() => handleDelete(index)}>
                  <S.DeleteIcon src={deleteIcon} alt="delete" />
                </S.DeleteButton>
                <S.SearchText>{search.text}</S.SearchText>
                <S.SearchDate>{search.date}</S.SearchDate>
              </S.SearchItem>
            ))}
          </S.SearchList>
        </S.RecentSearch>
      </S.SearchWrapper>
      <S.TopReviews>
        <S.SectionTitle>
          <S.Image src={sectionImage} alt="Section Icon" />
          조회수 TOP 7 여행 후기
        </S.SectionTitle>
        {/* {error && <S.ErrorMessage>{error}</S.ErrorMessage>} */}
        <S.ReviewGrid>
          {/* {loading ? (
            <div>로딩 중...</div>
          ) : (
            topReviews.map((review, index) => (
              <S.ReviewCard key={review.id}>
                <S.ImageWrapper src={review?.reviewImage?.fileUrl || conanImage}>
                  <S.Rank>{index + 1}</S.Rank>
                </S.ImageWrapper>
                <S.Description>{review.title}</S.Description>
              </S.ReviewCard>
            ))
          )} */}
        </S.ReviewGrid>
      </S.TopReviews>
    </S.Container>
  );
};

export default ReviewPage1;
