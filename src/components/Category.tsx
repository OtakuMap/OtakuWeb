import React, { useState, useEffect, useRef, useCallback } from 'react';
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

  // 요청 취소 및 추적을 위한 refs
  const fetchingRef = useRef(false);
  const requestIdRef = useRef(0);
  const lastParamsRef = useRef<any>(null);

  // 검색 관련 상태
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<Event[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchEvents = async (page = pageNumber, overrideState = null) => {
    const currentRequestId = overrideState?.requestId || requestIdRef.current;

    if (fetchingRef.current && currentRequestId < requestIdRef.current) {
      console.log(`요청 ID ${currentRequestId}는 최신이 아니므로 무시`);
      return;
    }

    fetchingRef.current = true;

    try {
      setIsLoading(true);
      const params = {
        page: page,
        size: 12,
        title: searchTerm || undefined,
        type: EventType.ALL,
        status: EventStatus.ALL,
        genre: Genre.ALL,
        isAnimeTab: false,
      };

      const currentTab = overrideState?.tab || activeTab;
      const currentMainMenu = overrideState?.mainMenu || activeMainMenu;
      const currentSubMenu = overrideState?.subMenu || activeSubMenu;

      // Set isAnimeTab flag
      params.isAnimeTab = currentTab === '애니';

      // Handle genre filtering for anime tab
      if (currentTab === '애니') {
        if (currentMainMenu === '장르별' && currentSubMenu) {
          params.genre = getGenreEnum(currentSubMenu);
        } else if (currentMainMenu === '전체') {
          params.genre = Genre.ALL;
        }
      } else if (currentTab === '이벤트') {
        params.genre = Genre.NULL; // Reset genre for events tab
        params.status =
          currentMainMenu === '진행중인 이벤트' ? EventStatus.IN_PROCESS : EventStatus.NOT_STARTED;

        if (currentSubMenu) {
          params.type = getEventTypeEnum(currentSubMenu);
        }
      }

      // 이전 요청과 동일한 파라미터면 중복 요청 무시
      if (
        lastParamsRef.current &&
        JSON.stringify(lastParamsRef.current) === JSON.stringify(params) &&
        page === 0
      ) {
        console.log('이전과 동일한 파라미터로 요청 무시:', params);
        setIsLoading(false);
        fetchingRef.current = false;
        return;
      }

      console.log('API 요청 파라미터:', {
        ...params,
        currentTab,
        currentMainMenu,
        currentSubMenu,
      });

      lastParamsRef.current = params;

      const response = await getEventsByCategory(params);

      if (currentRequestId !== requestIdRef.current) {
        console.log(
          `요청 ID ${currentRequestId}의 응답이 도착했지만, 현재 ID ${requestIdRef.current}가 아니므로 무시`,
        );
        return;
      }

      if (response.isSuccess) {
        if (page === 0) {
          setEvents(response.result.events);
        } else {
          setEvents((prevEvents) => [...prevEvents, ...response.result.events]);
        }
        setIsLast(response.result.isLast);
      }
    } catch (error) {
      console.error('이벤트 데이터 로드 실패:', error);
    } finally {
      if (currentRequestId === requestIdRef.current) {
        setIsLoading(false);
        fetchingRef.current = false;
      }
    }
  };

  // 하나의 함수로 여러 상태를 업데이트
  const updateMenuState = useCallback((tab: string, mainMenu: string, subMenu: string) => {
    console.log(`상태 일괄 업데이트: Tab=${tab}, MainMenu=${mainMenu}, SubMenu=${subMenu}`);

    setActiveTab(tab);
    setActiveMainMenu(mainMenu);
    setActiveSubMenu(subMenu);
    setPageNumber(0);

    requestIdRef.current++;
    const currentRequestId = requestIdRef.current;

    fetchingRef.current = false;

    setTimeout(() => {
      fetchEvents(0, {
        tab,
        mainMenu,
        subMenu,
        requestId: currentRequestId,
      });
    }, 0);
  }, []);

  // 초기 데이터 로드
  useEffect(() => {
    const fetchInitialEvents = async () => {
      try {
        setIsLoading(true);
        requestIdRef.current++;
        const currentRequestId = requestIdRef.current;
        fetchingRef.current = true;

        const params = {
          page: 0,
          size: 12,
          type: EventType.ALL,
          status: EventStatus.ALL,
          genre: Genre.ALL,
          isAnimeTab: true,
        };

        lastParamsRef.current = params;
        const response = await getEventsByCategory(params);

        if (currentRequestId !== requestIdRef.current) {
          return;
        }

        if (response.isSuccess) {
          setEvents(response.result.events);
          setIsLast(response.result.isLast);
        }
      } catch (error) {
        console.error('초기 데이터 로드 실패:', error);
      } finally {
        setIsLoading(false);
        fetchingRef.current = false;
      }
    };

    fetchInitialEvents();
  }, []);

  // 페이지 번호 변경에 따른 추가 데이터 로드
  useEffect(() => {
    if (pageNumber > 0) {
      requestIdRef.current++;
      fetchEvents(pageNumber);
    }
  }, [pageNumber]);

  // 검색어 변경 시 처리
  useEffect(() => {
    if (searchTerm) {
      setPageNumber(0);
      requestIdRef.current++;
      fetchEvents(0);
    }
  }, [searchTerm]);

  const handleEventClick = async (eventId: number) => {
    try {
      const response = await getEventDetails(eventId);
      if (response.isSuccess) {
        navigate(`/event/${eventId}`, {
          state: { eventDetails: response.result },
        });
      }
    } catch (error) {
      console.error('이벤트 상세 정보 로드 실패:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    filterSuggestions(value);
    setShowSuggestions(true);
  };

  const filterSuggestions = (value: string) => {
    if (value.trim() !== '') {
      searchEvents({
        keyword: value.trim(),
        page: 0,
        size: 5,
      })
        .then((response) => {
          if (response.isSuccess) {
            setSuggestions(response.result.events);
          }
        })
        .catch((error) => {
          console.error('자동완성 검색 오류:', error);
          setSuggestions([]);
        });
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = async () => {
    if (inputValue.trim()) {
      setSearchTerm(inputValue.trim());
      setShowSuggestions(false);
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
      requestIdRef.current++;
      fetchEvents(0);
    }
  };

  const handleSuggestionClick = async (event: Event) => {
    setInputValue(event.title);
    setSearchTerm(event.title);
    setSuggestions([]);
    setShowSuggestions(false);
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

  const getGenreEnum = (subMenu: string): Genre => {
    const genreMap: { [key: string]: Genre } = {
      로맨스: Genre.ROMANCE,
      스포츠: Genre.SPORTS,
      액션: Genre.ACTION,
      판타지: Genre.FANTASY,
      스릴러: Genre.THRILLER,
      전체: Genre.ALL,
      빈칸: Genre.NULL,
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
    console.log('탭 변경:', tab);
    const newMainMenu = tab === '애니' ? '전체' : '진행중인 이벤트';
    const newSubMenu = tab === '애니' ? '' : '팝업스토어';

    updateMenuState(tab, newMainMenu, newSubMenu);

    setSearchTerm('');
    setInputValue('');
  };

  const handleMainMenuChange = (menu: string) => {
    console.log('메인 메뉴 변경:', menu);

    let newSubMenu = '';
    if (activeTab === '이벤트') {
      newSubMenu = '팝업스토어';
    } else if (menu === '장르별') {
      newSubMenu = '로맨스';
    }

    updateMenuState(activeTab, menu, newSubMenu);
  };

  const handleSubMenuChange = (subMenu: string) => {
    console.log('서브 메뉴 변경:', subMenu);

    if (activeTab === '이벤트') {
      const eventType = getEventTypeEnum(subMenu);
      console.log(`서브메뉴 변경: "${subMenu}" => 이벤트 타입 "${eventType}"`);
    }

    updateMenuState(activeTab, activeMainMenu, subMenu);
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
                onClick={() => handleSubMenuChange(genre)}
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
              onClick={() => handleSubMenuChange(type)}
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
                onClick={() => handleMainMenuChange('전체')}
              >
                전체
              </S.MainMenuItem>
              <S.MainMenuItem
                $active={activeMainMenu === '장르별'}
                onClick={() => handleMainMenuChange('장르별')}
              >
                장르별
              </S.MainMenuItem>
            </>
          ) : (
            <>
              <S.MainMenuItem
                $active={activeMainMenu === '진행중인 이벤트'}
                onClick={() => handleMainMenuChange('진행중인 이벤트')}
              >
                진행중
              </S.MainMenuItem>
              <S.MainMenuItem
                $active={activeMainMenu === '진행예정인 이벤트'}
                onClick={() => handleMainMenuChange('진행예정인 이벤트')}
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
          {events.length > 0 ? (
            chunk(events, 4).map((rowEvents, rowIndex) => (
              <S.AnimeRow key={`row-${rowIndex}-${activeSubMenu}`}>
                {rowEvents.map((event) => (
                  <S.AnimeCard
                    key={`event-${event.id}-${activeSubMenu}`}
                    onClick={() => handleEventClick(event.id)}
                  >
                    <S.AnimeImage src={event.thumbnail.fileUrl} alt={event.title} />
                    <S.AnimeTitle>{event.title}</S.AnimeTitle>
                    <S.EventDate>{`${event.startDate} ~ ${event.endDate}`}</S.EventDate>
                  </S.AnimeCard>
                ))}
              </S.AnimeRow>
            ))
          ) : (
            <S.NoResultsMessage>
              {isLoading ? '로딩 중...' : '검색 결과가 없습니다.'}
            </S.NoResultsMessage>
          )}
        </S.AnimeGrid>
        {!isLast && !isLoading && events.length > 0 && (
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
