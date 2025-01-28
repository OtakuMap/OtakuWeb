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

const IconImage = styled.img``;

const Title = styled.h1`
  color: #fff;
  font-family: 'Gothic A1';
  font-size: 38px;
  font-weight: 600;
  margin: 48px 0;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 8px;
  position: relative;
`;

const Tab = styled.button<{ active?: boolean }>`
  width: 194px;
  height: 82px;
  border: none;
  background-color: ${(props) => (props.active ? '#fff' : '#CCC')};
  color: ${(props) => (props.active ? '#000' : '#464654')};
  border-radius: 20px 20px 0px 0px;
  cursor: pointer;
  text-align: center;
  font-family: 'Gothic A1';
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const RouteListContainer = styled.div`
  background: white;
  border-radius: 0px 20px 20px 20px;
  padding: 24px 80px;
`;

const ListHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const ListTitle = styled.h2`
  color: #000;
  font-family: 'Gothic A1';
  font-size: 30px;
  font-weight: 700;
`;

const HeaderDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #464654;
  margin: 16px 0;
`;

const ListActions = styled.div`
  display: flex;
  gap: 8px;
  color: #666;
  font-size: 14px;
  margin-left: 630px;

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

// 새로운 스타일 컴포넌트 추가
const RouteContent = styled.div`
  display: flex;
  align-items: center;
  width: 879px;
  height: 56px;
  flex: 1;
  background-color: #e9e2ff;
  padding: 16px;
  border-radius: 15px;
  margin-bottom: 55px;
  color: #000;
  text-align: center;
  font-family: 'Gothic A1';
  font-size: 20px;
  font-weight: 600;
  &:hover {
    background-color: #f0f0ff;
  }
`;

// RouteItemContainer 수정
const RouteItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px; // 내용물과 별표 사이의 간격
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

// StarButton 수정
const StarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px; // 왼쪽 여백 추가
  margin-bottom: 55px;
`;

const StarIcon = styled.img`
  margin-right: 64px;
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
            <HeaderDivider />
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
              <RouteContent>
                <RadioButton
                  checked={selectedRoutes.includes(route.id)}
                  onClick={() => handleRouteSelect(route.id)}
                />
                <RouteTitle>{route.title}</RouteTitle>
              </RouteContent>
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
