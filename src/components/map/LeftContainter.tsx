import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../../styles/map/LeftContainer.styles';
import Search from '../common/Search';
import BackButton from '../common/BackButton';
import { Place } from '@/types/map/place';
import { useFavoritePlaces } from '@/hooks/map/useFavoritePlaces';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/reduxHooks';
import { openLoginModal } from '@/store/slices/modalSlice';

interface LeftContainerProps {
  onPlaceSelect?: (place: Place) => void;
  onFavoritePlaceClick?: (placeId: number) => void;
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

const LeftContainer: React.FC<LeftContainerProps> = ({ onPlaceSelect, onFavoritePlaceClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [activeView, setActiveView] = useState<'none' | 'savedRoutes' | 'favoritePlaces'>('none');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const { favoritePlaces, isLoading, error, fetchFavoritePlaces } = useFavoritePlaces();

  // 데이터 로깅
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

  // Place 타입을 처리하는 함수
  const handleSearchPlaceSelect = (place: Place) => {
    setSelectedPlace(place);
    if (onPlaceSelect) {
      onPlaceSelect(place);
    }
  };

  // placeId를 처리하는 함수
  const handleFavoritePlaceClick = (placeId: number) => {
    if (onFavoritePlaceClick) {
      onFavoritePlaceClick(placeId);
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

  // 저장한 루트 보기 클릭 핸들러
  const handleSavedRoutesClick = () => {
    if (!isLoggedIn) {
      dispatch(openLoginModal());
      return;
    }
    setActiveView(activeView === 'savedRoutes' ? 'none' : 'savedRoutes');
  };

  // favoritePlaces 버튼 클릭 핸들러
  const handleFavoritePlacesClick = () => {
    if (!isLoggedIn) {
      dispatch(openLoginModal());
      return;
    }

    const newView = activeView === 'favoritePlaces' ? 'none' : 'favoritePlaces';
    setActiveView(newView);

    if (newView === 'favoritePlaces') {
      fetchFavoritePlaces({
        lastId: 0,
        limit: 10,
      }).catch((error) => {
        if (error.response?.status === 401) {
          alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
          navigate('/login');
        }
      });
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
            ) : error ? (
              <div>에러가 발생했습니다: {error.message}</div>
            ) : favoritePlaces.length === 0 ? (
              <div>저장된 장소가 없습니다.</div>
            ) : (
              favoritePlaces.map((place) => (
                <S.RecommendationItem
                  key={place.id}
                  onClick={() => handleFavoritePlaceClick(place.id)}
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
      <Search onSearch={handleSearch} onSuggestionSelect={handleSearchPlaceSelect} />
      <S.ButtonContainer>
        <S.SavedRoutesButton
          isActive={activeView === 'savedRoutes'}
          onClick={handleSavedRoutesClick}
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
