import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import conanImage from '../assets/conan.png';
import sectionImage from '../assets/1.png';
import deleteIcon from '../assets/X.png';
import * as S from '../styles/review/ReviewPage.style';

interface SearchItem {
  text: string;
  date: string;
}

const ReviewPage1: React.FC = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [recentSearches, setRecentSearches] = useState<SearchItem[]>(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved
      ? JSON.parse(saved)
      : [
          { text: '검색어검색어', date: '2024.12.04' },
          { text: '검색어검색어', date: '2024.11.14' },
          { text: '검색어검색어', date: '2024.11.14' },
        ];
  });

  const handleSearch = () => {
    if (searchInput.trim()) {
      // 새로운 검색어를 최근 검색어 목록에 추가
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

      // localStorage에 저장
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));

      // ReviewPage2로 검색어와 함께 이동
      navigate('/review2', { state: { searchQuery: searchInput } });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleDelete = (index: number) => {
    const updatedSearches = recentSearches.filter((_item: SearchItem, i: number) => i !== index);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
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
          <S.SearchButton onClick={handleSearch}>
            <FaSearch />
          </S.SearchButton>
        </S.SearchBarWrapper>
        <S.RecentSearch>
          <S.Title>최근검색어</S.Title>
          <S.SearchList>
            {recentSearches.map((search: SearchItem, index: number) => (
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
        <S.ReviewGrid>
          {topReviews.map((review, index) => (
            <S.ReviewCard key={index}>
              <S.ImageWrapper src={review.image}>
                <S.Rank>{index + 1}</S.Rank>
              </S.ImageWrapper>
              <S.Description>{review.description}</S.Description>
            </S.ReviewCard>
          ))}
        </S.ReviewGrid>
      </S.TopReviews>
    </S.Container>
  );
};

const topReviews = [
  {
    image: conanImage, // 이미지 경로를 직접 확인하세요.
    description: '유명한이 지금까지 코난한테 맞은 마취총 개수 아는사람',
  },
  {
    image: conanImage,
    description: '유명한이 지금까지 코난한테 맞은 마취총 개수 아는사람',
  },
  {
    image: conanImage,
    description: '유명한이 지금까지 코난한테 맞은 마취총 개수 아는사람',
  },
  {
    image: conanImage,
    description: '유명한이 지금까지 코난한테 맞은 마취총 개수 아는사람',
  },
];

export default ReviewPage1;
