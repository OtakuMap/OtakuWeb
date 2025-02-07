import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import spaceIcon from '../assets/space-icon.png';
import starIcon from '../assets/circle-star.png';
import starFilledIcon from '../assets/circle-filled.png';
import { getEventLikes } from '@/api/like/event-like';
import { deleteEvents } from '@/api/like/delete-events';
import { toggleEventFavorite } from '@/api/like/favorite-events';
import { EventLike, EventType } from '@/types/like/event-like';
import * as S from '@/styles/like/events.styles';

const SavedEvents: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventLike[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const [showOnlyStarred, setShowOnlyStarred] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<number[]>([]);
  const [lastId, setLastId] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState<number | null>(null);

  const fetchEvents = async (reset = false) => {
    try {
      setIsLoading(true);
      const newLastId = reset ? 0 : lastId;
      const response = await getEventLikes({
        type: selectedCategory,
        isFavorite: showOnlyStarred,
        lastId: newLastId,
        limit: 10,
      });

      if (response.isSuccess) {
        setEvents((prev) =>
          reset ? response.result.eventLikes : [...prev, ...response.result.eventLikes],
        );
        setLastId(response.result.lastId);
        setHasMore(response.result.hasNext);
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(true);
  }, [selectedCategory, showOnlyStarred]);

  const handleToggleStar = async (event: EventLike, e: React.MouseEvent) => {
    e.stopPropagation();

    if (isTogglingFavorite === event.id) return; // 이미 처리 중인 경우 중복 요청 방지

    try {
      setIsTogglingFavorite(event.id);
      const response = await toggleEventFavorite(event.id, !event.isFavorite);

      if (response.isSuccess) {
        setEvents((prevEvents) =>
          prevEvents.map((e) => (e.id === event.id ? { ...e, isFavorite: !e.isFavorite } : e)),
        );

        // 즐겨찾기 목록을 보고 있을 때 즐겨찾기 해제하면 해당 항목 제거
        if (showOnlyStarred && event.isFavorite) {
          setEvents((prevEvents) => prevEvents.filter((e) => e.id !== event.id));
        }
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    } finally {
      setIsTogglingFavorite(null);
    }
  };

  const handleCardClick = (id: number) => {
    setSelectedEvents((prev) =>
      prev.includes(id) ? prev.filter((eventId) => eventId !== id) : [...prev, id],
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedEvents.length === 0 || isDeleting) return;

    try {
      setIsDeleting(true);
      const response = await deleteEvents(selectedEvents);

      if (response.isSuccess) {
        setEvents((prev) => prev.filter((event) => !selectedEvents.includes(event.id)));
        setSelectedEvents([]);
      } else {
        console.error('Failed to delete events:', response.message);
      }
    } catch (error) {
      console.error('Error deleting events:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const getEventTypeLabel = (type: EventType) => {
    switch (type) {
      case 'POPUP_STORE':
        return '팝업 스토어';
      case 'EXHIBITION':
        return '전시회';
      case 'COLLAB_CAFE':
        return '콜라보 카페';
      default:
        return '';
    }
  };

  const handleNavigateToRouteManagement = () => {
    navigate('/route-management');
  };

  const handleNavigateToSavedPlaces = () => {
    navigate('/saved-places');
  };

  return (
    <S.Container>
      <S.IconContainer>
        <S.IconImage src={spaceIcon} alt="Space Icon" />
      </S.IconContainer>

      <S.ContentWrapper>
        <S.Title>나의 좋아요</S.Title>

        <S.TabContainer>
          <S.Tab onClick={handleNavigateToRouteManagement}>저장한 루트</S.Tab>
          <S.Tab onClick={handleNavigateToSavedPlaces}>저장한 장소</S.Tab>
          <S.Tab active>저장한 이벤트</S.Tab>
        </S.TabContainer>

        <S.EventListContainer>
          <S.ListHeader>
            <S.ListTitle>저장한 이벤트 ({events.length})</S.ListTitle>
            <S.HeaderDivider />
            <S.ListActions>
              <button
                onClick={handleDeleteSelected}
                style={{
                  color: selectedEvents.length > 0 ? '#7B66FF' : 'inherit',
                  cursor: selectedEvents.length > 0 ? 'pointer' : 'default',
                  opacity: isDeleting ? 0.5 : 1,
                }}
                disabled={isDeleting}
              >
                {isDeleting ? '삭제중...' : '선택 삭제'}
              </button>
              <span>/</span>
              <button
                onClick={() => {
                  setShowOnlyStarred(!showOnlyStarred);
                  setSelectedEvents([]); // 필터 변경 시 선택 초기화
                }}
                style={{
                  color: showOnlyStarred ? '#7B66FF' : 'inherit',
                }}
              >
                {showOnlyStarred ? '전체보기' : '즐겨찾기'}
              </button>
            </S.ListActions>
          </S.ListHeader>

          <S.CategoryFilter>
            <S.CategoryButton
              active={!selectedCategory}
              onClick={() => setSelectedCategory(undefined)}
            >
              전체
            </S.CategoryButton>
            <S.CategoryButton
              active={selectedCategory === 1}
              onClick={() => setSelectedCategory(1)}
            >
              팝업 스토어
            </S.CategoryButton>
            <S.CategoryButton
              active={selectedCategory === 2}
              onClick={() => setSelectedCategory(2)}
            >
              전시회
            </S.CategoryButton>
            <S.CategoryButton
              active={selectedCategory === 3}
              onClick={() => setSelectedCategory(3)}
            >
              콜라보 카페
            </S.CategoryButton>
          </S.CategoryFilter>

          <S.EventGrid>
            {events.map((event) => (
              <S.EventCard
                key={event.id}
                isSelected={selectedEvents.includes(event.id)}
                onClick={() => handleCardClick(event.id)}
              >
                <S.EventImageWrapper>
                  <S.EventImage src={event.thumbnail} alt={event.name} />
                  <S.Controls>
                    <S.StarIconImage
                      src={event.isFavorite ? starFilledIcon : starIcon}
                      alt={event.isFavorite ? 'Starred' : 'Not starred'}
                      onClick={(e) => handleToggleStar(event, e)}
                      style={{
                        opacity: isTogglingFavorite === event.id ? 0.5 : 1,
                        cursor: isTogglingFavorite === event.id ? 'default' : 'pointer',
                      }}
                    />
                  </S.Controls>
                </S.EventImageWrapper>
                <S.EventDetails>
                  <S.EventTitle>{event.name}</S.EventTitle>
                  <S.EventCategory>{getEventTypeLabel(event.eventType)}</S.EventCategory>
                  <S.EventDate>{`${event.startDate} ~ ${event.endDate}`}</S.EventDate>
                </S.EventDetails>
              </S.EventCard>
            ))}
          </S.EventGrid>

          {hasMore && !isLoading && (
            <S.LoadMoreButton onClick={() => fetchEvents(false)}>더 보기</S.LoadMoreButton>
          )}
          {isLoading && <S.LoadingText>Loading...</S.LoadingText>}
        </S.EventListContainer>
      </S.ContentWrapper>
    </S.Container>
  );
};

export default SavedEvents;
