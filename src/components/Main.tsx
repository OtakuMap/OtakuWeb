import React from 'react';
import { useNavigate } from 'react-router-dom';
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
import conanImage from '../assets/conan.png';
import sectionImage from '../assets/1.png';
const Main = () => {
  const navigate = useNavigate();

  const handleMapClick = () => {
    navigate('/map');
  };

  const handleReviewClick = () => {
    navigate('/review1');
  };

  const handleEventClick = () => {
    navigate('/event');
  };

  const handleHeartClick = () => {
    navigate('/route-management');
  };

  return (
    <Container>
      <Wrapper>
        <Header>
          <img src={Logo} alt="Logo" />
        </Header>

        <DetailsSection>
          <DetailsContainer>
            <DetailsItem onClick={handleMapClick} style={{ cursor: 'pointer' }}>
              <img src={MapIcon} alt="Map" />
            </DetailsItem>
            <DetailsItem onClick={handleReviewClick} style={{ cursor: 'pointer' }}>
              <img src={ReviewIcon} alt="Review" />
            </DetailsItem>
            <DetailsItem onClick={handleEventClick} style={{ cursor: 'pointer' }}>
              <img src={EventIcon} alt="Event" />
            </DetailsItem>
            <DetailsItem onClick={handleHeartClick} style={{ cursor: 'pointer' }}>
              <img src={HeartIcon} alt="Heart" />
            </DetailsItem>
          </DetailsContainer>
        </DetailsSection>

        <Divider />

        <EventSection>
          <SectionTitle>
            <Image src={sectionImage} alt="Section Icon" />
            진행중인 인기 이벤트
          </SectionTitle>
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

        <Divider />

        <TopReviews>
          <SectionTitle>
            <Image src={sectionImage} alt="Section Icon" />
            조회수 TOP 7 여행 후기
          </SectionTitle>
          <ReviewGrid>
            {topReviews.map((review, index) => (
              <ReviewCard key={index}>
                <ImageWrapper src={review.image}>
                  <Rank>{index + 1}</Rank>
                </ImageWrapper>
                <Description>{review.description}</Description>
              </ReviewCard>
            ))}
          </ReviewGrid>
        </TopReviews>

        <Divider />

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
  font-weight: bold;
  margin-bottom: 0.2rem;
  color: #fff;
  font-family: 'Gothic A1';
  font-size: 18px;
  font-weight: 600;
`;

const EventDates = styled.p`
  color: #fff;
  text-align: center;
  font-family: 'Gothic A1';
  font-size: 16px;
  font-weight: 600;
`;

const DetailsSection = styled.section`
  margin-bottom: 2rem;
`;

// DetailsItem 스타일 업데이트
const DetailsItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  span {
    font-size: 0.9rem;
    text-align: center;
  }
`;

// 그 다음 DetailsContainer 정의
const DetailsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  position: relative;

  & > div:not(:last-child)::after {
    content: '';
    position: absolute;
    right: -1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 85px;
    background-color: #b8effd;
  }
`;

const topReviews = [
  {
    image: conanImage, // 이미지 경로를 직접 확인하세요.
    description: '유명한이 지금까지 코난한테 맞은 마취총 개수 아는사람',
  },
  {
    image: conanImage,
    description: '유명한이 지금까지 코난한테 맞은 마취총 개수 아는사람',
  },
  {
    image: conanImage,
    description: '유명한이 지금까지 코난한테 맞은 마취총 개수 아는사람',
  },
  {
    image: conanImage,
    description: '유명한이 지금까지 코난한테 맞은 마취총 개수 아는사람',
  },
];

const TopReviews = styled.div`
  width: 1200px;
  margin-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
`;

const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
`;

const ReviewCard = styled.div`
  background-color: #0c004b;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
`;

const Rank = styled.div`
  position: absolute;
  left: 10px;
  bottom: 10px;
  font-weight: bold;
  color: black;
  z-index: 10; /* 숫자가 그라데이션보다 위에 표시되도록 설정 */
  font-family: 'Gothic A1';
  font-size: 85px;
  font-weight: 600;
`;

const Description = styled.p`
  word-wrap: break-word;
  overflow-wrap: break-word;
  margin-top: 10px;
  color: #fff;
  text-align: center;
  font-family: 'Gothic A1';
  font-size: 22px;
  font-weight: 600;
`;

const ImageWrapper = styled.div<{ src: string }>`
  position: relative;
  display: inline-block;
  width: 100%;
  height: 200px; /* 적절한 높이 설정 */
  background-image: url(${(props) => props.src});
  background-size: cover; /* 배경 이미지 크기 맞추기 */
  background-position: center; /* 이미지 중앙 정렬 */
  border-radius: 8px; /* 모서리 둥글게 */
  overflow: hidden; /* 자식 요소가 범위를 벗어나지 않도록 함 */

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.7));
    border-radius: 8px; /* 모서리 둥글게 */
  }
`;

const SectionTitle = styled.h2`
  font-size: 28px; /* 글씨 크기 조정 */
  margin-bottom: 20px;
  text-align: left;
  margin-left: 20px;
  display: flex;
  align-items: center; /* 텍스트와 이미지를 세로로 가운데 정렬 */
  line-height: 1.5; /* 텍스트의 높이를 적절히 조정 */
  color: #fff;
  font-family: 'Gothic A1';
  font-size: 30px;
  font-weight: 800;
`;

const Image = styled.img`
  width: 25px; /* 이미지 크기 조정 */
  height: auto;
  margin-right: 15px; /* 이미지와 텍스트 간격 */
  vertical-align: middle; /* 텍스트와 이미지 높이 맞추기 */
  display: inline-block; /* 이미지가 텍스트와 같은 기준선에 오도록 설정 */
  align-self: center; /* 이미지가 텍스트와 세로로 정렬되도록 설정 */
`;

const Footer = styled.footer`
  color: #666;
  margin-top: 2rem;
  color: #fff;
  text-align: center;
  font-family: 'Gothic A1';
  font-size: 15px;
  font-weight: 300;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #464654;
  margin: 40px 0;
`;
