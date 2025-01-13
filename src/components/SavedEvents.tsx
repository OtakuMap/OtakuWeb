import React from 'react';
import styled from 'styled-components';
import spaceIcon from '../assets/space-icon.png'; // 우주 아이콘 경로
import eventImage1 from '../assets/eventImage1.png'; // 이벤트 이미지 1
import eventImage2 from '../assets/eventImage2.png'; // 이벤트 이미지 2
import eventImage3 from '../assets/eventImage3.png'; // 이벤트 이미지 3

interface EventItem {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
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
  font-size: 24px;
  color: #fff;
  margin: 50px 0 30px 0;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 0px;
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

const EventListContainer = styled.div`
  background: white;
  border-radius: 16px;
  margin-top: -3px;
  padding: 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

const EventCard = styled.div`
  background-color: #f8f7ff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const EventImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const EventDetails = styled.div`
  padding: 16px;
`;

const EventTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
`;

const EventCategory = styled.span`
  font-size: 12px;
  color: #666;
`;

const EventDate = styled.div`
  font-size: 12px;
  color: #999;
  margin-top: 4px;
`;

const StarButton = styled.button<{ isStarred?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.isStarred ? '#7B66FF' : '#DBDBFF')};
  font-size: 24px;
  padding: 8px;
  line-height: 1;
  position: absolute;
  top: 8px;
  right: 8px;
`;

const SavedEvents: React.FC = () => {
  const [events] = React.useState<EventItem[]>([
    {
      id: 1,
      title: '귀멸의 칼날 × 온천 콜라보',
      date: '2023.11.02 ~ 2024.02.12',
      category: '팝업 스토어 / 전시회 / 콜라보 카페',
      image: eventImage1,
      isStarred: true,
    },
    {
      id: 2,
      title: '카구야 님은 고백받고 싶어 × 콜라보',
      date: '2023.11.02 ~ 2024.02.12',
      category: '팝업 스토어 / 전시회 / 콜라보 카페',
      image: eventImage2,
      isStarred: false,
    },
    {
      id: 3,
      title: '러브라이브! × 콜라보 카페',
      date: '2023.11.02 ~ 2024.02.12',
      category: '팝업 스토어 / 전시회 / 콜라보 카페',
      image: eventImage3,
      isStarred: true,
    },
  ]);

  return (
    <Container>
      <IconContainer>
        <IconImage src={spaceIcon} alt="Space Icon" />
      </IconContainer>

      <ContentWrapper>
        <Title>나의 좋아요</Title>

        <TabContainer>
          <Tab>저장한 루트</Tab>
          <Tab>찜한 장소</Tab>
          <Tab active>저장한 이벤트</Tab>
        </TabContainer>

        <EventListContainer>
          <ListHeader>
            <ListTitle>저장한 이벤트 ({events.length})</ListTitle>
            <ListActions>
              <button>선택 삭제</button>
              <span>/</span>
              <button>즐겨찾기</button>
            </ListActions>
          </ListHeader>

          <EventGrid>
            {events.map((event) => (
              <EventCard key={event.id}>
                <EventImage src={event.image} alt={event.title} />
                <StarButton isStarred={event.isStarred}>★</StarButton>
                <EventDetails>
                  <EventTitle>{event.title}</EventTitle>
                  <EventCategory>{event.category}</EventCategory>
                  <EventDate>{event.date}</EventDate>
                </EventDetails>
              </EventCard>
            ))}
          </EventGrid>
        </EventListContainer>
      </ContentWrapper>
    </Container>
  );
};

export default SavedEvents;
