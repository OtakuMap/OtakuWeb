import React, { useState } from 'react';
import * as S from '../styles/category/category.styles';
import Search from '../components/common/Search';
import { SearchContainer } from '@/styles/common/Search.styles';

interface TabProps {
  $active: boolean;
}

interface MenuItemProps {
  $active: boolean;
}

const Category = () => {
  const [activeTab, setActiveTab] = useState('애니');
  const [activeMainMenu, setActiveMainMenu] = useState('전체');
  const [activeSubMenu, setActiveSubMenu] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setActiveMainMenu(tab === '애니' ? '전체' : '진행중인 이벤트');
    setActiveSubMenu('');
  };

  const renderSubMenu = () => {
    if (activeTab === '애니') {
      if (activeMainMenu === '장르별') {
        return (
          <S.SubMenuContainer>
            <S.SubMenuItem
              $active={activeSubMenu === '순정'}
              onClick={() => setActiveSubMenu('순정')}
            >
              순정
            </S.SubMenuItem>
            <S.SubMenuItem
              $active={activeSubMenu === '스포츠'}
              onClick={() => setActiveSubMenu('스포츠')}
            >
              스포츠
            </S.SubMenuItem>
            <S.SubMenuItem
              $active={activeSubMenu === '액션'}
              onClick={() => setActiveSubMenu('액션')}
            >
              액션
            </S.SubMenuItem>
            <S.SubMenuItem
              $active={activeSubMenu === '판타지'}
              onClick={() => setActiveSubMenu('판타지')}
            >
              판타지
            </S.SubMenuItem>
            <S.SubMenuItem
              $active={activeSubMenu === '스릴러'}
              onClick={() => setActiveSubMenu('스릴러')}
            >
              스릴러
            </S.SubMenuItem>
          </S.SubMenuContainer>
        );
      }
    } else if (activeTab === '이벤트') {
      return (
        <S.SubMenuContainer>
          <S.SubMenuItem
            $active={activeSubMenu === '팝업스토어'}
            onClick={() => setActiveSubMenu('팝업스토어')}
          >
            팝업 스토어
          </S.SubMenuItem>
          <S.SubMenuItem
            $active={activeSubMenu === '전시회'}
            onClick={() => setActiveSubMenu('전시회')}
          >
            전시회
          </S.SubMenuItem>
          <S.SubMenuItem
            $active={activeSubMenu === '콜라보카페'}
            onClick={() => setActiveSubMenu('콜라보카페')}
          >
            콜라보 카페
          </S.SubMenuItem>
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
                  setActiveSubMenu('순정');
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
        <S.SearchContainer>
          <Search placeholder="이벤트나 작품명을 검색하세요" onSearch={setSearchTerm} />
        </S.SearchContainer>
        <S.AnimeGrid>
          {Array.from({ length: 3 }).map((_, rowIndex) => (
            <S.GridRow key={rowIndex}>
              {Array.from({ length: 4 }).map((_, colIndex) => (
                <S.AnimeCard key={rowIndex * 4 + colIndex}>
                  <S.AnimeImage />
                  <S.AnimeTitle>귀멸의 칼날 x 온천 콜라보</S.AnimeTitle>
                </S.AnimeCard>
              ))}
            </S.GridRow>
          ))}
        </S.AnimeGrid>
      </S.MainContent>
    </S.Container>
  );
};

export default Category;
