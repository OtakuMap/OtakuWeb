import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../../styles/map/LeftContainer.styles';
import Search from '../common/Search';
import BackButton from '../common/BackButton';

// 임시 데이터들
const savedRoutesData = [
  {
    id: 1,
    title: '도쿄 애니메이션 성지순례 코스',
  },
  {
    id: 2,
    title: '오사카 하이큐 성지순례',
  },
  {
    id: 3,
    title: '요코하마 원피스 투어',
  },
];

const favoritePlacesData = [
  {
    id: 1,
    title: '아키하바라 애니메이션 센터',
  },
  {
    id: 2,
    title: '나카노 브로드웨이',
  },
  {
    id: 3,
    title: '도에이 애니메이션 뮤지엄',
  },
];

const LeftContainer = () => {
  const navigate = useNavigate();
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [activeView, setActiveView] = useState<'none' | 'savedRoutes' | 'favoritePlaces'>('none');

  // 뒤로가기 처리
  const handleBack = () => {
    window.history.back();
  };

  // 검색 처리
  const handleSearch = (value: string) => {
    if (!value.trim()) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item !== value);
      const updated = [...filtered, value];
      return updated.slice(-5);
    });
  };

  // 검색어 삭제
  const handleDeleteSearch = (searchText: string) => {
    setRecentSearches((prev) => prev.filter((item) => item !== searchText));
  };

  // 저장된 루트 클릭 처리
  const handleSavedRouteClick = (routeId: number) => {
    navigate(`/route/${routeId}`);
  };

  const RecentSearchItem = ({ search, onDelete }: { search: string; onDelete: () => void }) => {
    const MAX_LENGTH = 15;
    const displayText = search.length > MAX_LENGTH ? `${search.slice(0, MAX_LENGTH)}...` : search;
    return (
      <S.RecentSearchItem>
        <S.DeleteButton onClick={onDelete} />
        <S.SearchText>{displayText}</S.SearchText>
      </S.RecentSearchItem>
    );
  };

  // 메인 콘텐츠 렌더링
  const renderMainContent = () => {
    //추후 라우팅 경로 수정 - 뒤에 id 넣는 방식으로
    switch (activeView) {
      case 'savedRoutes':
        return (
          <S.RecommendationsContainer>
            {savedRoutesData.map((route) => (
              <S.RecommendationItem key={route.id} onClick={() => navigate('/route')}>
                <S.RecommendationText>{route.title}</S.RecommendationText>
              </S.RecommendationItem>
            ))}
          </S.RecommendationsContainer>
        );
      case 'favoritePlaces':
        return (
          <S.RecommendationsContainer>
            {favoritePlacesData.map((place) => (
              <S.RecommendationItem key={place.id} onClick={() => navigate('/route')}>
                <S.RecommendationText>{place.title}</S.RecommendationText>
              </S.RecommendationItem>
            ))}
          </S.RecommendationsContainer>
        );
      default:
        return null; //기본 상태에서는 아무것도 표시하지 않음
    }
  };

  return (
    <S.Container>
      <BackButton onClick={handleBack} />
      <Search onSearch={handleSearch} />
      <S.ButtonContainer>
        <S.SavedRoutesButton onClick={() => setActiveView('savedRoutes')}>
          저장한 루트 보기
        </S.SavedRoutesButton>
        <S.FavoritePlacesButton onClick={() => setActiveView('favoritePlaces')}>
          저장한 장소 보기
        </S.FavoritePlacesButton>
      </S.ButtonContainer>
      {renderMainContent()}
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
