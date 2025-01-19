import React, { useState } from 'react';
import styled from 'styled-components';
import Search from '../components/common/Search';

const Container = styled.div`
  margin-top: 110px;
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
`;

const MenuSection = styled.div`
  background-color: #1a1b3a;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #2d2f63;
  width: 200px;
`;

const Tab = styled.button`
  flex: 1;
  padding: 15px 0;
  text-align: center;
  background-color: ${(props) => (props.active ? '#1a1b3a' : '#151632')};
  color: ${(props) => (props.active ? 'white' : '#8e8ea0')};
  border: none;
  cursor: pointer;
  font-size: 14px;
  position: relative;

  &:first-child::after {
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

const MainMenuItem = styled.button`
  width: 100%;
  padding: 12px 15px;
  text-align: left;
  background-color: ${(props) => (props.active ? '#1a1b3a' : 'transparent')};
  color: ${(props) => (props.active ? '#FFF' : '#000')};
  border: none;
  cursor: pointer;
  font-size: 14px;
  position: relative;

  ${(props) =>
    props.active &&
    `
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background-color: #b5b3ff;
    }
  `}
`;

const SubMenuContainer = styled.div`
  flex: 1;
  background-color: #1a1b3a;
`;

const SubMenuItem = styled.button`
  width: 100%;
  padding: 12px 20px;
  text-align: left;
  background-color: transparent;
  color: ${(props) => (props.active ? '#ffffff' : '#8e8ea0')};
  border: none;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #2d2f63;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 30px;
  background-color: #1a1b3a;
`;

const ContentTitle = styled.h2`
  color: white;
  font-size: 20px;
  margin-bottom: 20px;
`;

const AnimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 30px;
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
  const [activeMainMenu, setActiveMainMenu] = useState('장르별');
  const [activeSubMenu, setActiveSubMenu] = useState('순정');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    // 검색 로직 구현
    console.log('검색어:', value);
  };

  return (
    <Container>
      <Sidebar>
        <PurpleAccent>
          <MainMenuItem
            active={activeMainMenu === '전체'}
            onClick={() => setActiveMainMenu('전체')}
          >
            전체
          </MainMenuItem>
          <MainMenuItem
            active={activeMainMenu === '장르별'}
            onClick={() => setActiveMainMenu('장르별')}
          >
            장르별
          </MainMenuItem>
        </PurpleAccent>

        <MenuSection>
          <TabContainer>
            <Tab active={activeTab === '애니'} onClick={() => setActiveTab('애니')}>
              애니
            </Tab>
            <Tab active={activeTab === '이벤트'} onClick={() => setActiveTab('이벤트')}>
              이벤트
            </Tab>
          </TabContainer>

          {activeMainMenu === '장르별' && (
            <SubMenuContainer>
              <SubMenuItem
                active={activeSubMenu === '순정'}
                onClick={() => setActiveSubMenu('순정')}
              >
                순정
              </SubMenuItem>
              <SubMenuItem
                active={activeSubMenu === '스포츠'}
                onClick={() => setActiveSubMenu('스포츠')}
              >
                스포츠
              </SubMenuItem>
              <SubMenuItem
                active={activeSubMenu === '액션'}
                onClick={() => setActiveSubMenu('액션')}
              >
                액션
              </SubMenuItem>
              <SubMenuItem
                active={activeSubMenu === '판타지'}
                onClick={() => setActiveSubMenu('판타지')}
              >
                판타지
              </SubMenuItem>
              <SubMenuItem
                active={activeSubMenu === '스릴러'}
                onClick={() => setActiveSubMenu('스릴러')}
              >
                스릴러
              </SubMenuItem>
            </SubMenuContainer>
          )}
        </MenuSection>
      </Sidebar>
      <MainContent>
        <ContentTitle>장르별 {'>'} 스포츠</ContentTitle>
        <Search placeholder="이벤트나 작품명을 검색하세요" onSearch={handleSearch} />
        <AnimeGrid>
          {Array.from({ length: 12 }).map((_, index) => (
            <AnimeCard key={index}>
              <AnimeImage />
              <AnimeTitle>귀멸의 칼날 x 온천 콜라보</AnimeTitle>
            </AnimeCard>
          ))}
        </AnimeGrid>
      </MainContent>
    </Container>
  );
};

export default Category;
