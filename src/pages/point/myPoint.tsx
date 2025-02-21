import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PaginationButton,
  PaginationContainer,
  PointRow,
  Divider,
  Used,
  Name2,
  Payment,
  DateTime,
  RightGroup,
  LeftGroup,
  CheckButton,
  ChargeButton,
  StyledFaCheck,
  ButtonContainer,
  Point,
  Name,
  PointChargeListContainer,
  PointContainer,
  MyPointContainer,
  Title,
  Container,
  PageNumber,
  DividerFirst,
} from '../../styles/point/myPoint.style';
import { pointAPI } from '@/api/point/pointAPI';
import Dimg from '../../assets/img/purpledivider.png';

const MyPoint: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [balance, setBalance] = useState<number>(0);
  const [chargeHistory, setChargeHistory] = useState([]);
  const [nextPageData, setNextPageData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const itemsPerPage = 5;
  const displayedItems = chargeHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
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

  const handlePageChange = (direction: 'prev' | 'next') => {
    setCurrentPage((prevPage) => {
      if (direction === 'prev' && prevPage > 1) {
        return prevPage - 1;
      } else if (direction === 'next' && prevPage < totalPages) {
        return prevPage + 1;
      }
      return prevPage;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [balanceRes, chargeRes] = await Promise.all([
          pointAPI.balance(),
          pointAPI.transactionscharge(currentPage, itemsPerPage), // ✅ itemsPerPage 추가
        ]);

        if (balanceRes.isSuccess && balanceRes.result) {
          setBalance(Number(balanceRes.result.point) || 0);
        } else {
          throw new Error('잔액 정보를 불러올 수 없습니다.');
        }

        if (chargeRes.isSuccess && chargeRes.result) {
          setChargeHistory(chargeRes.result.pointList ?? []);

          // ✅ totalPages 정확하게 업데이트
          const calculatedTotalPages = Math.ceil(
            (chargeRes.result.totalElements || 0) / itemsPerPage,
          );
          setTotalPages(calculatedTotalPages);
        } else {
          throw new Error('포인트 충전 내역을 불러올 수 없습니다.');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : '데이터 로딩 실패');
        console.error('HTTP 상태 코드:', err.response?.status);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  return (
    <Container>
      <DividerFirst src={Dimg} />
      <Title>내 포인트</Title>

      <MyPointContainer>
        <PointContainer>
          <Name>보유 포인트</Name>
          {balance === 0 ? <Point>포인트가 없습니다.</Point> : <Point>{balance} P</Point>}
        </PointContainer>
        <ButtonContainer>
          <ChargeButton onClick={() => navigate('/point-charge')}>Ⓟ 포인트 충전하기</ChargeButton>
          <CheckButton onClick={() => navigate('/purchase-income-check')}>
            <StyledFaCheck />
            구매/수익 확인하기
          </CheckButton>
        </ButtonContainer>
      </MyPointContainer>

      <PointChargeListContainer>
        <Name>포인트 충전내역</Name>

        {chargeHistory.length === 0 ? (
          <DateTime>충전 내역이 없습니다.</DateTime>
        ) : (
          displayedItems.map((item, index) => (
            <React.Fragment key={index}>
              <PointRow>
                <LeftGroup>
                  <DateTime>{formatDate(item.chargedAt)}</DateTime>
                  <Payment>{item.chargedBy}</Payment>
                </LeftGroup>
                <RightGroup>
                  <Used>충전한 포인트 금액</Used>
                  <Name2>{item.point} P</Name2>
                </RightGroup>
              </PointRow>
              {index !== displayedItems.length - 1 && <Divider />}{' '}
            </React.Fragment>
          ))
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
            disabled={currentPage >= totalPages || totalPages <= 1}
          >
            {'>'}
          </PaginationButton>
        </PaginationContainer>
      </PointChargeListContainer>
    </Container>
  );
};

export default MyPoint;
