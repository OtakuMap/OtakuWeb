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

  // 요청 취소 및 추적
  const fetchingRef = useRef(false);
  const requestIdRef = useRef(0);
  const lastParamsRef = useRef<any>(null);

  // 검색 관련 상태
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<Event[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // 하나의 함수로 여러 상태를 업데이트
  const updateMenuState = useCallback((tab: string, mainMenu: string, subMenu: string) => {
    console.log(`상태 일괄 업데이트: Tab=${tab}, MainMenu=${mainMenu}, SubMenu=${subMenu}`);

    // 상태 업데이트
    setActiveTab(tab);
    setActiveMainMenu(mainMenu);
    setActiveSubMenu(subMenu);
    setPageNumber(0);

    // 요청 ID 증가 - 다음 요청에 사용
    requestIdRef.current++;
    const currentRequestId = requestIdRef.current;

    // 현재 진행 중인 요청 취소 처리
    fetchingRef.current = false;

    // setTimeout으로 상태 업데이트 완료 후 실행
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

        // 초기 파라미터 설정
        const params = {
          page: 0,
          size: 12,
          type: EventType.ALL,
          status: EventStatus.ALL,
          genre: Genre.ALL,
        };

        console.log('초기 데이터 로드 파라미터:', params);
        lastParamsRef.current = params;

        const response = await getEventsByCategory(params);

        // 요청 ID가 변경되었으면 응답 무시
        if (currentRequestId !== requestIdRef.current) {
          console.log('최신 요청이 아니므로 응답 무시');
          return;
        }

        if (response.isSuccess) {
          console.log('초기 데이터 로드 성공: ', response.result.events.length, '개의 이벤트');
          setEvents(response.result.events);
          setIsLast(response.result.isLast);
        } else {
          console.error('API 응답 오류:', response.message);
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

  // API 요청 함수 개선 - 요청 ID 추적 및 취소 로직 추가
  const fetchEvents = async (page = pageNumber, overrideState = null) => {
    // 현재 요청의 ID 확인
    const currentRequestId = overrideState?.requestId || requestIdRef.current;

    // 이미 다른 요청이 진행 중이고 현재 요청이 최신이 아니면 중단
    if (fetchingRef.current && currentRequestId < requestIdRef.current) {
      console.log(`요청 ID ${currentRequestId}는 최신이 아니므로 무시`);
      return;
    }

    // 진행 중인 이전 요청이 있다면 효과적으로 취소 (결과를 무시)
    if (fetchingRef.current) {
      console.log('이전 요청을 취소하고 새로운 요청을 시작합니다.');
      // 요청 ID를 업데이트해서 이전 요청의 응답이 처리되지 않도록 함
      if (!overrideState?.requestId) {
        requestIdRef.current++;
      }
    }

    fetchingRef.current = true;

    try {
      setIsLoading(true);
      // 기본 파라미터 설정
      const params = {
        page: page,
        size: 12,
        title: searchTerm || undefined,
        type: EventType.ALL,
        status: EventStatus.ALL,
        genre: Genre.ALL,
      };

      // 오버라이드된 상태가 있으면 사용, 없으면 현재 상태 사용
      const currentTab = overrideState?.tab || activeTab;
      const currentMainMenu = overrideState?.mainMenu || activeMainMenu;
      const currentSubMenu = overrideState?.subMenu || activeSubMenu;

      // 선택된 탭과 메뉴에 따라 파라미터 업데이트
      if (currentTab === '애니') {
        if (currentMainMenu === '장르별' && currentSubMenu) {
          params.genre = getGenreEnum(currentSubMenu);
        }
      } else if (currentTab === '이벤트') {
        params.status =
          currentMainMenu === '진행중인 이벤트' ? EventStatus.IN_PROCESS : EventStatus.NOT_STARTED;

        // 이벤트 타입 적용
        if (currentSubMenu) {
          params.type = getEventTypeEnum(currentSubMenu);
          console.log(`이벤트 타입 설정: "${currentSubMenu}" => "${params.type}"`);
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

      console.log(`---새 API 요청 (ID: ${currentRequestId})---`);
      console.log('파라미터:', params);
      console.log('현재 탭:', currentTab);
      console.log('현재 메인메뉴:', currentMainMenu);
      console.log('현재 서브메뉴:', currentSubMenu);

      lastParamsRef.current = params;

      const response = await getEventsByCategory(params);

      // 요청 ID 확인 - 현재 요청이 최신이 아니면 응답 무시
      if (currentRequestId !== requestIdRef.current) {
        console.log(
          `요청 ID ${currentRequestId}의 응답이 도착했지만, 현재 ID ${requestIdRef.current}가 아니므로 무시`,
        );
        return;
      }

      if (response.isSuccess) {
        console.log(
          `요청 ID ${currentRequestId}의 응답 성공 - 이벤트 수:`,
          response.result.events.length,
        );

        if (page === 0) {
          // 첫 페이지인 경우 데이터 교체
          console.log('첫 페이지 데이터로 교체합니다.');
          setEvents(response.result.events);
        } else {
          // 페이지 추가인 경우 데이터 추가
          console.log('기존 데이터에 추가합니다.');
          setEvents((prevEvents) => [...prevEvents, ...response.result.events]);
        }

        setIsLast(response.result.isLast);
      } else {
        console.error('API 응답 오류:', response.message);
      }
    } catch (error) {
      console.error('이벤트 데이터 로드 실패:', error);

      if (error.response) {
        console.error('오류 응답 데이터:', error.response.data);
        console.error('오류 상태 코드:', error.response.status);
      }
    } finally {
      // 이 요청이 최신인 경우에만 로딩 상태 해제
      if (currentRequestId === requestIdRef.current) {
        setIsLoading(false);
        fetchingRef.current = false;
      } else {
        console.log(
          `요청 ID ${currentRequestId}의 로딩 상태를 해제하지 않음 (현재 ID: ${requestIdRef.current})`,
        );
      }
    }
  };

  // 페이지 번호 변경(더보기 버튼)에 따른 추가 데이터 로드
  useEffect(() => {
    // 페이지 번호가 0보다 클 때만 실행 (더 보기 버튼 클릭 시)
    if (pageNumber > 0) {
      console.log('페이지 번호 변경:', pageNumber, '- 추가 데이터 로드');
      requestIdRef.current++;
      fetchEvents(pageNumber);
    }
  }, [pageNumber]);

  // 검색어 변경 시 별도 처리
  useEffect(() => {
    if (searchTerm) {
      console.log('검색어 변경으로 데이터 다시 로드:', searchTerm);
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
      console.error('Failed to fetch event details:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    filterSuggestions(value);
    setShowSuggestions(true);
  };

  // 자동완성 기능
  const filterSuggestions = (value: string) => {
    if (value.trim() !== '') {
      searchEvents({
        keyword: value.trim(),
        page: 0,
        size: 5, // 자동완성 개수 제한
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

    // 일괄 상태 업데이트 및 데이터 로드
    updateMenuState(tab, newMainMenu, newSubMenu);

    // 검색어 초기화
    setSearchTerm('');
    setInputValue('');
  };

  const handleMainMenuChange = (menu: string) => {
    console.log('메인 메뉴 변경:', menu);

    // 서브메뉴 설정
    let newSubMenu = '';
    if (activeTab === '이벤트') {
      newSubMenu = '팝업스토어';
    } else if (menu === '장르별') {
      newSubMenu = '로맨스';
    }

    // 일괄 상태 업데이트 및 데이터 로드
    updateMenuState(activeTab, menu, newSubMenu);
  };

  const handleSubMenuChange = (subMenu: string) => {
    console.log('서브 메뉴 변경:', subMenu);

    // 명시적 이벤트 타입 로깅
    if (activeTab === '이벤트') {
      const eventType = getEventTypeEnum(subMenu);
      console.log(`서브메뉴 변경: "${subMenu}" => 이벤트 타입 "${eventType}"`);
    }

    // 일괄 상태 업데이트 및 데이터 로드
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
