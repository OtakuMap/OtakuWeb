import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../../styles/map/LeftContainer.styles';
import Search from '../common/Search';
import BackButton from '../common/BackButton';
import { Place } from '@/types/map/place';

interface LeftContainerProps {
  onPlaceSelect?: (place: Place) => void;
}

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
    name: '아키하바라 애니메이션 센터',
    isSelected: false,
    latitude: 35.6995,
    longitude: 139.7711,
    animeName: '러브라이브!, 스테인즈 게이트',
    address: '도쿄도 치요다구 소토칸다 1-7-6 아키바UDX 4F',
    hashtags: ['아키하바라', '애니메이션', '피규어'],
    // 같은 위치의 다른 장소들
    relatedPlaces: [
      {
        id: 11,
        title: '무인양품 아키하바라',
        name: '무인양품 아키하바라',
        isSelected: false,
        latitude: 35.6995,
        longitude: 139.7711,
        animeName: '너의 이름은',
        address: '도쿄도 치요다구 소토칸다 1-7-6 아키바UDX 2F',
        hashtags: ['아키하바라', '무인양품', '성지순례'],
      },
      {
        id: 12,
        title: '아키하바라 게이머즈',
        name: '아키하바라 게이머즈',
        isSelected: false,
        latitude: 35.6995,
        longitude: 139.7711,
        animeName: '러키스타, 스테인즈 게이트',
        address: '도쿄도 치요다구 소토칸다 1-7-6 아키바UDX B1',
        hashtags: ['아키하바라', '게임', '피규어'],
      },
    ],
  },
  {
    id: 2,
    title: '나카노 브로드웨이',
    name: '나카노 브로드웨이',
    isSelected: false,
    latitude: 35.708,
    longitude: 139.665,
    animeName: '여러 작품',
    address: '도쿄도 나카노구 나카노 5-52-15',
    hashtags: ['나카노', '중고피규어', '레트로게임'],
    relatedPlaces: [], // 관련 장소 없음
  },
  {
    id: 3,
    title: '도에이 애니메이션 뮤지엄',
    name: '도에이 애니메이션 뮤지엄',
    isSelected: false,
    latitude: 35.6784,
    longitude: 139.6575,
    animeName: '원피스, 드래곤볼, 세일러문',
    address: '도쿄도 스기나미구 카미이구사 3-7-6',
    hashtags: ['도에이', '애니메이션', '뮤지엄'],
    relatedPlaces: [], // 관련 장소 없음
  },
];

const LeftContainer: React.FC<LeftContainerProps> = ({ onPlaceSelect }) => {
  const navigate = useNavigate();
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [activeView, setActiveView] = useState<'none' | 'savedRoutes' | 'favoritePlaces'>('none');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

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

  const handlePlaceClick = (place: Place) => {
    setSelectedPlace(place);
    if (onPlaceSelect) {
      onPlaceSelect(place);
    }
  };

  // 저장된 루트 클릭 처리 - 추후 사용예정
  // const handleSavedRouteClick = (routeId: number) => {
  //   navigate(`/route/${routeId}`);
  // };

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
              <S.RecommendationItem
                key={place.id}
                onClick={() => handlePlaceClick(place)}
                $isSelected={selectedPlace?.id === place.id}
              >
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
      <Search onSearch={handleSearch} onSuggestionSelect={(place) => handlePlaceClick(place)} />
      <S.ButtonContainer>
        <S.SavedRoutesButton
          isActive={activeView === 'savedRoutes'}
          onClick={() => setActiveView(activeView === 'savedRoutes' ? 'none' : 'savedRoutes')}
        >
          저장한 루트 보기
        </S.SavedRoutesButton>
        <S.FavoritePlacesButton
          isActive={activeView === 'favoritePlaces'}
          onClick={() => setActiveView(activeView === 'favoritePlaces' ? 'none' : 'favoritePlaces')}
        >
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