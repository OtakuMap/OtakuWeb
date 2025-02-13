import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../../styles/map/LeftContainer.styles';
import Search from '../common/MapSearch';
import BackButton from '../common/BackButton';
import { Place } from '@/types/map/place';
import { useFavoritePlaces } from '@/hooks/map/useFavoritePlaces';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/reduxHooks';
import { openLoginModal } from '@/store/slices/modalSlice';
import { RouteSource } from '@/types/map/routeSource';
import { useSavedRoutes } from '@/hooks/map/useSavedRoutes';
import { SearchSuggestion } from '@/hooks/map/useMapSearch';
import { useSearch } from '@/hooks/map/useMapSearch';
import searchDeleteIcon from '../../assets/search_delete.png';

interface LeftContainerProps {
  onPlaceSelect?: (place: Place) => void;
  onFavoritePlaceClick?: (placeId: number) => void;
}

const LeftContainer: React.FC<LeftContainerProps> = ({ onPlaceSelect, onFavoritePlaceClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { loadRecentSearches, saveRecentSearch, deleteRecentSearch } = useSearch();
  const [recentSearches, setRecentSearches] = useState<string[]>(() => loadRecentSearches());
  const [activeView, setActiveView] = useState<'none' | 'savedRoutes' | 'favoritePlaces'>('none');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const { favoritePlaces, isLoading, error, fetchFavoritePlaces } = useFavoritePlaces();
  const {
    savedRoutes,
    isLoading: savedRoutesLoading,
    error: savedRoutesError,
    fetchSavedRoutes,
  } = useSavedRoutes();

  // 컴포넌트 마운트 시 최근 검색어 로드
  useEffect(() => {
    setRecentSearches(loadRecentSearches());
  }, [loadRecentSearches]);

  // 데이터 로깅
  useEffect(() => {
    if (favoritePlaces.length > 0) {
      console.log('Received favorite places:', favoritePlaces);
      console.log('First place data structure:', favoritePlaces[0]);
    }
  }, [favoritePlaces]);

  // localStorage의 값이 외부에서 변경될 수 있으므로 동기화를 위한 이벤트 리스너 추가
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'recentSearches') {
        const saved = localStorage.getItem('recentSearches');
        setRecentSearches(saved ? JSON.parse(saved) : []);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // 뒤로가기 처리
  const handleBack = () => {
    window.history.back();
  };

  // // 검색 처리
  // const handleSearch = (value: string) => {
  //   if (!value.trim()) return;
  //   setRecentSearches((prev) => {
  //     const filtered = prev.filter((item) => item !== value);
  //     const updated = [...filtered, value];
  //     return updated.slice(-5);
  //   });
  // };

  // // 검색어 삭제
  // const handleDeleteSearch = (searchText: string) => {
  //   setRecentSearches((prev) => prev.filter((item) => item !== searchText));
  // };

  // Search 컴포넌트에서 suggestion 클릭 시 호출될 핸들러
  const handlePlaceSelect = (placeData: SearchSuggestion['data']) => {
    const searchText = `${placeData.selectedAnimation.animationName} - ${placeData.name}`;
    saveRecentSearch(searchText);
    setRecentSearches(loadRecentSearches()); // 즉시 상태 업데이트

    const place: Place = {
      id: placeData.placeId,
      title: placeData.name,
      name: placeData.name,
      isSelected: false,
      latitude: placeData.latitude,
      longitude: placeData.longitude,
      animeName: placeData.selectedAnimation.animationName,
      address: '',
      hashtags: placeData.selectedAnimation.hashTags.map((tag) => tag.name) || [],
    };

    if (onPlaceSelect) {
      onPlaceSelect(place);
    }
  };

  const handleEventSelect = (eventData: SearchSuggestion['data']) => {
    const searchText = `${eventData.animationTitle} - ${eventData.name}`;
    saveRecentSearch(searchText);
    setRecentSearches(loadRecentSearches()); // 즉시 상태 업데이트

    console.log('Event selected:', eventData);
  };

  // 검색어 삭제 처리
  const handleDeleteSearch = (searchText: string) => {
    deleteRecentSearch(searchText);
    setRecentSearches(loadRecentSearches()); // 즉시 상태 업데이트
  };

  // 일반 검색 처리
  const handleSearch = (value: string) => {
    if (!value.trim()) return;
    saveRecentSearch(value);
    setRecentSearches(loadRecentSearches()); // 즉시 상태 업데이트
  };

  // Place 타입을 처리하는 함수
  // const handleSearchPlaceSelect = (place: Place) => {
  //   setSelectedPlace(place);
  //   if (onPlaceSelect) {
  //     onPlaceSelect(place);
  //   }
  // };

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
        <S.DeleteButton onClick={onDelete}>
          <img src={searchDeleteIcon} alt="Delete" />
        </S.DeleteButton>
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

    const newView = activeView === 'savedRoutes' ? 'none' : 'savedRoutes';
    setActiveView(newView);

    if (newView === 'savedRoutes') {
      fetchSavedRoutes({
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

  const useCheckOverflow = (text: string) => {
    const textRef = useRef<HTMLSpanElement>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
      const checkOverflow = () => {
        if (textRef.current) {
          const isTextOverflowing = textRef.current.scrollHeight > textRef.current.clientHeight;
          setIsOverflowing(isTextOverflowing);
        }
      };

      checkOverflow();
      window.addEventListener('resize', checkOverflow);
      return () => window.removeEventListener('resize', checkOverflow);
    }, [text]);

    return { textRef, isOverflowing };
  };

  const RecommendationItemWithOverflow = ({
    text,
    onClick,
  }: {
    text: string;
    onClick: () => void;
  }) => {
    return (
      <S.RecommendationItem onClick={onClick} data-full-text={text}>
        <S.RecommendationText>{text}</S.RecommendationText>
      </S.RecommendationItem>
    );
  };

  // 메인 콘텐츠 렌더링
  const renderMainContent = () => {
    switch (activeView) {
      case 'savedRoutes':
        return (
          <S.RecommendationsContainer>
            {savedRoutesLoading ? (
              <div>로딩 중...</div>
            ) : savedRoutesError ? (
              <div>에러가 발생했습니다: {savedRoutesError.message}</div>
            ) : savedRoutes.length === 0 ? (
              <div>저장된 루트가 없습니다.</div>
            ) : (
              savedRoutes.map((route) => (
                <RecommendationItemWithOverflow
                  key={route.id}
                  text={route.name}
                  onClick={() =>
                    navigate(`/route/${route.routeId}`, {
                      state: {
                        routeSource: RouteSource.SAVED_ROUTE,
                      },
                    })
                  }
                />
              ))
            )}
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
                <RecommendationItemWithOverflow
                  key={place.id}
                  text={place.name}
                  onClick={() => handleFavoritePlaceClick(place.id)}
                />
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
      <Search
        onSearch={handleSearch}
        onPlaceSelect={handlePlaceSelect}
        onEventSelect={handleEventSelect}
      />
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
