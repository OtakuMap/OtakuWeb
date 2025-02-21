import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../styles/category/category.styles';
import { getEventsByCategory } from '@/api/category/category';
import { Event, Genre, EventType, EventStatus } from '@/types/category/category';
import { searchEvents } from '@/api/category/events-search';
import { getEventDetails } from '@/api/category/events-details';
import searchIcon from '../assets/search.png';

const chunk = (arr: any[], size: number) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );
};

const Category = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('애니');
  const [activeMainMenu, setActiveMainMenu] = useState('전체');
  const [activeSubMenu, setActiveSubMenu] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 검색 관련 상태
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<Event[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // 초기 데이터 로드
  // 초기 데이터 로드를 위한 useEffect 수정
  useEffect(() => {
    const fetchInitialEvents = async () => {
      try {
        setIsLoading(true);
        // 초기 파라미터 설정
        const params = {
          page: 0,
          size: 12,
          type: EventType.ALL, // 전체 타입
          status: EventStatus.ALL, // 전체 상태
          genre: Genre.ALL, // 전체 장르
        };

        console.log('초기 데이터 로드 파라미터:', params);

        const response = await getEventsByCategory(params);

        if (response.isSuccess) {
          setEvents(response.result.events);
          setIsLast(response.result.isLast);
        } else {
          console.error('API 응답 오류:', response.message);
        }
      } catch (error) {
        console.error('초기 데이터 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialEvents();
  }, []);

  // 메뉴 변경 시 이벤트 로드를 위한 useEffect
  useEffect(() => {
    // 컴포넌트 마운트 시에는 실행하지 않음 (초기 데이터 로드에서 처리)
    // 메뉴나 탭이 변경될 때만 실행
    if (pageNumber === 0 && (activeTab || activeMainMenu || activeSubMenu || searchTerm)) {
      fetchEvents();
    }
  }, [activeTab, activeMainMenu, activeSubMenu, searchTerm]);

  // 페이지 번호 변경에 따른 추가 데이터 로드
  useEffect(() => {
    // 페이지 번호가 0보다 클 때만 실행 (더 보기 버튼 클릭 시)
    if (pageNumber > 0) {
      fetchEvents();
    }
  }, [pageNumber]);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      // 기본 파라미터 설정
      const params = {
        page: pageNumber,
        size: 12,
        title: searchTerm || undefined,
        type: EventType.ALL, // 기본 타입 설정
        status: EventStatus.ALL, // 기본 상태 설정
        genre: Genre.ALL, // 기본 장르 설정
      };

      // 선택된 탭과 메뉴에 따라 파라미터 업데이트
      if (activeTab === '애니') {
        if (activeMainMenu === '장르별' && activeSubMenu) {
          params.genre = getGenreEnum(activeSubMenu);
        }
      } else if (activeTab === '이벤트') {
        params.status =
          activeMainMenu === '진행중인 이벤트' ? EventStatus.IN_PROCESS : EventStatus.NOT_STARTED;

        if (activeSubMenu) {
          params.type = getEventTypeEnum(activeSubMenu);
        }
      }

      console.log('Request params:', params); // 디버깅용 로그

      const response = await getEventsByCategory(params);

      if (response.isSuccess) {
        if (pageNumber === 0) {
          setEvents(response.result.events);
        } else {
          setEvents((prev) => [...prev, ...response.result.events]);
        }
        setIsLast(response.result.isLast);
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
      // 에러 객체를 자세히 기록
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEventClick = async (eventId: number) => {
    try {
      const response = await getEventDetails(eventId);
      if (response.isSuccess) {
        navigate(`/event/${eventId}`, {
          state: { eventDetails: response.result },
        });
      }
    } catch (error) {
      console.error('Failed to fetch event details:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    filterSuggestions(value);
    setShowSuggestions(true);
  };

  const handleSearchSubmit = async () => {
    if (inputValue.trim()) {
      setSearchTerm(inputValue.trim());
      setShowSuggestions(false);
      setPageNumber(0);
      try {
        const response = await searchEvents({
          keyword: inputValue.trim(),
          page: 0,
          size: 12,
        });

        if (response.isSuccess) {
          setEvents(response.result.events);
          setIsLast(response.result.isLast);
        }
      } catch (error) {
        console.error('Failed to search events:', error);
      }
    }
  };

  const handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      await handleSearchSubmit();
    } else if (e.key === 'Escape') {
      setInputValue('');
      setSearchTerm('');
      setShowSuggestions(false);
      setPageNumber(0);
      fetchEvents();
    }
  };

  const handleSuggestionClick = async (event: Event) => {
    setInputValue(event.title);
    setSearchTerm(event.title);
    setSuggestions([]);
    setShowSuggestions(false);
    setPageNumber(0);

    try {
      const response = await searchEvents({
        keyword: event.title,
        page: 0,
        size: 12,
      });

      if (response.isSuccess) {
        setEvents(response.result.events);
        setIsLast(response.result.isLast);
      }
    } catch (error) {
      console.error('Failed to search events:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.search-container')) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    if (activeTab || activeMainMenu || activeSubMenu || searchTerm) {
      setPageNumber(0);
      fetchEvents();
    }
  }, [activeTab, activeMainMenu, activeSubMenu, searchTerm]);

  const getGenreEnum = (subMenu: string): Genre => {
    const genreMap: { [key: string]: Genre } = {
      로맨스: Genre.ROMANCE,
      스포츠: Genre.SPORTS,
      액션: Genre.ACTION,
      판타지: Genre.FANTASY,
      스릴러: Genre.THRILLER,
      전체: Genre.ALL,
    };
    return genreMap[subMenu] || Genre.ALL;
  };

  const getEventTypeEnum = (subMenu: string): EventType => {
    const typeMap: { [key: string]: EventType } = {
      팝업스토어: EventType.POPUP_STORE,
      전시회: EventType.EXHIBITION,
      콜라보카페: EventType.COLLABORATION_CAFE,
      전체: EventType.ALL,
    };
    return typeMap[subMenu] || EventType.ALL;
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setActiveMainMenu(tab === '애니' ? '전체' : '진행중인 이벤트');
    setActiveSubMenu('');
    setSearchTerm('');
    setInputValue('');
  };

  const renderSubMenu = () => {
    if (activeTab === '애니') {
      if (activeMainMenu === '장르별') {
        return (
          <S.SubMenuContainer>
            {['로맨스', '스포츠', '액션', '판타지', '스릴러'].map((genre) => (
              <S.SubMenuItem
                key={genre}
                $active={activeSubMenu === genre}
                onClick={() => setActiveSubMenu(genre)}
              >
                {genre === '로맨스' ? '순정' : genre}
              </S.SubMenuItem>
            ))}
          </S.SubMenuContainer>
        );
      }
    } else if (activeTab === '이벤트') {
      return (
        <S.SubMenuContainer>
          {['팝업스토어', '전시회', '콜라보카페'].map((type) => (
            <S.SubMenuItem
              key={type}
              $active={activeSubMenu === type}
              onClick={() => setActiveSubMenu(type)}
            >
              {type === '팝업스토어' ? '팝업 스토어' : type === '콜라보카페' ? '콜라보 카페' : type}
            </S.SubMenuItem>
          ))}
        </S.SubMenuContainer>
      );
    }
    return null;
  };

  return (
    <S.Container>
      <S.Sidebar>
        <S.PurpleAccent>
          {activeTab === '애니' ? (
            <>
              <S.MainMenuItem
                $active={activeMainMenu === '전체'}
                onClick={() => {
                  setActiveMainMenu('전체');
                  setActiveSubMenu('');
                }}
              >
                전체
              </S.MainMenuItem>
              <S.MainMenuItem
                $active={activeMainMenu === '장르별'}
                onClick={() => {
                  setActiveMainMenu('장르별');
                  setActiveSubMenu('로맨스');
                }}
              >
                장르별
              </S.MainMenuItem>
            </>
          ) : (
            <>
              <S.MainMenuItem
                $active={activeMainMenu === '진행중인 이벤트'}
                onClick={() => {
                  setActiveMainMenu('진행중인 이벤트');
                  setActiveSubMenu('팝업스토어');
                }}
              >
                진행중
              </S.MainMenuItem>
              <S.MainMenuItem
                $active={activeMainMenu === '진행예정인 이벤트'}
                onClick={() => {
                  setActiveMainMenu('진행예정인 이벤트');
                  setActiveSubMenu('팝업스토어');
                }}
              >
                진행 예정
              </S.MainMenuItem>
            </>
          )}
        </S.PurpleAccent>

        <S.MenuSection>
          <S.TabContainer>
            <S.Tab $active={activeTab === '애니'} onClick={() => handleTabChange('애니')}>
              애니
            </S.Tab>
            <S.Tab $active={activeTab === '이벤트'} onClick={() => handleTabChange('이벤트')}>
              이벤트
            </S.Tab>
          </S.TabContainer>

          {renderSubMenu()}
        </S.MenuSection>
      </S.Sidebar>
      <S.MainContent>
        <S.ContentTitle>
          {activeMainMenu} {activeSubMenu && `> ${activeSubMenu}`}
        </S.ContentTitle>
        <S.SearchContainer className="search-container">
          <S.SearchIcon src={searchIcon} alt="Search" onClick={handleSearchSubmit} />
          <S.SearchInput
            type="text"
            placeholder="이벤트나 작품명을 검색하세요"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <S.SearchLine />

          {showSuggestions && suggestions.length > 0 && (
            <S.SuggestionsContainer>
              {suggestions.map((suggestion) => (
                <S.SuggestionItem
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.title}
                </S.SuggestionItem>
              ))}
            </S.SuggestionsContainer>
          )}
        </S.SearchContainer>
        <S.AnimeGrid>
          {chunk(events, 4).map((rowEvents, rowIndex) => (
            <S.AnimeRow key={rowIndex}>
              {rowEvents.map((event) => (
                <S.AnimeCard key={event.id} onClick={() => handleEventClick(event.id)}>
                  <S.AnimeImage src={event.thumbnail.fileUrl} alt={event.title} />
                  <S.AnimeTitle>{event.title}</S.AnimeTitle>
                  <S.EventDate>{`${event.startDate} ~ ${event.endDate}`}</S.EventDate>
                </S.AnimeCard>
              ))}
            </S.AnimeRow>
          ))}
        </S.AnimeGrid>
        {!isLast && !isLoading && (
          <S.LoadMoreButton onClick={() => setPageNumber((prev) => prev + 1)}>
            더 보기
          </S.LoadMoreButton>
        )}
        {isLoading && <S.LoadingIndicator>로딩 중...</S.LoadingIndicator>}
      </S.MainContent>
    </S.Container>
  );
};

export default Category;
