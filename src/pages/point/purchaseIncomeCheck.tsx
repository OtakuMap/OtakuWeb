import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  position: relative;
  max-height: 90%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #101148;
  overflow-y: auto;
  scrollbar-width: none;
`;

const ContentWrapper = styled.div`
  width: 1197px;
  margin: 0 auto;
  background-color: #101148;
`;

const Title = styled.h1`
  font-family: 'Gothic A1';
  margin-top: 121px;
  font-size: 38px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 25px;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 28px;
  margin-bottom: 0px;
`;

const Tab = styled.button<{ $active?: boolean }>`
  width: 194px;
  height: 81px;
  border: none;
  background-color: ${(props) => (props.$active ? '#fff' : '#CCC')};
  color: ${(props) => (props.$active ? '#000' : '#464654')};
  border-radius: 20px 20px 0px 0px;
  cursor: pointer;
  text-align: center;
  font-family: 'Gothic A1';
  font-size: 20px;
  font-weight: 600;
`;

const EventListContainer = styled.div`
  background: white;
  border-radius: 0px 20px 20px 20px;
  padding: 24px 80px;
`;

const PurchaseTitle = styled.div`
  display: flex;
  font-family: 'Gothic A1';
  font-size: 30px;
  font-weight: 700;
  color: #000000; /* font-color -> color로 수정 */
  margin-bottom: 10px;
`;

const IncomeTitle = styled.div`
  display: flex;
  font-family: 'Gothic A1';
  font-size: 30px;
  font-weight: 700;
  color: #000000; /* font-color -> color로 수정 */
  margin-bottom: 10px;
`;

const LeftGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
  gap: 9px;
`;

const RightGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 49px;
  gap: 9px;
`;

const DateTime = styled.div`
  display: flex;
  font-family: 'Gothic A1';
  font-size: 20px;
  font-weight: 600;
  color: #000000;
`;

const PointRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Divider = styled.hr`
  border: 1px solid #000;
  width: 1053px;
  position: relative;
`;

const Listname = styled.div`
  display: flex;
  font-family: 'Gothic A1';
  font-size: 16px;
  font-weight: 500;
  color: #000000;
`;
const RemainBalance = styled.div`
  display: flex;
  font-family: 'Gothic A1';
  font-size: 16px;
  font-weight: 500;
  color: #605f5f;
`;
const Used = styled.div`
  display: flex;
  font-family: 'Gothic A1';
  font-size: 30px;
  font-weight: 500;
  color: #1e68f0;
`;

const PurchaseIncomeCheck: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'purchase' | 'income'>('purchase');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const purchaseItems = [
    { date: '2024-02-10', listname: '구매한 게시글 1', status: '-500' },
    { date: '2024-02-11', listname: '구매한 게시글 2', status: '-500' },
    { date: '2024-02-11', listname: '구매한 게시글 2', status: '-500' },
    { date: '2024-02-11', listname: '구매한 게시글 2', status: '-500' },
    { date: '2024-02-11', listname: '구매한 게시글 2', status: '-500' },
    { date: '2024-02-11', listname: '수익난 게시글 2', status: '+500' },
  ];

  const incomeItems = [
    { date: '2024-02-10', listname: '수익난 게시글 1', status: '+500' },
    { date: '2024-02-11', listname: '수익난 게시글 2', status: '+500' },
    { date: '2024-02-11', listname: '수익난 게시글 2', status: '+500' },
    { date: '2024-02-11', listname: '수익난 게시글 2', status: '+500' },
    { date: '2024-02-11', listname: '수익난 게시글 2', status: '+500' },
    { date: '2024-02-11', listname: '수익난 게시글 2', status: '+500' },
    { date: '2024-02-11', listname: '수익난 게시글 2', status: '+500' },
  ];

  const dataList = activeTab === 'purchase' ? purchaseItems : incomeItems;

  // 총 페이지 수 계산
  const totalPages = Math.ceil(dataList.length / itemsPerPage) || 1;

  // 현재 페이지에 해당하는 아이템 가져오기
  const displayedItems = dataList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 탭 변경 시 페이지를 1로 리셋
  const handleTabChange = (tab: 'purchase' | 'income') => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <Container>
      <ContentWrapper>
        <Title>구매/수익 확인하기</Title>
        <TabContainer>
          <Tab $active={activeTab === 'purchase'} onClick={() => setActiveTab('purchase')}>
            구매 내역 확인
          </Tab>
          <Tab $active={activeTab === 'income'} onClick={() => setActiveTab('income')}>
            수익 내역 확인
          </Tab>
        </TabContainer>
        <EventListContainer>
          {activeTab === 'purchase' ? (
            <>
              <PurchaseTitle>구매 내역</PurchaseTitle>
              <Divider />
              {displayedItems.length > 0 ? (
                displayedItems.map((item, index) => (
                  <PointRow key={index}>
                    <LeftGroup>
                      <DateTime>{item.date}</DateTime>
                      <Listname>{item.listname}</Listname>
                      <RemainBalance>최종 남은 포인트</RemainBalance>
                    </LeftGroup>
                    <RightGroup>
                      <Used>{item.status}</Used>
                    </RightGroup>
                  </PointRow>
                ))
              ) : (
                <p>구매 내역이 없습니다.</p>
              )}
            </>
          ) : (
            <>
              <IncomeTitle>수익 내역</IncomeTitle>
              <Divider />
              {displayedItems.length > 0 ? (
                displayedItems.map((item, index) => (
                  <PointRow key={index}>
                    <LeftGroup>
                      <DateTime>{item.date}</DateTime>
                      <Listname>{item.listname}</Listname>
                      <RemainBalance>최종 남은 포인트</RemainBalance>
                    </LeftGroup>
                    <RightGroup>
                      <Used>{item.status}</Used>
                    </RightGroup>
                  </PointRow>
                ))
              ) : (
                <p>수익 내역이 없습니다.</p>
              )}
            </>
          )}

          <PaginationContainer>
            <PaginationButton onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
              {'<'}
            </PaginationButton>
            <PageNumber>
              {currentPage} / {totalPages}
            </PageNumber>
            <PaginationButton
              onClick={() => handlePageChange('next')}
              disabled={currentPage === totalPages}
            >
              {'>'}
            </PaginationButton>
          </PaginationContainer>
        </EventListContainer>
      </ContentWrapper>
    </Container>
  );
};

export default PurchaseIncomeCheck;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

const PaginationButton = styled.button`
  margin: 0 8px;
  background: none;
  border: none;
  font-size: 16px;
  color: #101148;
  cursor: pointer;

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;
const PageNumber = styled.div`
  display: flex;
  font-family: 'Gothic A1';
  align-self: flex-start;
  font-size: 20px;
  font-weight: 600;
  line-height: 25px;
  color: #000000;
`;
