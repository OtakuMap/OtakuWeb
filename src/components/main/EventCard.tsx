import React, { useState } from 'react';
import styled from 'styled-components';
import HeartEmptyIcon from '../../assets/heart-empty.png';
import HeartFilledIcon from '../../assets/heart-filled.png';
import { useLike } from '@/hooks/map/useLike';
import { useAppSelector } from '@/hooks/reduxHooks';

interface EventCardProps {
  id: number;
  thumbnail: { fileUrl: string };
  title: string;
  startDate: string;
  endDate: string;
  isLiked?: boolean;
  onClick: (id: number) => void;
}

const IPHONE_15_BREAKPOINT = '430px';

const EventCardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 100%;
    margin-bottom: 1rem;
  }
`;

const EventPosterWrapper = styled.div`
  position: relative;
  width: 199px;
  height: 208px;
  margin-bottom: 0.5rem;

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 100%;
    height: 160px;
  }
`;

const EventPoster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeartButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  z-index: 1;
  transition: transform 0.2s;

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    top: 5px;
    right: 5px;
  }

  &:hover {
    transform: scale(1.1);
  }
  &:focus {
    outline: none;
  }
`;

const HeartImage = styled.img`
  width: 24px;
  height: 24px;

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 20px;
    height: 20px;
  }
`;

const EventDetails = styled.div`
  text-align: center;

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 100%;
    padding: 0 5px;
  }
`;

const EventName = styled.h4`
  margin-bottom: 0.2rem;
  color: #fff;
  font-family: 'Gothic A1';
  font-size: 18px;
  font-weight: 600;

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    font-size: 14px;
    margin-bottom: 0.1rem;
    word-break: break-word;
  }
`;

const EventDates = styled.p`
  color: #fff;
  text-align: center;
  font-family: 'Gothic A1';
  font-size: 16px;
  font-weight: 600;

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    font-size: 12px;
  }
`;

const EventCard: React.FC<EventCardProps> = ({
  id,
  thumbnail,
  title,
  startDate,
  endDate,
  isLiked: initialIsLiked = false,
  onClick,
}) => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { isLiked, toggleLike, isLoading } = useLike({
    initialIsLiked,
    id,
    type: 'event',
  });

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike();
  };

  return (
    <EventCardContainer onClick={() => onClick(id)}>
      <EventPosterWrapper>
        <EventPoster src={thumbnail.fileUrl} alt={title} />
        <HeartButton onClick={handleHeartClick} disabled={isLoading}>
          <HeartImage
            src={isLoggedIn && isLiked ? HeartFilledIcon : HeartEmptyIcon}
            alt="Favorite"
            style={{ opacity: isLoading ? 0.5 : 1 }}
          />
        </HeartButton>
      </EventPosterWrapper>
      <EventDetails>
        <EventName>{title}</EventName>
        <EventDates>
          {startDate} - {endDate}
        </EventDates>
      </EventDetails>
    </EventCardContainer>
  );
};

export default EventCard;
