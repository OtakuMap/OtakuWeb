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
import { LocationGroup } from '@/types/map/search';

interface LeftContainerProps {
  onPlaceSelect: (place: SearchSuggestion['data'], locationGroup: LocationGroup) => void;
  onEventSelect: (event: SearchSuggestion['data'], locationGroup: LocationGroup) => void;
  onFavoritePlaceClick: (placeId: number) => void;
}

const LeftContainer: React.FC<LeftContainerProps> = ({
  onPlaceSelect,
  onEventSelect,
  onFavoritePlaceClick,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loadRecentSearches, saveRecentSearch, deleteRecentSearch } = useSearch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => loadRecentSearches());
  const [activeView, setActiveView] = useState<'none' | 'savedRoutes' | 'favoritePlaces'>('none');
  // const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 430);
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 430);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setIsExpanded(false);
    }
  }, [isMobile]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

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
  const handlePlaceSelect = (
    placeData: SearchSuggestion['data'],
    locationGroup?: LocationGroup,
  ) => {
    const searchText = `${placeData.selectedAnimation.animationName} - ${placeData.name}`;
    saveRecentSearch(searchText);
    setRecentSearches(loadRecentSearches());

    if (onPlaceSelect) {
      onPlaceSelect(placeData, locationGroup);
    }
  };

  const handleEventSelect = (eventData: SearchSuggestion['data'], locationGroup: LocationGroup) => {
    const searchText = `${eventData.animationTitle} - ${eventData.name}`;
    saveRecentSearch(searchText);
    setRecentSearches(loadRecentSearches());

    if (onEventSelect) {
      onEventSelect(eventData, locationGroup); // locationGroup 추가
    }
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

  const RecentSearchItem = ({
    search,
    onDelete,
    onClick,
  }: {
    search: string;
    onDelete: () => void;
    onClick: () => void;
  }) => {
    const MAX_LENGTH = 15;
    const displayText = search.length > MAX_LENGTH ? `${search.slice(0, MAX_LENGTH)}...` : search;

    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation(); // 이벤트 버블링 방지
      onClick();
    };

    const handleDelete = (e: React.MouseEvent) => {
      e.stopPropagation(); // 이벤트 버블링 방지
      onDelete();
    };

    return (
      <S.RecentSearchItem onClick={handleClick}>
        <S.DeleteButton onClick={handleDelete}>
          <img src={searchDeleteIcon} alt="Delete" />
        </S.DeleteButton>
        <S.SearchText>{displayText}</S.SearchText>
      </S.RecentSearchItem>
    );
  };

  const handleRecentSearchClick = (search: string) => {
    // 대시(-)가 있는 경우 장소/이벤트 이름만 추출 (두번째 부분)
    const searchTerm = search.includes('-') ? search.split('-')[1].trim() : search;

    // 검색창에 장소/이벤트 이름 표시
    setSearchValue(searchTerm);
    // 검색 제안 표시 설정은 useEffect에서 처리됨
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
    <>
      {isMobile && (
        <S.SearchWrapper>
          <Search
            value={searchValue}
            onValueChange={setSearchValue}
            showSuggestions={showSuggestions}
            onShowSuggestionsChange={setShowSuggestions}
            onSearch={handleSearch}
            onPlaceSelect={handlePlaceSelect}
            onEventSelect={handleEventSelect}
          />
        </S.SearchWrapper>
      )}
      <S.Container ref={containerRef} className={isExpanded ? 'expanded' : ''}>
        {!isMobile && <BackButton onClick={handleBack} />}
        {!isMobile && (
          <Search
            value={searchValue}
            onValueChange={setSearchValue}
            showSuggestions={showSuggestions}
            onShowSuggestionsChange={setShowSuggestions}
            onSearch={handleSearch}
            onPlaceSelect={handlePlaceSelect}
            onEventSelect={handleEventSelect}
          />
        )}
        {isMobile && <S.HandleBar onClick={toggleExpand} />}
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
              onClick={() => handleRecentSearchClick(search)}
            />
          ))}
        </S.RecentSearchList>
      </S.Container>
    </>
  );
};

export default LeftContainer;
