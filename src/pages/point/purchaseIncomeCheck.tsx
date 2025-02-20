/*
api 완료시 이 코드 사용
import React, { useEffect, useState } from 'react';
import {
  TitleContainer,
  Pagebutton,
  Title,
  PurchaseTitle,
  Container,
  ContentWrapper,
  IncomeTitle,
  PointRow,
  LeftGroup,
  TabContainer,
  Tab,
  EventListContainer,
  RightGroup,
  DateTime,
  Used,
  PaginationContainer,
  PaginationButton,
  PageNumber,
  DividerFirst,
  Divider,
  Listname,
  Img,
} from '../../styles/point/purchaseIncomeCheck.style';
import { pointAPI } from '@/api/point/pointAPI';
import { TransactionsUsagesResponse, TransactionsEarningsResponse } from '@/types/point/point';
import Dimg from '../../assets/img/purpledivider.png';
import Prepage from '../../assets/img/prepagewhite.svg';
import { useNavigate } from 'react-router-dom';
import start from '../../assets/img/star.png';

const PurchaseIncomeCheck: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'purchase' | 'income'>('purchase');
  const [purchaseData, setPurchaseData] = useState<TransactionsUsagesResponse | null>(null);
  const [incomeData, setIncomeData] = useState<TransactionsEarningsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 날짜 포맷 변환 함수
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 +1)
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}. ${month}. ${day}. ${hours}:${minutes}`;
  };

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
  const navigate = useNavigate();
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
      <DividerFirst src={Dimg} />
      <ContentWrapper>
        <TitleContainer>
          <Pagebutton src={Prepage} onClick={() => navigate('/my-point')}></Pagebutton>
          <Title>구매/수익 확인하기</Title>
          <Img src={Star} />
        </TitleContainer>
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
          <Divider />
          {displayedItems.length > 0 ? (
            displayedItems.map((item, index) => (
              <PointRow key={index}>
                <LeftGroup>
                  <DateTime>{formatDate(item.purchasedAt)}</DateTime>
                  <Listname>{item.title}</Listname>
                </LeftGroup>
                <RightGroup>
                  <Used>{item.point}</Used>
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
*/

import React, { useEffect, useState } from 'react';
import {
  TitleContainer,
  Pagebutton,
  Title,
  PurchaseTitle,
  Container,
  ContentWrapper,
  IncomeTitle,
  PointRow,
  LeftGroup,
  TabContainer,
  Tab,
  EventListContainer,
  RightGroup,
  DateTime,
  Used,
  PaginationContainer,
  PaginationButton,
  PageNumber,
  DividerFirst,
  Divider,
  Listname,
  RemainPoint,
  Img,
} from '../../styles/point/purchaseIncomeCheck.style';
import Dimg from '../../assets/img/purpledivider.png';
import Prepage from '../../assets/img/prepagewhite.svg';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { pointAPI } from '@/api/point/pointAPI';
import Star from '../../assets/img/star.png';

const PurchaseIncomeCheck: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'purchase' | 'income'>('purchase');
  const [purchaseData, setPurchaseData] = useState<any | null>(null); // 임시 데이터 타입
  const [incomeData, setIncomeData] = useState<any | null>(null); // 임시 데이터 타입
  const [balance, setBalance] = useState<number>(0); // balance state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 날짜 포맷 변환 함수
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 +1)
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}. ${month}. ${day}. ${hours}:${minutes}`;
  };

  const location = useLocation();
  // API 호출하여 balance 값 가져오기
  const fetchBalance = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await pointAPI.balance();
      if (response.isSuccess && response.result) {
        setBalance(Number(response.result.point) || 0);
      } else {
        setError('잔액 정보를 불러오는 중 오류가 발생했습니다.');
      }
    } catch (err) {
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch balance data when component mounts
    fetchBalance();

    // API 호출 부분 주석 처리
    /*
    const fetchData = async () => {
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
    */

    // 임의의 데이터 설정
    const mockPurchaseData = {
      isSuccess: true,
      result: {
        transactions: [
          { purchasedAt: '2025-02-15T10:30:00Z', title: '상품 1', point: 500 },
          { purchasedAt: '2025-02-16T14:45:00Z', title: '상품 2', point: -200 },
          { purchasedAt: '2025-02-17T09:00:00Z', title: '상품 3', point: 300 },
          { purchasedAt: '2025-02-18T13:30:00Z', title: '상품 4', point: 150 },
          { purchasedAt: '2025-02-19T08:15:00Z', title: '상품 5', point: -100 },
          { purchasedAt: '2025-02-20T17:00:00Z', title: '상품 6', point: 250 },
        ],
      },
    };

    const mockIncomeData = {
      isSuccess: true,
      result: {
        transactions: [
          { earnedAt: '2025-02-14T11:00:00Z', title: '수익 1', point: 100 },
          { earnedAt: '2025-02-16T12:30:00Z', title: '수익 2', point: 200 },
          { earnedAt: '2025-02-17T15:00:00Z', title: '수익 3', point: 300 },
          { earnedAt: '2025-02-18T10:00:00Z', title: '수익 4', point: 150 },
          { earnedAt: '2025-02-19T16:30:00Z', title: '수익 5', point: 100 },
          { earnedAt: '2025-02-20T13:00:00Z', title: '수익 6', point: 400 },
        ],
      },
    };

    if (activeTab === 'purchase') {
      setPurchaseData(mockPurchaseData);
    } else {
      setIncomeData(mockIncomeData);
    }

    setLoading(false);
  }, [activeTab]);
  const navigate = useNavigate();
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
      <DividerFirst src={Dimg} />
      <ContentWrapper>
        <TitleContainer>
          <Pagebutton src={Prepage} onClick={() => navigate('/my-point')}></Pagebutton>
          <Title>구매/수익 확인하기</Title>
          <Img src={Star} />
        </TitleContainer>

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
          <Divider />
          {displayedItems.length > 0 ? (
            displayedItems.map((item, index) => (
              <PointRow key={index}>
                <LeftGroup>
                  <DateTime>{formatDate(item.date)}</DateTime>
                  <Listname>{item.listname}</Listname>
                  <RemainPoint>{balance}P</RemainPoint>
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
