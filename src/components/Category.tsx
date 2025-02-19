import React, { useState, useEffect, useCallback } from 'react';
import * as S from '../styles/category/category.styles';
import { getEventsByCategory } from '@/api/category/category';
import { Event, Genre, EventType, EventStatus } from '@/types/category/category';
import searchIcon from '../assets/search.png';
import { searchEvents } from '@/api/category/events-search'; // 추가

const chunk = (arr: any[], size: number) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );
};

const Category = () => {
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

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const params: any = {
        page: pageNumber,
        size: 12,
        title: searchTerm || undefined,
      };

      if (activeTab === '애니') {
        if (activeMainMenu === '장르별' && activeSubMenu) {
          params.genre = getGenreEnum(activeSubMenu);
        }
      } else {
        params.status =
          activeMainMenu === '진행중인 이벤트' ? EventStatus.IN_PROCESS : EventStatus.NOT_STARTED;
        if (activeSubMenu) {
          params.type = getEventTypeEnum(activeSubMenu);
        }
      }

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
    } finally {
      setIsLoading(false);
    }
  };

  // 검색어 필터링 함수
  const filterSuggestions = useCallback(
    (searchText: string) => {
      if (!searchText.trim()) {
        setSuggestions([]);
        return;
      }

      const filtered = events.filter((event) =>
        event.title.toLowerCase().includes(searchText.toLowerCase()),
      );

      setSuggestions(filtered);
    },
    [events],
  );

  // 검색 입력 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    filterSuggestions(value);
    setShowSuggestions(true);
  };

  // handleSearchSubmit 함수 수정
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

  // handleKeyPress 함수 수정
  const handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      await handleSearchSubmit();
    } else if (e.key === 'Escape') {
      setInputValue('');
      setSearchTerm('');
      setShowSuggestions(false);
      setPageNumber(0);
      fetchEvents(); // 검색 취소시 원래 목록으로 돌아가기
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

  // 외부 클릭 시 제안 목록 숨기기
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

  // 검색어, 탭, 메뉴 변경 시 이벤트 다시 불러오기
  useEffect(() => {
    setPageNumber(0);
    fetchEvents();
  }, [activeTab, activeMainMenu, activeSubMenu, searchTerm]);

  // 장르 및 이벤트 타입 변환 함수들
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

  // 탭 변경 핸들러
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setActiveMainMenu(tab === '애니' ? '전체' : '진행중인 이벤트');
    setActiveSubMenu('');
    setSearchTerm('');
    setInputValue('');
  };

  // 서브 메뉴 렌더링
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
                <S.AnimeCard key={event.id}>
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
