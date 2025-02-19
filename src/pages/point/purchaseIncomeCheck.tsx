import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { pointAPI } from '@/api/point/pointAPI';
import { TransactionsUsagesResponse, TransactionsEarningsResponse } from '@/types/point';

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
  font-family: 'Gothic A1';
  font-size: 30px;
  font-weight: 700;
  color: #000;
  margin-bottom: 10px;
`;

const IncomeTitle = styled(PurchaseTitle)``;

const PointRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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
  font-family: 'Gothic A1';
  font-size: 20px;
  font-weight: 600;
  color: #000;
`;

const Listname = styled.div`
  font-family: 'Gothic A1';
  font-size: 16px;
  font-weight: 500;
  color: #000;
`;

const Used = styled.div`
  font-family: 'Gothic A1';
  font-size: 30px;
  font-weight: 500;
  color: #1e68f0;
`;

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
  font-family: 'Gothic A1';
  font-size: 20px;
  font-weight: 600;
  color: #000;
`;

const PurchaseIncomeCheck: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'purchase' | 'income'>('purchase');
  const [purchaseData, setPurchaseData] = useState<TransactionsUsagesResponse | null>(null);
  const [incomeData, setIncomeData] = useState<TransactionsEarningsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (activeTab === 'purchase') {
          const response = await pointAPI.transactionsusages();
          if (response.isSuccess) setPurchaseData(response);
        } else {
          const response = await pointAPI.transactionsearning();
          if (response.isSuccess) setIncomeData(response);
        }
      } catch (err) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const dataList =
    activeTab === 'purchase'
      ? purchaseData?.result?.transactions.map(({ purchasedAt, title, point }) => ({
          date: purchasedAt,
          listname: title,
          status: `${point > 0 ? '+' : ''}${point}`,
        })) || []
      : incomeData?.result?.transactions.map(({ earnedAt, title, point }) => ({
          date: earnedAt,
          listname: title,
          status: `+${point}`,
        })) || [];

  const totalPages = Math.ceil(dataList.length / itemsPerPage) || 1;
  const displayedItems = dataList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

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
            <PurchaseTitle>구매 내역</PurchaseTitle>
          ) : (
            <IncomeTitle>수익 내역</IncomeTitle>
          )}
          {displayedItems.length > 0 ? (
            displayedItems.map((item, index) => (
              <PointRow key={index}>
                <LeftGroup>
                  <DateTime>{item.date}</DateTime>
                  <Listname>{item.listname}</Listname>
                </LeftGroup>
                <RightGroup>
                  <Used>{item.status}</Used>
                </RightGroup>
              </PointRow>
            ))
          ) : (
            <p>{activeTab === 'purchase' ? '구매 내역이 없습니다.' : '수익 내역이 없습니다.'}</p>
          )}
          <PaginationContainer>
            <PaginationButton
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              {'<'}
            </PaginationButton>
            <PageNumber>
              {currentPage} / {totalPages}
            </PageNumber>
            <PaginationButton
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
