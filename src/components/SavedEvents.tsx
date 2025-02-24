import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

    if (isTogglingFavorite === event.id) return;

    try {
      setIsTogglingFavorite(event.id);
      const response = await toggleEventFavorite(event.id, !event.isFavorite);

      if (response.isSuccess) {
        setEvents((prevEvents) =>
          prevEvents.map((e) => (e.id === event.id ? { ...e, isFavorite: !e.isFavorite } : e)),
        );

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

  const handleCardClick = (event: EventLike) => {
    setSelectedEvents((prev) =>
      prev.includes(event.eventId)
        ? prev.filter((id) => id !== event.eventId)
        : [...prev, event.eventId],
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedEvents.length === 0) {
      alert('삭제할 이벤트를 선택해주세요.');
      return;
    }

    try {
      setIsDeleting(true);

      console.log('Deleting events with IDs:', selectedEvents);

      const response = await deleteEvents(selectedEvents);
      console.log('삭제 응답:', response);

      if (response.isSuccess) {
        // 삭제된 이벤트 제거
        setEvents((prev) => prev.filter((event) => !selectedEvents.includes(event.eventId)));
        setSelectedEvents([]);
        alert('선택한 이벤트가 성공적으로 삭제되었습니다.');
      } else {
        alert(response.message || '삭제에 실패했습니다.');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          '서버 오류가 발생했습니다.';

        console.error('Delete error details:', error.response?.data);
        alert(errorMessage);
      } else {
        alert('예상치 못한 오류가 발생했습니다.');
      }
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
                  color: selectedEvents.length > 0 ? '#7B66FF' : '#999',
                  cursor: selectedEvents.length > 0 ? 'pointer' : 'not-allowed',
                  opacity: isDeleting ? 0.5 : 1,
                }}
                disabled={selectedEvents.length === 0 || isDeleting}
              >
                {isDeleting ? '삭제중...' : `선택 삭제 (${selectedEvents.length})`}
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
              active={selectedCategory === 1}
              onClick={() => setSelectedCategory(selectedCategory === 1 ? undefined : 1)}
            >
              팝업 스토어
            </S.CategoryButton>
            <S.CategoryDivider>/</S.CategoryDivider>
            <S.CategoryButton
              active={selectedCategory === 2}
              onClick={() => setSelectedCategory(selectedCategory === 2 ? undefined : 2)}
            >
              전시회
            </S.CategoryButton>
            <S.CategoryDivider>/</S.CategoryDivider>
            <S.CategoryButton
              active={selectedCategory === 3}
              onClick={() => setSelectedCategory(selectedCategory === 3 ? undefined : 3)}
            >
              콜라보 카페
            </S.CategoryButton>
          </S.CategoryFilter>

          <S.EventGrid>
            {events.map((event) => (
              <S.EventCard
                key={event.id}
                $isSelected={selectedEvents.includes(event.eventId)}
                onClick={() => handleCardClick(event)}
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
