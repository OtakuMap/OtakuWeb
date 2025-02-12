import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '@/styles/like/routes.styles';
import starFilledIcon from '../assets/star-filled.png';
import starEmptyIcon from '../assets/white-star.png';
import spaceIcon from '../assets/space-icon.png';
import { RouteSource } from '@/types/map/routeSource';

interface RouteItem {
  id: number;
  title: string;
  author?: string;
  isStarred: boolean;
}

const RouteManagement: React.FC = () => {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState<RouteItem[]>([
    { id: 1, title: '오사카 굿즈샵 뿌시기', isStarred: false },
    { id: 2, title: '오사카 굿즈샵 뿌시기 오사카 굿즈샵 뿌시기', isStarred: false },
    {
      id: 3,
      title: '오사카 굿즈샵 뿌시기 오사카 굿즈샵 뿌시기 오사카 굿즈샵 뿌시기',
      isStarred: false,
    },
    { id: 4, title: '제목제목제목제목제목제목제목제목제목제목제목제목제목', isStarred: false },
    { id: 5, title: '제목제목제목제목제목제목제목제목제목제목제목제목제목', isStarred: false },
  ]);

  const [selectedRoutes, setSelectedRoutes] = useState<number[]>([]);
  const [showStarredOnly, setShowStarredOnly] = useState(false);

  const handleRouteSelect = (id: number) => {
    setSelectedRoutes((prev) =>
      prev.includes(id) ? prev.filter((routeId) => routeId !== id) : [...prev, id],
    );
  };

  const handleToggleStar = (id: number) => {
    setRoutes((prev) =>
      prev.map((route) => (route.id === id ? { ...route, isStarred: !route.isStarred } : route)),
    );
  };

  const handleDeleteSelected = () => {
    setRoutes((prev) => prev.filter((route) => !selectedRoutes.includes(route.id)));
    setSelectedRoutes([]);
  };

  const handleShowStarredOnly = () => {
    setShowStarredOnly((prev) => !prev);
  };

  const handleNavigateToSavedPlaces = () => {
    navigate('/saved-places');
  };

  const handleNavigateToSavedEvents = () => {
    navigate('/saved-events');
  };

  const filteredRoutes = showStarredOnly ? routes.filter((route) => route.isStarred) : routes;

  return (
    <S.Container>
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
            <S.ListTitle>저장한 루트 ({filteredRoutes.length})</S.ListTitle>
            <S.HeaderDivider />
            <S.ListActions>
              <button onClick={handleDeleteSelected}>선택 삭제</button>
              <span>/</span>
              <button onClick={handleShowStarredOnly}>
                {showStarredOnly ? '전체 보기' : '즐겨찾기'}
              </button>
            </S.ListActions>
          </S.ListHeader>

          {filteredRoutes.map((route) => (
            <S.RouteItemContainer key={route.id}>
              <S.RouteContent>
                <S.RadioButton
                  checked={selectedRoutes.includes(route.id)}
                  onClick={() => handleRouteSelect(route.id)}
                />
                <S.RouteTitle>{route.title}</S.RouteTitle>
                <S.ViewButton
                  onClick={() =>
                    navigate(`/route/${route.id}`, {
                      state: {
                        routeSource: RouteSource.LIKED_ROUTE,
                      },
                    })
                  }
                >
                  <span>지도에서 보기</span>
                </S.ViewButton>
                <span>|</span>
                <S.ViewButton>
                  <span>후기에서 보기</span>
                </S.ViewButton>
              </S.RouteContent>
              <S.StarButton onClick={() => handleToggleStar(route.id)}>
                <S.StarIcon
                  src={route.isStarred ? starFilledIcon : starEmptyIcon}
                  alt={route.isStarred ? 'Starred' : 'Not starred'}
                />
              </S.StarButton>
            </S.RouteItemContainer>
          ))}
        </S.RouteListContainer>
      </S.ContentWrapper>
    </S.Container>
  );
};

export default RouteManagement;
