import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #0c004b;
  width: 100vw;
`;

const MainContainer = styled.div`
  margin-top: 80px;
  display: flex;
  flex: 1;
`;

const Sidebar = styled.aside`
  width: 240px;
  background-color: #1a005f; /* 사이드바 배경색 */
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px; /* 섹션 간격 */
  border-right: 2px solid rgba(255, 255, 255, 0.2); /* 구분선 */
`;

const SidebarSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px; /* 세로 간격 */
`;

const HorizontalMenu = styled.div`
  display: flex;
  flex-direction: row; /* 가로 배열 */
  gap: 12px; /* 버튼 간 간격 */
`;

const VerticalMenu = styled.div`
  display: flex;
  flex-direction: column; /* 세로 배열 */
  gap: 8px; /* 버튼 간 간격 */
`;

const MainCategory = styled.button<{ isActive?: boolean }>`
  flex: 1; /* 버튼이 동일한 너비를 가질 수 있도록 설정 */
  padding: 12px;
  text-align: center;
  background-color: ${(props) => (props.isActive ? '#e6e1ff' : 'transparent')};
  color: ${(props) => (props.isActive ? '#13005f' : '#fff')};
  border: none;
  cursor: pointer;
  font-size: 16px; /* 주요 카테고리 큰 글씨 */
  font-weight: 600; /* 굵은 폰트 */

  &:hover {
    background-color: ${(props) => (props.isActive ? '#e6e1ff' : 'rgba(255, 255, 255, 0.1)')};
  }
`;

const SubCategoryButton = styled(MainCategory)`
  text-align: left;
  padding: 8px 16px; /* 여백 조정 */
  font-size: 14px; /* 작은 글씨 */
  font-weight: normal; /* 기본 두께 */
`;

const MainContent = styled.main`
  flex: 1;
  padding: 24px;
`;

const ContentHeader = styled.div`
  margin-bottom: 24px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  color: white;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;

  &::after {
    content: '>';
    margin-left: 8px;
  }
`;

const SearchBar = styled.div`
  position: relative;
  max-width: 500px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  padding-left: 40px;
  border-radius: 8px;
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.5);
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const GridItem = styled.div`
  aspect-ratio: 1;
  background-color: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`;

const ItemImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ddd;
`;

const ItemTitle = styled.div`
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 14px;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const Category = () => {
  return (
    <PageContainer>
      <MainContainer>
        <Sidebar>
          {/* 상위 카테고리 - 가로 배열 */}
          <HorizontalMenu>
            <MainCategory isActive={true}>전체</MainCategory>
            <MainCategory>이벤트</MainCategory>
            <MainCategory>성지순례</MainCategory>
          </HorizontalMenu>

          {/* 하위 카테고리 - 세로 배열 */}
          <SidebarSection>
            <VerticalMenu>
              <SubCategoryButton>장르별</SubCategoryButton>
              <SubCategoryButton>제작사</SubCategoryButton>
            </VerticalMenu>
          </SidebarSection>
        </Sidebar>

        <MainContent>
          <ContentHeader>
            <PageTitle>장르별 스포츠</PageTitle>
            <SearchBar>
              <SearchIcon></SearchIcon>
              <SearchInput placeholder="이벤트나 작품명을 검색하세요" />
            </SearchBar>
          </ContentHeader>

          <GridContainer>
            {Array(12)
              .fill(0)
              .map((_, index) => (
                <GridItem key={index}>
                  <ItemImage />
                  <ItemTitle>귀멸의 칼날 x 온천 콜라보</ItemTitle>
                </GridItem>
              ))}
          </GridContainer>
        </MainContent>
      </MainContainer>
    </PageContainer>
  );
};

export default Category;
