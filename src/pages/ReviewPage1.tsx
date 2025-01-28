import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import conanImage from '../assets/conan.png';
import sectionImage from '../assets/1.png';
import deleteIcon from '../assets/X.png';

const DeleteIcon = styled.img`
  width: 12px;
  height: 12px;
  cursor: pointer;
`;

const ImageWrapper = styled.div<{ src: string }>`
  position: relative;
  display: inline-block;
  width: 100%;
  height: 200px; /* 적절한 높이 설정 */
  background-image: url(${(props) => props.src});
  background-size: cover; /* 배경 이미지 크기 맞추기 */
  background-position: center; /* 이미지 중앙 정렬 */
  border-radius: 8px; /* 모서리 둥글게 */
  overflow: hidden; /* 자식 요소가 범위를 벗어나지 않도록 함 */

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.7));
    border-radius: 8px; /* 모서리 둥글게 */
  }
`;

const SectionTitle = styled.h2`
  font-size: 28px; /* 글씨 크기 조정 */
  margin-bottom: 20px;
  text-align: left;
  margin-left: 20px;
  display: flex;
  align-items: center; /* 텍스트와 이미지를 세로로 가운데 정렬 */
  line-height: 1.5; /* 텍스트의 높이를 적절히 조정 */
`;

const Image = styled.img`
  width: 25px; /* 이미지 크기 조정 */
  height: auto;
  margin-right: 15px; /* 이미지와 텍스트 간격 */
  vertical-align: middle; /* 텍스트와 이미지 높이 맞추기 */
  display: inline-block; /* 이미지가 텍스트와 같은 기준선에 오도록 설정 */
  align-self: center; /* 이미지가 텍스트와 세로로 정렬되도록 설정 */
`;

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
    <Container>
      <SearchWrapper>
        <SearchBarWrapper>
          <SearchInput
            placeholder="검색할 후기의 관련 키워드를 입력하세요"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <SearchButton onClick={handleSearch}>
            <FaSearch />
          </SearchButton>
        </SearchBarWrapper>
        <RecentSearch>
          <Title>최근검색어</Title>
          <SearchList>
            {recentSearches.map((search: SearchItem, index: number) => (
              <SearchItem key={index}>
                <DeleteButton onClick={() => handleDelete(index)}>
                  <DeleteIcon src={deleteIcon} alt="delete" />
                </DeleteButton>
                <SearchText>{search.text}</SearchText>
                <SearchDate>{search.date}</SearchDate>
              </SearchItem>
            ))}
          </SearchList>
        </RecentSearch>
      </SearchWrapper>
      <TopReviews>
        <SectionTitle>
          <Image src={sectionImage} alt="Section Icon" />
          조회수 TOP 7 여행 후기
        </SectionTitle>
        <ReviewGrid>
          {topReviews.map((review, index) => (
            <ReviewCard key={index}>
              <ImageWrapper src={review.image}>
                <Rank>{index + 1}</Rank>
              </ImageWrapper>
              <Description>{review.description}</Description>
            </ReviewCard>
          ))}
        </ReviewGrid>
      </TopReviews>
    </Container>
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

const Container = styled.div`
  background-color: #0c004b; /* 일관된 배경색 설정 */
  color: white;
  font-family: 'Arial', sans-serif;
  padding: 20px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* 상단 정렬로 변경 */
  overflow-y: auto; /* 세로 스크롤 추가 */
  margin-top: 60px;
`;

const SearchWrapper = styled.div`
  width: 671px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const RecentSearch = styled.div`
  width: 671px;
  margin-top: 20px;
`;

const TopReviews = styled.div`
  width: 1200px;
  margin-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 20px; /* 둥근 검색창 */
  width: 100%;
  height: 100%;
`;

const SearchInput = styled.input`
  border: none;
  padding: 10px;
  padding-left: 20px; /* 왼쪽 여백을 추가하여 placeholder 왼쪽으로 이동 */
  width: 100%;
  font-size: 14px;
  border-radius: 20px;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  padding: 10px;
  color: #0c004b;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
  padding-bottom: 15px; /* 밑줄과 텍스트 간 간격 조정 */
  border-bottom: 2px solid rgba(255, 255, 255, 0.5);
`;

const SearchList = styled.ul`
  list-style: none;
  padding: 0;
  background-color: #0c004b;
`;

const SearchItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  background-color: #0c004b;
  padding: 10px;
  border-radius: 4px;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
`;

const SearchText = styled.span`
  flex-grow: 1;
  margin-left: 10px;
`;

const SearchDate = styled.span`
  font-size: 12px;
  color: white;
`;

const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
`;

const ReviewCard = styled.div`
  background-color: #0c004b;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
`;

const Rank = styled.div`
  position: absolute;
  left: 10px;
  bottom: 10px;
  font-size: 40px; /* 숫자 크기 키우기 */
  font-weight: bold;
  color: black;
  z-index: 10; /* 숫자가 그라데이션보다 위에 표시되도록 설정 */
`;

const Description = styled.p`
  font-size: 18.5px;
  font-weight: bold; /* 글씨를 두껍게 */
  word-wrap: break-word;
  overflow-wrap: break-word;
  margin-top: 10px;
`;

export default ReviewPage1;
