import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../../styles/Main.styles';
//import * as S from '../styles/like/route.style';
import MapIcon from '../../assets/map.png';
import ReviewIcon from '../../assets/review.png';
import EventIcon from '../../assets/event.png';
import HeartIcon from '../../assets/heart.png';
// import EmptyHeartIcon from '../../assets/heart-empty.png';
// import FilledHeartIcon from '../../assets/heart-filled.png';
import Logo from '../../assets/banner1.png';
import sectionImage from '../../assets/1.png';
import EventCard from './EventCard';
import { useTopReviews } from '@/hooks/main/useTopReviews';
import { usePopularEvents } from '@/hooks/main/usePopularEvents';
// import { useBanner } from '@/hooks/main/useBanner';
import ReviewSlider from './ReviewSlider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/reduxHooks';
import { openLoginModal } from '@/store/slices/modalSlice';
import { getRandomBanner } from '@/constants/banner';

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  // const { data: events, isLoading: eventsLoading, error: eventsError } = usePopularEvents();
  // const { data: reviews, isLoading: reviewsLoading, error: reviewsError } = useTopReviews();
  // const { data: banner, isLoading: bannerLoading, error: bannerError } = useBanner();

  // 컴포넌트 마운트 시 랜덤 배너 선택
  const [currentBanner, setCurrentBanner] = useState(getRandomBanner());

  // 에러 핸들링을 위한 상태
  const [bannerError, setBannerError] = useState(false);

  // 배너 데이터
  // const { data: banner, isLoading: bannerLoading, isSuccess: bannerSuccess } = useBanner();

  // 이벤트 데이터
  const {
  //  data: events,
  //  isLoading: eventsLoading,
  //  isSuccess: eventsSuccess,
  //  error: eventsError,
  //} = usePopularEvents();

  // 리뷰 데이터 (이벤트 로드 완료 후)
  //const {
  //  data: reviews,
 //   isLoading: reviewsLoading,
  //  error: reviewsError,
 // } = useTopReviews({
  //  enabled: eventsSuccess,
 // });

  const handleMapClick = () => {
    navigate('/map');
  };

  const handleReviewClick = () => {
    navigate('/review1');
  };

  const handleEventClick = () => {
    navigate('/category');
  };

  const handleHeartClick = () => {
    if (!isLoggedIn) {
      dispatch(openLoginModal());
      return;
    }
    navigate('/route-management');
  };

  const handleEventCardClick = (eventId: number) => {
    navigate(`/event/${eventId}`);
  };

  const handleReviewItemClick = (reviewId: string) => {
    navigate(`/review/${reviewId}`);
  };

  return (
    <S.Container>
      <S.Wrapper>
      <S.Header>
        <img
          src={bannerError ? Logo : currentBanner.fileUrl}
          alt="Banner"
          onError={() => {
            setBannerError(true);
            console.error('Banner image failed to load:', currentBanner.fileUrl);
          }}
        />
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
            {/* {eventsLoading ? (
              <div>Loading...</div>
            ) : eventsError ? (
              <div>Error loading events</div>
            ) : !events || events.length === 0 ? (
              <div>No events available</div>
            ) : (
              events.map((event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  thumbnail={event.thumbnail}
                  title={event.title}
                  startDate={event.startDate}
                  endDate={event.endDate}
                  isLiked={event.isLiked}
                  onClick={handleEventCardClick}
                />
              ))
            )} */}
          </S.EventContainer>
        </S.EventSection>

        <S.Divider />

        <S.TopReviews>
          <S.SectionTitle>
            <S.Image src={sectionImage} alt="Section Icon" />
            조회수 TOP 7 여행 후기
          </S.SectionTitle>
          {/* {reviewsLoading ? (
            <div>Loading...</div>
          ) : reviewsError ? (
            <div>Error loading reviews</div>
          ) : (
            <ReviewSlider
              reviews={reviews}
              onReviewClick={handleReviewItemClick} // 이 부분이 변경됨
            />
          )} */}
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
