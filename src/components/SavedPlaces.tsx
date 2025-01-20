// SavedPlaces.tsx
import React from 'react';
import styled from 'styled-components';
import spaceIcon from '../assets/space-icon.png'; // 우주 아이콘 경로
import starIcon from '../assets/white-star.png'; // 별표 아이콘
import starFilledIcon from '../assets/star-filled.png'; // 꽉찬 별표 아이콘

interface RouteItem {
  id: number;
  title: string;
  address: string;
  isStarred?: boolean;
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

const IconContainer = styled.div`
  position: absolute;
  top: 75px;
  right: 430px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconImage = styled.img``;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
`;

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
  margin-bottom: 0px;
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
  font-weight: 600;
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

const RouteItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: #e9e2ff;
  margin-bottom: 8px;
  border-radius: 15px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0ff;
  }
`;

const RouteDetails = styled.div`
  display: flex;
  align-items: center;
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
  color: #000;
  font-family: 'Gothic A1';
  font-size: 24px;
  font-weight: 600;
`;

const RouteAddress = styled.span`
  font-family: 'Gothic A1';
  font-size: 20px;
  font-weight: 500;
  color: #000;
  margin-top: 4px;
`;

const StarIcon = styled.img``;

const SavedPlaces: React.FC = () => {
  const [routes, setRoutes] = React.useState<RouteItem[]>([
    {
      id: 1,
      title: '한신 고시엔 구장',
      address: '1-82 Koshiencho, Nishinomiya, Hyogo 663-8152 일본',
      isStarred: false,
    },
    {
      id: 2,
      title: '한신 고시엔 구장',
      address: '1-82 Koshiencho, Nishinomiya, Hyogo 663-8152 일본',
      isStarred: false,
    },
    {
      id: 3,
      title: '한신 고시엔 구장',
      address: '1-82 Koshiencho, Nishinomiya, Hyogo 663-8152 일본',
      isStarred: false,
    },
  ]);

  const [selectedRoute, setSelectedRoute] = React.useState<number | null>(null);
  const [showOnlyStarred, setShowOnlyStarred] = React.useState(false);

  // 선택 삭제 핸들러
  const handleDelete = () => {
    if (selectedRoute) {
      setRoutes(routes.filter((route) => route.id !== selectedRoute));
      setSelectedRoute(null);
    }
  };

  // 즐겨찾기 토글 핸들러
  const toggleStar = (id: number) => {
    setRoutes(
      routes.map((route) => (route.id === id ? { ...route, isStarred: !route.isStarred } : route)),
    );
  };

  // 필터링된 루트
  const filteredRoutes = showOnlyStarred ? routes.filter((route) => route.isStarred) : routes;

  return (
    <Container>
      <IconContainer>
        <IconImage src={spaceIcon} alt="Space Icon" />
      </IconContainer>

      <ContentWrapper>
        <Title>나의 좋아요</Title>

        <TabContainer>
          <Tab>저장한 루트</Tab>
          <Tab active>저장한 장소</Tab>
          <Tab>저장한 이벤트</Tab>
        </TabContainer>

        <RouteListContainer>
          <ListHeader>
            <ListTitle>저장한 장소 ({filteredRoutes.length})</ListTitle>
            <HeaderDivider />
            <ListActions>
              <button onClick={handleDelete}>선택 삭제</button>
              <span>/</span>
              <button onClick={() => setShowOnlyStarred(!showOnlyStarred)}>
                {showOnlyStarred ? '전체보기' : '즐겨찾기'}
              </button>
            </ListActions>
          </ListHeader>

          {filteredRoutes.map((route) => (
            <RouteItem key={route.id}>
              <RouteDetails>
                <RadioButton
                  checked={selectedRoute === route.id}
                  onClick={() => setSelectedRoute(route.id)}
                />
                <RouteTitle>{route.title}</RouteTitle>
                <StarIcon
                  src={route.isStarred ? starFilledIcon : starIcon}
                  alt={route.isStarred ? 'Starred' : 'Not starred'}
                  onClick={() => toggleStar(route.id)}
                />
              </RouteDetails>
              <RouteAddress>{route.address}</RouteAddress>
            </RouteItem>
          ))}
        </RouteListContainer>
      </ContentWrapper>
    </Container>
  );
};

export default SavedPlaces;
