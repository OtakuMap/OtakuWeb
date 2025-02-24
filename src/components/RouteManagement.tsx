import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '@/styles/like/routes.styles';
import starFilledIcon from '../assets/star-filled.png';
import starEmptyIcon from '../assets/white-star.png';
import spaceIcon from '../assets/space-icon.png';
import { RouteSource } from '@/types/map/routeSource';
import { getRouteLikes } from '@/api/like/route-like';
import { updateRouteFavorite } from '@/api/like/favorite-route';
import { deleteRoutes } from '@/api/like/delete-route';
import { RouteLike } from '@/types/like/route-like';
import { tokenStorage } from '@/utils/token';

const RouteManagement: React.FC = () => {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState<RouteLike[]>([]);
  const [selectedRoutes, setSelectedRoutes] = useState<number[]>([]);
  const [showStarredOnly, setShowStarredOnly] = useState(false);
  const [lastId, setLastId] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRoutes = async (isFavorite?: boolean) => {
    try {
      setIsLoading(true);
      const response = await getRouteLikes({
        isFavorite,
        lastId: lastId,
        limit: 10,
      });

      if (response.isSuccess) {
        if (lastId === 0) {
          // 첫 페이지일 경우 새로운 데이터로 교체
          setRoutes(response.result.routeLikes);
        } else {
          // 페이지네이션일 경우 중복 체크 후 추가
          setRoutes((prev) => {
            const newRoutes = response.result.routeLikes.filter(
              (newRoute) => !prev.some((existingRoute) => existingRoute.id === newRoute.id),
            );
            return [...prev, ...newRoutes];
          });
        }
        setLastId(response.result.lastId);
        setHasNext(response.result.hasNext);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        alert('로그인이 필요한 서비스입니다.');
        navigate('/login');
      } else {
        console.error('Failed to fetch routes:', error);
        alert('루트 목록을 불러오는데 실패했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 더 보기 핸들러 추가
  const handleLoadMore = () => {
    if (hasNext && !isLoading) {
      fetchRoutes(showStarredOnly ? true : undefined);
    }
  };

  // 중복 ID 체크를 위한 디버깅 useEffect
  useEffect(() => {
    const idCounts = routes.reduce(
      (acc, route) => {
        acc[route.id] = (acc[route.id] || 0) + 1;
        return acc;
      },
      {} as Record<number, number>,
    );

    const duplicates = Object.entries(idCounts)
      .filter(([_, count]) => count > 1)
      .map(([id]) => id);

    if (duplicates.length > 0) {
      console.warn('Duplicate route ids found:', duplicates);
    }
  }, [routes]);

  useEffect(() => {
    setLastId(0);
    fetchRoutes(showStarredOnly ? true : undefined);
  }, [showStarredOnly]);

  const handleToggleFavorite = async (routeLikeId: number, currentFavorite: boolean) => {
    try {
      const response = await updateRouteFavorite(routeLikeId, !currentFavorite);
      if (response.isSuccess) {
        if (showStarredOnly) {
          if (currentFavorite) {
            setRoutes((prev) => prev.filter((route) => route.id !== routeLikeId));
          }
        } else {
          setRoutes((prev) =>
            prev.map((route) =>
              route.id === routeLikeId ? { ...route, isFavorite: !currentFavorite } : route,
            ),
          );
        }
      }
    } catch (error) {
      if (error.response?.status === 401) {
        alert('로그인이 필요한 서비스입니다.');
        navigate('/login');
      } else {
        console.error('Failed to update favorite status:', error);
        alert('즐겨찾기 상태 변경에 실패했습니다.');
      }
    }
  };

  const handleRouteSelect = (id: number) => {
    setSelectedRoutes((prev) =>
      prev.includes(id) ? prev.filter((routeId) => routeId !== id) : [...prev, id],
    );
  };

  const handleShowStarredOnly = () => {
    setShowStarredOnly((prev) => !prev);
    setSelectedRoutes([]); // 선택된 항목 초기화
    setLastId(0); // 페이지네이션 초기화
  };

  const handleNavigateToSavedPlaces = () => {
    navigate('/saved-places');
  };

  const handleNavigateToSavedEvents = () => {
    navigate('/saved-events');
  };

  const handleNavigateToReview = (reviewId: number, type: string) => {
    navigate(`/review/${reviewId}?type=${type.toUpperCase()}`);
  };

  const handleDeleteSelected = async () => {
    if (selectedRoutes.length === 0) return;

    try {
      const token = tokenStorage.getAccessToken();
      if (!token) {
        alert('로그인이 필요한 서비스입니다.');
        navigate('/login');
        return;
      }

      const confirmDelete = window.confirm('선택한 루트를 삭제하시겠습니까?');
      if (!confirmDelete) return;

      const response = await deleteRoutes(selectedRoutes);

      if (response.isSuccess) {
        setRoutes((prev) => prev.filter((route) => !selectedRoutes.includes(route.id)));
        setSelectedRoutes([]);
        alert('선택한 루트가 삭제되었습니다.');

        // 목록 새로고침
        setLastId(0);
        fetchRoutes(showStarredOnly ? true : undefined);
      }
    } catch (error) {
      console.error('Failed to delete routes:', error);
      if (error.response?.status === 401) {
        alert('로그인이 필요한 서비스입니다.');
        navigate('/login');
      } else {
        alert('루트 삭제에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <S.Container>
      <S.HorizontalDivider />
      <S.ContentWrapper>
        <S.IconContainer>
          <S.IconImage src={spaceIcon} alt="Space Icon" />
        </S.IconContainer>

        <S.Title>나의 좋아요</S.Title>

        <S.TabContainer>
          <S.Tab active>저장한 루트</S.Tab>
          <S.Tab onClick={handleNavigateToSavedPlaces}>저장한 장소</S.Tab>
          <S.Tab onClick={handleNavigateToSavedEvents}>저장한 이벤트</S.Tab>
        </S.TabContainer>

        <S.RouteListContainer>
          <S.ListHeader>
            <S.ListTitle>
              {showStarredOnly ? '즐겨찾기한 루트' : '저장한 루트'} ({routes.length})
            </S.ListTitle>
            <S.HeaderDivider />
            <S.ListActions>
              <button
                onClick={handleDeleteSelected}
                disabled={selectedRoutes.length === 0}
                data-active={selectedRoutes.length > 0}
              >
                선택 삭제
              </button>
              <span>/</span>
              <button onClick={handleShowStarredOnly} data-active={showStarredOnly}>
                {showStarredOnly ? '전체 보기' : '즐겨찾기'}
              </button>
            </S.ListActions>
          </S.ListHeader>

          {routes.map((route) => (
            <S.RouteItemContainer key={route.id}>
              <S.RouteContent>
                <S.RadioButton
                  checked={selectedRoutes.includes(route.id)}
                  onClick={() => handleRouteSelect(route.id)}
                />
                <S.RouteTitle>{route.name}</S.RouteTitle>
                <S.ViewButton
                  onClick={() =>
                    navigate(`/route/${route.routeId}`, {
                      state: {
                        routeSource: RouteSource.LIKED_ROUTE,
                      },
                    })
                  }
                >
                  <span>지도에서 보기 </span>
                </S.ViewButton>
                <S.ViewButton onClick={() => handleNavigateToReview(route.reviewId, route.type)}>
                  <span>후기에서 보기</span>
                </S.ViewButton>
              </S.RouteContent>
              <S.StarButton onClick={() => handleToggleFavorite(route.id, route.isFavorite)}>
                <S.StarIcon
                  src={route.isFavorite ? starFilledIcon : starEmptyIcon}
                  alt={route.isFavorite ? 'Starred' : 'Not starred'}
                />
              </S.StarButton>
            </S.RouteItemContainer>
          ))}

          {hasNext && !isLoading && (
            <S.LoadMoreButton onClick={handleLoadMore}>더 보기</S.LoadMoreButton>
          )}
          {isLoading && <S.LoadingIndicator>로딩 중...</S.LoadingIndicator>}
        </S.RouteListContainer>
      </S.ContentWrapper>
    </S.Container>
  );
};

export default RouteManagement;
