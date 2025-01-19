import React, { useState } from 'react';
import styled from 'styled-components';
import starFilledIcon from '../assets/star-filled.png';
import starEmptyIcon from '../assets/white-star.png';
import spaceIcon from '../assets/space-icon.png';

interface RouteItem {
  id: number;
  title: string;
  author?: string;
  isStarred: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #0c004b;
  min-height: 100vh;
  padding: 40px;
  width: 100vw;
  position: relative;
`;

const ContentWrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
  width: 100%;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 80px;
  right: 50px;
  display: flex;
  align-items: center;
`;

const IconImage = styled.img`
  width: 48px;
  height: 48px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #fff;
  margin: 48px 0;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 8px;
  position: relative;
`;

const Tab = styled.button<{ active?: boolean }>`
  padding: 12px 24px;
  border: none;
  background-color: ${(props) => (props.active ? '#fff' : 'rgba(255, 255, 255, 0.2)')};
  color: ${(props) => (props.active ? '#0c004b' : '#fff')};
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
`;

const RouteListContainer = styled.div`
  margin-top: -15px;
  background: white;
  border-radius: 16px;
  padding: 24px 80px;
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ListTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  color: #333;
`;

const ListActions = styled.div`
  display: flex;
  gap: 8px;
  color: #666;
  font-size: 14px;

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: inherit;
    padding: 0;

    &:hover {
      color: #333;
    }
  }
`;

const RouteItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #f8f7ff;
  margin-bottom: 8px;
  border-radius: 12px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0ff;
  }
`;

const RadioButton = styled.div<{ checked: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid #7b66ff;
  border-radius: 50%;
  margin-right: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.checked ? '#7B66FF' : 'transparent')};

  &::after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: white;
    display: ${(props) => (props.checked ? 'block' : 'none')};
  }
`;

const RouteTitle = styled.span`
  flex: 1;
  color: #333;
  font-size: 14px;
`;

const StarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StarIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const RouteManagement: React.FC = () => {
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

  const filteredRoutes = showStarredOnly ? routes.filter((route) => route.isStarred) : routes;

  return (
    <Container>
      <ContentWrapper>
        <IconContainer>
          <IconImage src={spaceIcon} alt="Space Icon" />
        </IconContainer>

        <Title>나의 좋아요</Title>

        <TabContainer>
          <Tab active>저장한 루트</Tab>
          <Tab>저장한 장소</Tab>
          <Tab>저장한 이벤트</Tab>
        </TabContainer>

        <RouteListContainer>
          <ListHeader>
            <ListTitle>저장한 루트 ({filteredRoutes.length})</ListTitle>
            <ListActions>
              <button onClick={handleDeleteSelected}>선택 삭제</button>
              <span>/</span>
              <button onClick={handleShowStarredOnly}>
                {showStarredOnly ? '전체 보기' : '즐겨찾기'}
              </button>
            </ListActions>
          </ListHeader>

          {filteredRoutes.map((route) => (
            <RouteItemContainer key={route.id}>
              <RadioButton
                checked={selectedRoutes.includes(route.id)}
                onClick={() => handleRouteSelect(route.id)}
              />
              <RouteTitle>{route.title}</RouteTitle>
              <StarButton onClick={() => handleToggleStar(route.id)}>
                <StarIcon
                  src={route.isStarred ? starFilledIcon : starEmptyIcon}
                  alt={route.isStarred ? 'Starred' : 'Not starred'}
                />
              </StarButton>
            </RouteItemContainer>
          ))}
        </RouteListContainer>
      </ContentWrapper>
    </Container>
  );
};

export default RouteManagement;
