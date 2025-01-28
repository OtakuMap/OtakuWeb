import React, { useState } from 'react';
import styled from 'styled-components';
import Search from '../components/common/Search';
import { SearchContainer } from '@/styles/common/Search.styles';

interface TabProps {
  $active: boolean;
}

interface MenuItemProps {
  $active: boolean;
}

const Container = styled.div`
  margin-top: 60px;
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const Sidebar = styled.div`
  display: flex;
  width: 300px;
  overflow: hidden;
  border: 2px solid #d1c1ff;
  border-radius: 0 12px 0 0;
`;

const PurpleAccent = styled.div`
  width: 150px;
  background-color: #d1c1ff;
  flex-direction: column;
  display: flex;
  padding-top: 50px;
  justify-content: flex-start;
`;

const MenuSection = styled.div`
  background-color: #101148;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 2px solid rgb(255, 255, 255);
  width: 200px;
`;

const Tab = styled.button<TabProps>`
  flex: 1;
  padding: 15px 0;
  text-align: center;
  background-color: ${(props) => (props.$active ? '#101148' : '#101148')};
  color: ${(props) => (props.$active ? 'white' : 'white')};
  border: none;
  cursor: pointer;
  font-size: 14px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    bottom: -3px;
    transform: translateX(-50%);
    width: 50px;
    height: 5.763px;
    border-radius: 5px;
    background-color: ${(props) => (props.$active ? '#B8EFFD' : 'transparent')};
    transition: all 0.2s ease;
  }

  &:first-child::before {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 60%;
    width: 1px;
    background-color: #2d2f63;
  }
`;

const MainMenuItem = styled.button<MenuItemProps>`
  width: 100%;
  padding: 12px 15px;
  text-align: left;
  background-color: ${(props) => (props.$active ? '#101148' : '#D1C1FF')};
  color: ${(props) => (props.$active ? '#FFF' : '#000')};
  border: none;
  cursor: pointer;
  font-size: 14px;
  position: relative;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.$active ? '#101148' : '#BFB0EE')};
  }

  ${(props) =>
    props.$active &&
    `
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
    }
  `}
`;

const SubMenuContainer = styled.div`
  flex: 1;
  background-color: #101148;
`;

const SubMenuItem = styled.button<MenuItemProps>`
  width: 100%;
  padding: 12px 20px;
  text-align: left;
  background-color: transparent;
  color: ${(props) => (props.$active ? '#ffffff' : '#8e8ea0')};
  border: none;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #101148;
  }
`;

const SearchContainer = styled.div`
  flex: 1;
  margin-right: 985px;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 30px;
  background-color: #101148;
`;

const ContentTitle = styled.h2`
  color: white;
  margin-bottom: 20px;
  font-family: 'Gothic A1';
  font-size: 38px;
  font-weight: 600;
`;

const AnimeGrid = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-left: 60px;
  width: 846px; // 188px * 4 (cards) + 33px * 3 (gaps) = 846px
`;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 33px;
  padding-bottom: 33px;
  border-bottom: 1px solid #2d2f63;
  margin-bottom: 33px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const AnimeCard = styled.div`
  cursor: pointer;
`;

const AnimeImage = styled.div`
  width: 188px;
  height: 170px;
  aspect-ratio: 1;
  background-color: #2d2f63;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const AnimeTitle = styled.p`
  color: white;
  width: 188px;
  font-size: 14px;
  text-align: center;
`;

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
          <SubMenuContainer>
            <SubMenuItem
              $active={activeSubMenu === '순정'}
              onClick={() => setActiveSubMenu('순정')}
            >
              순정
            </SubMenuItem>
            <SubMenuItem
              $active={activeSubMenu === '스포츠'}
              onClick={() => setActiveSubMenu('스포츠')}
            >
              스포츠
            </SubMenuItem>
            <SubMenuItem
              $active={activeSubMenu === '액션'}
              onClick={() => setActiveSubMenu('액션')}
            >
              액션
            </SubMenuItem>
            <SubMenuItem
              $active={activeSubMenu === '판타지'}
              onClick={() => setActiveSubMenu('판타지')}
            >
              판타지
            </SubMenuItem>
            <SubMenuItem
              $active={activeSubMenu === '스릴러'}
              onClick={() => setActiveSubMenu('스릴러')}
            >
              스릴러
            </SubMenuItem>
          </SubMenuContainer>
        );
      }
    } else if (activeTab === '이벤트') {
      return (
        <SubMenuContainer>
          <SubMenuItem
            $active={activeSubMenu === '팝업스토어'}
            onClick={() => setActiveSubMenu('팝업스토어')}
          >
            팝업 스토어
          </SubMenuItem>
          <SubMenuItem
            $active={activeSubMenu === '전시회'}
            onClick={() => setActiveSubMenu('전시회')}
          >
            전시회
          </SubMenuItem>
          <SubMenuItem
            $active={activeSubMenu === '콜라보카페'}
            onClick={() => setActiveSubMenu('콜라보카페')}
          >
            콜라보 카페
          </SubMenuItem>
        </SubMenuContainer>
      );
    }
    return null;
  };

  return (
    <Container>
      <Sidebar>
        <PurpleAccent>
          {activeTab === '애니' ? (
            <>
              <MainMenuItem
                $active={activeMainMenu === '전체'}
                onClick={() => {
                  setActiveMainMenu('전체');
                  setActiveSubMenu('');
                }}
              >
                전체
              </MainMenuItem>
              <MainMenuItem
                $active={activeMainMenu === '장르별'}
                onClick={() => {
                  setActiveMainMenu('장르별');
                  setActiveSubMenu('순정');
                }}
              >
                장르별
              </MainMenuItem>
            </>
          ) : (
            <>
              <MainMenuItem
                $active={activeMainMenu === '진행중인 이벤트'}
                onClick={() => {
                  setActiveMainMenu('진행중인 이벤트');
                  setActiveSubMenu('팝업스토어');
                }}
              >
                진행중
              </MainMenuItem>
              <MainMenuItem
                $active={activeMainMenu === '진행예정인 이벤트'}
                onClick={() => {
                  setActiveMainMenu('진행예정인 이벤트');
                  setActiveSubMenu('팝업스토어');
                }}
              >
                진행 예정
              </MainMenuItem>
            </>
          )}
        </PurpleAccent>

        <MenuSection>
          <TabContainer>
            <Tab $active={activeTab === '애니'} onClick={() => handleTabChange('애니')}>
              애니
            </Tab>
            <Tab $active={activeTab === '이벤트'} onClick={() => handleTabChange('이벤트')}>
              이벤트
            </Tab>
          </TabContainer>

          {renderSubMenu()}
        </MenuSection>
      </Sidebar>
      <MainContent>
        <ContentTitle>
          {activeMainMenu} {activeSubMenu && `> ${activeSubMenu}`}
        </ContentTitle>
        <SearchContainer>
          <Search placeholder="이벤트나 작품명을 검색하세요" onSearch={setSearchTerm} />
        </SearchContainer>
        <AnimeGrid>
          {Array.from({ length: 3 }).map((_, rowIndex) => (
            <GridRow key={rowIndex}>
              {Array.from({ length: 4 }).map((_, colIndex) => (
                <AnimeCard key={rowIndex * 4 + colIndex}>
                  <AnimeImage />
                  <AnimeTitle>귀멸의 칼날 x 온천 콜라보</AnimeTitle>
                </AnimeCard>
              ))}
            </GridRow>
          ))}
        </AnimeGrid>
      </MainContent>
    </Container>
  );
};

export default Category;
