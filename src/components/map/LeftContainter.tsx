import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../../styles/map/LeftContainer.styles';
import Search from '../common/Search';
import BackButton from '../common/BackButton';
import { Place } from '@/types/map/place';
import { useFavoritePlaces } from '@/hooks/map/useFavoritePlaces';
import { useAppSelector } from '@/hooks/reduxHooks';

interface LeftContainerProps {
  onPlaceSelect?: (place: Place) => void;
}

// 임시 데이터들 - savedRoutes만 남기고 favoritePlaces는 제거
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

const LeftContainer: React.FC<LeftContainerProps> = ({ onPlaceSelect }) => {
  const navigate = useNavigate();
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [activeView, setActiveView] = useState<'none' | 'savedRoutes' | 'favoritePlaces'>('none');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const authState = useAppSelector((state) => state.auth);

  const { userId } = authState;
  const { favoritePlaces, isLoading, fetchFavoritePlaces } = useFavoritePlaces();

  // userId 변경시 로깅
  useEffect(() => {
    if (favoritePlaces.length > 0) {
      console.log('Received favorite places:', favoritePlaces);
      console.log('First place data structure:', favoritePlaces[0]);
    }
  }, [favoritePlaces]);

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

  // favoritePlaces 버튼 클릭 핸들러
  const handleFavoritePlacesClick = () => {
    const newView = activeView === 'favoritePlaces' ? 'none' : 'favoritePlaces';

    setActiveView(newView);

    if (newView === 'favoritePlaces') {
      if (!userId) {
        console.error('No userId available');
        return;
      }

      try {
        const userIdNumber = Number(userId);

        if (isNaN(userIdNumber)) {
          console.error('Invalid userId format');
          return;
        }

        console.log('Calling fetchFavoritePlaces with:', {
          userId: userIdNumber,
          lastId: 0,
          limit: 10,
        });

        fetchFavoritePlaces({
          userId: userIdNumber,
          lastId: 0,
          limit: 10,
        });
      } catch (error) {
        console.error('Error in handleFavoritePlacesClick:', error);
      }
    }
  };

  // 메인 콘텐츠 렌더링
  const renderMainContent = () => {
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
            {isLoading ? (
              <div>로딩 중...</div>
            ) : (
              favoritePlaces.map((place) => (
                <S.RecommendationItem
                  key={place.id}
                  onClick={() => handlePlaceClick(place)}
                  $isSelected={selectedPlace?.id === place.id}
                >
                  <S.RecommendationText>{place.name}</S.RecommendationText>
                </S.RecommendationItem>
              ))
            )}
          </S.RecommendationsContainer>
        );
      default:
        return null;
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
          onClick={handleFavoritePlacesClick}
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
