import React from 'react';
import styled from 'styled-components';
import spaceIcon from '../assets/space-icon.png';
import starIcon from '../assets/circle-star.png';
import starFilledIcon from '../assets/circle-filled.png';
import eventImage1 from '../assets/one_piece.png';
import eventImage2 from '../assets/one_piece.png';
import eventImage3 from '../assets/one_piece.png';

interface EventItem {
  id: number;
  title: string;
  date: string;
  category: 'popup' | 'exhibition' | 'collab';
  image: string;
  isStarred: boolean;
  isSelected?: boolean;
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

const EventListContainer = styled.div`
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

const CategoryFilter = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`;

const CategoryButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border: none;
  background: none;
  color: ${(props) => (props.active ? '#333' : '#999')};
  font-weight: ${(props) => (props.active ? '600' : '400')};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #333;
  }
`;

const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

const EventCard = styled.div`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  position: relative;

  &:hover {
    transform: translateY(-4px);
  }
`;

const EventImageWrapper = styled.div`
  position: relative;
`;

const EventImage = styled.img``;

const Controls = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  z-index: 1;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 100%);
`;

const CheckboxContainer = styled.div<{ checked: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid #fff;
  border-radius: 4px;
  background-color: ${(props) => (props.checked ? '#7B66FF' : 'rgba(255, 255, 255, 0.3)')};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '✓';
    color: white;
    display: ${(props) => (props.checked ? 'block' : 'none')};
  }

  &:hover {
    background-color: ${(props) => (props.checked ? '#6B56EF' : 'rgba(255, 255, 255, 0.5)')};
  }
`;

const StarIconImage = styled.img`
  cursor: pointer;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.3));

  &:hover {
    transform: scale(1.1);
  }
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

const SavedEvents: React.FC = () => {
  const [events, setEvents] = React.useState<EventItem[]>([
    {
      id: 1,
      title: '귀멸의 칼날 × 온천 콜라보',
      date: '2023.11.02 ~ 2024.02.12',
      category: 'collab',
      image: eventImage1,
      isStarred: true,
    },
    {
      id: 2,
      title: '카구야 님은 고백받고 싶어 × 콜라보',
      date: '2023.11.02 ~ 2024.02.12',
      category: 'popup',
      image: eventImage2,
      isStarred: false,
    },
    {
      id: 3,
      title: '러브라이브! × 콜라보 카페',
      date: '2023.11.02 ~ 2024.02.12',
      category: 'exhibition',
      image: eventImage3,
      isStarred: true,
    },
  ]);

  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [showOnlyStarred, setShowOnlyStarred] = React.useState(false);
  const [selectedEvents, setSelectedEvents] = React.useState<number[]>([]);

  const handleToggleStar = (id: number) => {
    setEvents(
      events.map((event) => (event.id === id ? { ...event, isStarred: !event.isStarred } : event)),
    );
  };

  const handleToggleSelect = (id: number) => {
    setSelectedEvents((prev) =>
      prev.includes(id) ? prev.filter((eventId) => eventId !== id) : [...prev, id],
    );
  };

  const handleDeleteSelected = () => {
    setEvents(events.filter((event) => !selectedEvents.includes(event.id)));
    setSelectedEvents([]);
  };

  const filteredEvents = events.filter((event) => {
    if (showOnlyStarred && !event.isStarred) return false;
    if (selectedCategory !== 'all' && event.category !== selectedCategory) return false;
    return true;
  });

  return (
    <Container>
      <IconContainer>
        <IconImage src={spaceIcon} alt="Space Icon" />
      </IconContainer>

      <ContentWrapper>
        <Title>나의 좋아요</Title>

        <TabContainer>
          <Tab>저장한 루트</Tab>
          <Tab>저장한 장소</Tab>
          <Tab active>저장한 이벤트</Tab>
        </TabContainer>

        <EventListContainer>
          <ListHeader>
            <ListTitle>저장한 이벤트 ({filteredEvents.length})</ListTitle>
            <HeaderDivider />
            <ListActions>
              <button onClick={handleDeleteSelected}>선택 삭제</button>
              <span>/</span>
              <button onClick={() => setShowOnlyStarred(!showOnlyStarred)}>
                {showOnlyStarred ? '전체보기' : '즐겨찾기'}
              </button>
            </ListActions>
          </ListHeader>

          <CategoryFilter>
            <CategoryButton
              active={selectedCategory === 'all'}
              onClick={() => setSelectedCategory('all')}
            >
              전체
            </CategoryButton>
            <CategoryButton
              active={selectedCategory === 'popup'}
              onClick={() => setSelectedCategory('popup')}
            >
              팝업 스토어
            </CategoryButton>
            <CategoryButton
              active={selectedCategory === 'exhibition'}
              onClick={() => setSelectedCategory('exhibition')}
            >
              전시회
            </CategoryButton>
            <CategoryButton
              active={selectedCategory === 'collab'}
              onClick={() => setSelectedCategory('collab')}
            >
              콜라보 카페
            </CategoryButton>
          </CategoryFilter>

          <EventGrid>
            {filteredEvents.map((event) => (
              <EventCard key={event.id}>
                <EventImageWrapper>
                  <EventImage src={event.image} alt={event.title} />
                  <Controls>
                    <CheckboxContainer
                      checked={selectedEvents.includes(event.id)}
                      onClick={() => handleToggleSelect(event.id)}
                    />
                    <StarIconImage
                      src={event.isStarred ? starFilledIcon : starIcon}
                      alt={event.isStarred ? 'Starred' : 'Not starred'}
                      onClick={() => handleToggleStar(event.id)}
                    />
                  </Controls>
                </EventImageWrapper>
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
