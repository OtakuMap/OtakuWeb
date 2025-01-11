import React, { useState } from 'react';
import * as S from '../../styles/map/LeftContainer.styles';
import Search from '../common/Search';
import { RecommendationItem } from '../../types/map/recommendation';

// 임시 데이터
const recommendationData: RecommendationItem[] = [
  {
    id: 1,
    title: '명탐정 코난 제로의 집행인 성지순례',
  },
  {
    id: 2,
    title: '하이큐 오렌지 코트 찾아가기',
  },
  {
    id: 3,
    title: '다이에이 고시엔 방문기',
  },
];

const LeftContainer = () => {
  // 최근 검색어를 관리하는 상태
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // 검색 처리
  const handleSearch = (value: string) => {
    if (!value.trim()) return;

    setRecentSearches((prev) => {
      // 이미 있는 검색어라면 제거
      const filtered = prev.filter((item) => item !== value);
      // 새 검색어를 앞에 추가하고 최대 5개만 유지
      return [value, ...filtered].slice(0, 5);
    });
  };

  // 검색어 삭제
  const handleDeleteSearch = (searchText: string) => {
    setRecentSearches((prev) => prev.filter((item) => item !== searchText));
  };

  const RecentSearchItem = ({ search, onDelete }: { search: string; onDelete: () => void }) => {
    const MAX_LENGTH = 15; // 원하는 최대 글자 수 설정

    const displayText = search.length > MAX_LENGTH ? `${search.slice(0, MAX_LENGTH)}...` : search;

    return (
      <S.RecentSearchItem>
        <S.DeleteButton onClick={onDelete} />
        <S.SearchText>{displayText}</S.SearchText>
      </S.RecentSearchItem>
    );
  };

  // 추천 항목 클릭 처리
  const handleRecommendationClick = (item: RecommendationItem) => {
    console.log('Selected recommendation:', item);
  };

  return (
    <S.Container>
      <Search onSearch={handleSearch} />
      <S.ButtonContainer>
        <S.SavedRoutesButton>저장한 루트 보기</S.SavedRoutesButton>
        <S.FavoritePlacesButton>찜한 장소 보기</S.FavoritePlacesButton>
      </S.ButtonContainer>
      <S.RecommendationsContainer>
        {recommendationData.map((item) => (
          <S.RecommendationItem key={item.id} onClick={() => handleRecommendationClick(item)}>
            <S.RecommendationText>{item.title}</S.RecommendationText>
          </S.RecommendationItem>
        ))}
      </S.RecommendationsContainer>
      <S.RecentSearchesTitle>최근 검색한 장소</S.RecentSearchesTitle>

      <S.RecentSearchesBox />
      <S.RecentSearchList>
        {recentSearches.map((search, index) => (
          <RecentSearchItem
            key={index}
            search={search}
            onDelete={() => handleDeleteSearch(search)}
          />
        ))}
      </S.RecentSearchList>
    </S.Container>
  );
};
export default LeftContainer;
