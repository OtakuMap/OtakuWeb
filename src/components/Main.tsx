import React from 'react';
import styled from 'styled-components';
import MapIcon from '../assets/map.png';
import ReviewIcon from '../assets/review.png';
import EventIcon from '../assets/event.png';
import HeartIcon from '../assets/heart.png';
import Logo from '../assets/banner1.png';
import event1 from '../assets/demon_slayer.png';
import event2 from '../assets/demon_slayer.png';
import event3 from '../assets/demon_slayer.png';
import event4 from '../assets/demon_slayer.png';
import event5 from '../assets/demon_slayer.png';
import event6 from '../assets/demon_slayer.png';
import event7 from '../assets/demon_slayer.png';
import event8 from '../assets/demon_slayer.png';

const Main = () => {
  return (
    <Container>
      <Wrapper>
        <Header>
          <img src={Logo} alt="Logo" />
        </Header>

        <DetailsSection>
          <DetailsContainer>
            <DetailsItem>
              <img src={MapIcon} alt="Time" />
            </DetailsItem>
            <DetailsItem>
              <img src={ReviewIcon} alt="Ticket" />
            </DetailsItem>
            <DetailsItem>
              <img src={EventIcon} alt="Heart" />
            </DetailsItem>
            <DetailsItem>
              <img src={HeartIcon} alt="Chart" />
            </DetailsItem>
          </DetailsContainer>
        </DetailsSection>

        <EventSection>
          <EventTitle>진행중인 인기 이벤트</EventTitle>
          <EventContainer>
            <EventCard>
              <EventPoster src={event1} alt="Event 1" />
              <EventDetails>
                <EventName>Event 1</EventName>
                <EventDates>2021.11.02 - 2022.01.12</EventDates>
              </EventDetails>
            </EventCard>
            <EventCard>
              <EventPoster src={event2} alt="Event 2" />
              <EventDetails>
                <EventName>Event 2</EventName>
                <EventDates>2022.06.10 - 2022.08.26</EventDates>
              </EventDetails>
            </EventCard>
            <EventCard>
              <EventPoster src={event3} alt="Event 3" />
              <EventDetails>
                <EventName>Event 3</EventName>
                <EventDates>2023.08.10 - 2024.08.26</EventDates>
              </EventDetails>
            </EventCard>
            <EventCard>
              <EventPoster src={event4} alt="Event 4" />
              <EventDetails>
                <EventName>Event 4</EventName>
                <EventDates>2023.08.10 - 2024.08.26</EventDates>
              </EventDetails>
            </EventCard>
            <EventCard>
              <EventPoster src={event5} alt="Event 5" />
              <EventDetails>
                <EventName>Event 5</EventName>
                <EventDates>2023.08.10 - 2024.08.26</EventDates>
              </EventDetails>
            </EventCard>
            <EventCard>
              <EventPoster src={event6} alt="Event 6" />
              <EventDetails>
                <EventName>Event 6</EventName>
                <EventDates>2023.08.10 - 2024.08.26</EventDates>
              </EventDetails>
            </EventCard>
            <EventCard>
              <EventPoster src={event7} alt="Event 7" />
              <EventDetails>
                <EventName>Event 7</EventName>
                <EventDates>2023.08.10 - 2024.08.26</EventDates>
              </EventDetails>
            </EventCard>
            <EventCard>
              <EventPoster src={event8} alt="Event 8" />
              <EventDetails>
                <EventName>Event 8</EventName>
                <EventDates>2023.08.10 - 2024.08.26</EventDates>
              </EventDetails>
            </EventCard>
          </EventContainer>
        </EventSection>

        <Footer>
          <p>INFO</p>
          <p>AMNIBUS STORE (MAGNET by SHIBUYA109 5F)</p>
          <p>Call: 03-3232-1234</p>
          <p>Mail: odc@wnewnet.com</p>
        </Footer>
      </Wrapper>
    </Container>
  );
};

export default Main;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #0c004b;
  min-height: 100vh;
  padding: 20px;
  color: #fff;
  width: 100vw;
  overflow-y: auto;
  position: relative; /* 추가: 아이콘 위치 지정용 */
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #0c004b;
  color: #333;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-top: 1rem;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: normal;
    margin-top: 0.5rem;
  }

  img {
    width: 1280px;
  }
`;

const EventSection = styled.section`
  margin-bottom: 2rem;
`;

const EventTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const EventContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
`;

const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EventPoster = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 0.5rem;
`;

const EventDetails = styled.div`
  text-align: center;
`;

const EventName = styled.h4`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.2rem;
`;

const EventDates = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const DetailsSection = styled.section`
  margin-bottom: 2rem;
`;

const DetailsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const DetailsItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  span {
    font-size: 0.9rem;
    text-align: center;
  }
`;

const Footer = styled.footer`
  text-align: center;
  font-size: 0.8rem;
  color: #666;
  margin-top: 2rem;
`;
