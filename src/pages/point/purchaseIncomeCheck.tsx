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
import Star from '../../assets/img/star.png';

const PurchaseIncomeCheck: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'purchase' | 'income'>('purchase');
  const [purchaseData, setPurchaseData] = useState<TransactionsUsagesResponse | null>(null);
  const [incomeData, setIncomeData] = useState<TransactionsEarningsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // currentPage를 0이 아닌 1로 시작하도록 수정
  const [currentPage, setCurrentPage] = useState(1); // 초기값을 1로 설정

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
          const response = await pointAPI.transactionsusages(currentPage - 1, itemsPerPage); // page 값을 0부터 전달
          if (response.isSuccess) setPurchaseData(response);
        } else {
          const response = await pointAPI.transactionsearning(currentPage - 1, itemsPerPage); // page 값을 0부터 전달
          if (response.isSuccess) setIncomeData(response);
        }
      } catch (err) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, currentPage]);

  const navigate = useNavigate();
  const dataList =
    activeTab === 'purchase'
      ? purchaseData?.result?.transactions?.map(({ purchasedAt, title, point }) => ({
          date: purchasedAt ?? '',
          listname: title ?? '제목 없음',
          status: point !== undefined ? `${point > 0 ? '+' : ''}${point}` : '0',
        })) || []
      : incomeData?.result?.transactions?.map(({ purchasedAt, title, point }) => ({
          date: purchasedAt ?? '',
          listname: title ?? '제목 없음',
          status: point !== undefined ? `+${point}` : '0',
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
                </LeftGroup>
                <RightGroup>
                  <Used>{item.status}</Used>
                </RightGroup>
              </PointRow>
            ))
          ) : (
            <DateTime>
              {activeTab === 'purchase' ? '구매 내역이 없습니다.' : '수익 내역이 없습니다.'}
            </DateTime>
          )}
          <PaginationContainer>
            <PaginationButton
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} // currentPage가 0이 아닌 1로 처리
              disabled={currentPage === 1} // currentPage가 1이면 왼쪽 버튼 비활성화
            >
              {'<'}
            </PaginationButton>
            <PageNumber>
              {currentPage} / {totalPages}
            </PageNumber>
            <PaginationButton
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} // currentPage가 totalPages보다 커지지 않도록 처리
              disabled={currentPage === totalPages} // currentPage가 totalPages이면 오른쪽 버튼 비활성화
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
