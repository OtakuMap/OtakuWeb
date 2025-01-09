import React from 'react';
import styled from 'styled-components';

interface RouteItem {
  id: number;
  title: string;
  author?: string;
  isStarred?: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #0c004b;
  min-height: 100vh;
  padding: 40px;
  width: 100vw;
`;

const ContentWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #fff;
  margin: 50px 0 30px 0;
`;

const TabContainer = styled.div`
  position: relative;
  display: flex;
  gap: 8px;
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

const RouteItem = styled.div`
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
  font-size: 15px;
`;

const StarButton = styled.button<{ isStarred?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.isStarred ? '#7B66FF' : '#DBDBFF')};
  font-size: 24px;
  padding: 8px;
  line-height: 1;
`;

const RouteManagement: React.FC = () => {
  const [routes] = React.useState<RouteItem[]>([
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

  const [selectedRoute, setSelectedRoute] = React.useState<number | null>(null);

  return (
    <Container>
      <ContentWrapper>
        <Title>나의 좋아요</Title>

        <TabContainer>
          <Tab active>저장한 루트</Tab>
          <Tab>편한 장소</Tab>
          <Tab>저장한 이벤트</Tab>
        </TabContainer>

        <RouteListContainer>
          <ListHeader>
            <ListTitle>저장한 루트 (5)</ListTitle>
            <ListActions>
              <button>선택 삭제</button>
              <span>/</span>
              <button>즐겨찾기</button>
            </ListActions>
          </ListHeader>

          {routes.map((route) => (
            <RouteItem key={route.id}>
              <RadioButton
                checked={selectedRoute === route.id}
                onClick={() => setSelectedRoute(route.id)}
              />
              <RouteTitle>{route.title}</RouteTitle>
              <StarButton isStarred={route.isStarred}>★</StarButton>
            </RouteItem>
          ))}
        </RouteListContainer>
      </ContentWrapper>
    </Container>
  );
};

export default RouteManagement;
