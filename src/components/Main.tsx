import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../styles/Main.styles';
import MapIcon from '../assets/map.png';
import ReviewIcon from '../assets/review.png';
import EventIcon from '../assets/event.png';
import HeartIcon from '../assets/heart.png';
import Logo from '../assets/banner1.png';
import sectionImage from '../assets/1.png';
import { useTopReviews } from '@/hooks/main/useTopReviews';
import { usePopularEvents } from '@/hooks/main/usePopularEvents';
import ReviewSlider from './ReviewSlider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Main = () => {
  const { data: reviews, isLoading, error } = useTopReviews();
  const { data: events, isLoading: eventsLoading, error: eventsError } = usePopularEvents();
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

  const handleEventCardClick = (eventId: number) => {
    navigate(`/event/${eventId}`);
  };

  const handleReviewItemClick = () => {
    navigate('/review5');
  };

  return (
    <S.Container>
      <S.Wrapper>
        <S.Header>
          <img src={Logo} alt="Logo" />
        </S.Header>

        <S.DetailsSection>
          <S.DetailsContainer>
            <S.DetailsItem onClick={handleMapClick} style={{ cursor: 'pointer' }}>
              <img src={MapIcon} alt="Map" />
            </S.DetailsItem>
            <S.DetailsItem onClick={handleReviewClick} style={{ cursor: 'pointer' }}>
              <img src={ReviewIcon} alt="Review" />
            </S.DetailsItem>
            <S.DetailsItem onClick={handleEventClick} style={{ cursor: 'pointer' }}>
              <img src={EventIcon} alt="Event" />
            </S.DetailsItem>
            <S.DetailsItem onClick={handleHeartClick} style={{ cursor: 'pointer' }}>
              <img src={HeartIcon} alt="Heart" />
            </S.DetailsItem>
          </S.DetailsContainer>
        </S.DetailsSection>

        <S.Divider />

        <S.EventSection>
          <S.SectionTitle>
            <S.Image src={sectionImage} alt="Section Icon" />
            진행중인 인기 이벤트
          </S.SectionTitle>
          <S.EventContainer>
            {eventsLoading ? (
              <div>Loading...</div>
            ) : eventsError ? (
              <div>Error loading events</div>
            ) : !events || events.length === 0 ? (
              <div>No events available</div>
            ) : (
              events.map((event) => (
                <S.EventCard
                  key={event.id}
                  onClick={() => handleEventCardClick(event.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <S.EventPoster src={event.thumbnail.fileUrl} alt={event.title} />
                  <S.EventDetails>
                    <S.EventName>{event.title}</S.EventName>
                    <S.EventDates>
                      {event.startDate} - {event.endDate}
                    </S.EventDates>
                  </S.EventDetails>
                </S.EventCard>
              ))
            )}
          </S.EventContainer>
        </S.EventSection>

        <S.Divider />

        <S.TopReviews>
          <S.SectionTitle>
            <S.Image src={sectionImage} alt="Section Icon" />
            조회수 TOP 7 여행 후기
          </S.SectionTitle>
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error loading reviews</div>
          ) : (
            <ReviewSlider reviews={reviews} onReviewClick={handleReviewItemClick} />
          )}
        </S.TopReviews>

        <S.Divider />

        <S.Footer>
          <p>INFO</p>
          <p>Insta: OTAKU_MAP</p>
          <p>Call: 010-3232-1234</p>
          <p>Mail: otaqu@naver.com</p>
        </S.Footer>
      </S.Wrapper>
    </S.Container>
  );
};

export default Main;
