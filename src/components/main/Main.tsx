import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../../styles/Main.styles';
//import * as S from '../styles/like/route.style';
import MapIcon from '../../assets/map.png';
import ReviewIcon from '../../assets/review.png';
import EventIcon from '../../assets/event.png';
import HeartIcon from '../../assets/heart.png';
import EmptyHeartIcon from '../../assets/heart-empty.png';
import FilledHeartIcon from '../../assets/heart-filled.png';
import Logo from '../../assets/banner1.png';
import sectionImage from '../../assets/1.png';
import { useTopReviews } from '@/hooks/main/useTopReviews';
// import { usePopularEvents } from '@/hooks/main/usePopularEvents';
// import { useBanner } from '@/hooks/main/useBanner';
import ReviewSlider from './ReviewSlider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/reduxHooks';
import { openLoginModal } from '@/store/slices/modalSlice';

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  // events 데이터를 먼저 로드
  // const { data: events, isLoading: eventsLoading, error: eventsError } = usePopularEvents();

  // 기존 useTopReviews를 수정하는 대신, enabled 옵션을 hook에 전달
  const {
    data: reviews,
    isLoading,
    error,
  } = useTopReviews({
    //enabled: !!events, // events가 로드된 후에만 실행
  });

  // 마지막으로 banner 로드
  // const { data: banner } = useQuery(['banner'], getBanner, {
  //   enabled: !!reviews // reviews가 로드된 후에만 실행
  // });
  const [eventLikes, setEventLikes] = useState<{ [key: number]: boolean }>({});

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

  const handleReviewItemClick = () => {
    navigate('/review5');
  };

  return (
    <S.Container>
      <S.Wrapper>
        {/* <S.Header>
          {bannerLoading ? (
            <img src={Logo} alt="Logo" /> // 로딩 중에는 기본 로고 표시
          ) : banner?.result?.fileUrl ? (
            <img src={banner.result.fileUrl} alt="Banner" />
          ) : (
            <img src={Logo} alt="Logo" /> // API 응답이 없거나 실패한 경우 기본 로고 표시
          )}
        </S.Header> */}
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
          {/* <S.EventContainer>
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
                  style={{ cursor: 'pointer', position: 'relative' }}
                >
                  <S.EventPoster src={event.thumbnail.fileUrl} alt={event.title} />
                  <S.HeartButton
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isLoggedIn) {
                        dispatch(openLoginModal());
                      } else {
                        setEventLikes((prev) => ({
                          ...prev,
                          [event.id]: !prev[event.id],
                        }));
                      }
                    }}
                  >
                    <S.HeartImage
                      src={isLoggedIn && eventLikes[event.id] ? FilledHeartIcon : EmptyHeartIcon}
                      alt="Favorite"
                    />
                  </S.HeartButton>
                  <S.EventDetails>
                    <S.EventName>{event.title}</S.EventName>
                    <S.EventDates>
                      {event.startDate} - {event.endDate}
                    </S.EventDates>
                  </S.EventDetails>
                </S.EventCard>
              ))
            )}
          </S.EventContainer> */}
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
