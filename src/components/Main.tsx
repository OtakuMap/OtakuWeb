import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../styles/like/route.style';
import MapIcon from '../assets/map.png';
import ReviewIcon from '../assets/review.png';
import EventIcon from '../assets/event.png';
import HeartIcon from '../assets/heart.png';
import EmptyHeartIcon from '../assets/heart-empty.png';
import FilledHeartIcon from '../assets/heart-filled.png';
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

const EventCard = ({ poster, name, dates, eventId }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleHeartClick = async (e) => {
    e.stopPropagation();
    try {
      const params = {
        name: name,
        eventId: eventId,
      };

      const response = await saveEventLike(params);
      if (response.isSuccess) {
        setIsFavorite(!isFavorite);
      } else {
        console.error('Failed to save event like:', response.message);
      }
    } catch (error) {
      console.error('Error saving event like:', error);
    }
  };

  return (
    <S.EventCardWrapper>
      <S.EventPosterContainer>
        <S.EventPoster src={poster} alt={name} />
        <S.HeartButton onClick={handleHeartClick}>
          <S.HeartImage src={isFavorite ? FilledHeartIcon : EmptyHeartIcon} alt="Favorite" />
        </S.HeartButton>
      </S.EventPosterContainer>
      <S.EventDetails>
        <S.EventName>{name}</S.EventName>
        <S.EventDates>{dates}</S.EventDates>
      </S.EventDetails>
    </S.EventCardWrapper>
  );
};

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

  const events = [
    { poster: event1, name: 'Event 1', dates: '2021.11.02 - 2022.01.12', eventId: '1' },
    { poster: event2, name: 'Event 2', dates: '2022.06.10 - 2022.08.26', eventId: '2' },
    { poster: event3, name: 'Event 3', dates: '2023.08.10 - 2024.08.26', eventId: '3' },
    { poster: event4, name: 'Event 4', dates: '2023.08.10 - 2024.08.26', eventId: '4' },
    { poster: event5, name: 'Event 5', dates: '2023.08.10 - 2024.08.26', eventId: '5' },
    { poster: event6, name: 'Event 6', dates: '2023.08.10 - 2024.08.26', eventId: '6' },
    { poster: event7, name: 'Event 7', dates: '2023.08.10 - 2024.08.26', eventId: '7' },
    { poster: event8, name: 'Event 8', dates: '2023.08.10 - 2024.08.26', eventId: '8' },
  ];

  const topReviews = [
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
    {
      image: conanImage,
      description: '유명한이 지금까지 코난한테 맞은 마취총 개수 아는사람',
    },
  ];

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
            {events.map((event, index) => (
              <EventCard
                key={index}
                poster={event.poster}
                name={event.name}
                dates={event.dates}
                eventId={event.eventId}
              />
            ))}
          </S.EventContainer>
        </S.EventSection>

        <S.Divider />

        <S.TopReviews>
          <S.SectionTitle>
            <S.Image src={sectionImage} alt="Section Icon" />
            조회수 TOP 7 여행 후기
          </S.SectionTitle>
          <S.ReviewGrid>
            {topReviews.map((review, index) => (
              <S.ReviewCard key={index}>
                <S.ImageWrapper src={review.image}>
                  <S.Rank>{index + 1}</S.Rank>
                </S.ImageWrapper>
                <S.Description>{review.description}</S.Description>
              </S.ReviewCard>
            ))}
          </S.ReviewGrid>
        </S.TopReviews>

        <S.Divider />

        <S.Footer>
          <p>INFO</p>
          <p>AMNIBUS STORE (MAGNET by SHIBUYA109 5F)</p>
          <p>Call: 03-3232-1234</p>
          <p>Mail: odc@wnewnet.com</p>
        </S.Footer>
      </S.Wrapper>
    </S.Container>
  );
};

export default Main;
