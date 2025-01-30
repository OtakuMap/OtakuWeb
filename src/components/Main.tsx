import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../styles/Main.styles';
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
// import conanImage from '../assets/conan.png';
import sectionImage from '../assets/1.png';
import { useTopReviews } from '@/hooks/main/useTopReviews';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// const topReviews = [
//   {
//     image: conanImage,
//     description: '유명한이 지금까지 코난한테 맞은 마취총 개수 아는사람',
//   },
//   {
//     image: conanImage,
//     description: '유명한이 지금까지 코난한테 맞은 마취총 개수 아는사람',
//   },
//   {
//     image: conanImage,
//     description: '유명한이 지금까지 코난한테 맞은 마취총 개수 아는사람',
//   },
//   {
//     image: conanImage,
//     description: '유명한이 지금까지 코난한테 맞은 마취총 개수 아는사람',
//   },
//   {
//     image: conanImage,
//     description: '유명한이 지금까지 코난한테 맞은 마취총 개수 아는사람',
//   },
//   {
//     image: conanImage,
//     description: '유명한이 지금까지 코난한테 맞은 마취총 개수 아는사람',
//   },
//   {
//     image: conanImage,
//     description: '유명한이 지금까지 코난한테 맞은 마취총 개수 아는사람',
//   },
// ];

const Main = () => {
  const { data: reviews, isLoading, error } = useTopReviews();
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
            <S.EventCard>
              <S.EventPoster src={event1} alt="Event 1" />
              <S.EventDetails>
                <S.EventName>Event 1</S.EventName>
                <S.EventDates>2021.11.02 - 2022.01.12</S.EventDates>
              </S.EventDetails>
            </S.EventCard>
            <S.EventCard>
              <S.EventPoster src={event2} alt="Event 2" />
              <S.EventDetails>
                <S.EventName>Event 2</S.EventName>
                <S.EventDates>2022.06.10 - 2022.08.26</S.EventDates>
              </S.EventDetails>
            </S.EventCard>
            <S.EventCard>
              <S.EventPoster src={event3} alt="Event 3" />
              <S.EventDetails>
                <S.EventName>Event 3</S.EventName>
                <S.EventDates>2023.08.10 - 2024.08.26</S.EventDates>
              </S.EventDetails>
            </S.EventCard>
            <S.EventCard>
              <S.EventPoster src={event4} alt="Event 4" />
              <S.EventDetails>
                <S.EventName>Event 4</S.EventName>
                <S.EventDates>2023.08.10 - 2024.08.26</S.EventDates>
              </S.EventDetails>
            </S.EventCard>
            <S.EventCard>
              <S.EventPoster src={event5} alt="Event 5" />
              <S.EventDetails>
                <S.EventName>Event 5</S.EventName>
                <S.EventDates>2023.08.10 - 2024.08.26</S.EventDates>
              </S.EventDetails>
            </S.EventCard>
            <S.EventCard>
              <S.EventPoster src={event6} alt="Event 6" />
              <S.EventDetails>
                <S.EventName>Event 6</S.EventName>
                <S.EventDates>2023.08.10 - 2024.08.26</S.EventDates>
              </S.EventDetails>
            </S.EventCard>
            <S.EventCard>
              <S.EventPoster src={event7} alt="Event 7" />
              <S.EventDetails>
                <S.EventName>Event 7</S.EventName>
                <S.EventDates>2023.08.10 - 2024.08.26</S.EventDates>
              </S.EventDetails>
            </S.EventCard>
            <S.EventCard>
              <S.EventPoster src={event8} alt="Event 8" />
              <S.EventDetails>
                <S.EventName>Event 8</S.EventName>
                <S.EventDates>2023.08.10 - 2024.08.26</S.EventDates>
              </S.EventDetails>
            </S.EventCard>
          </S.EventContainer>
        </S.EventSection>

        <S.Divider />

        <S.TopReviews>
          <S.SectionTitle>
            <S.Image src={sectionImage} alt="Section Icon" />
            조회수 TOP 7 여행 후기
          </S.SectionTitle>
          <S.ReviewSlider>
            {isLoading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error loading reviews</div>
            ) : (
              <Slider
                dots={true}
                infinite={true}
                speed={500}
                slidesToShow={4}
                slidesToScroll={1}
                arrows={false}
                responsive={[
                  {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 1,
                    },
                  },
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 1,
                    },
                  },
                  {
                    breakpoint: 480,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                    },
                  },
                ]}
              >
                {reviews?.map((review, index) => (
                  <S.ReviewCard key={review.id}>
                    <S.ImageWrapper src={review.reviewImage.fileUrl}>
                      <S.Rank>{index + 1}</S.Rank>
                    </S.ImageWrapper>
                    <S.Description>{review.title}</S.Description>
                  </S.ReviewCard>
                ))}
              </Slider>
            )}
          </S.ReviewSlider>
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
