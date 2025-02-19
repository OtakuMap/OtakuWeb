import { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../../styles/font.css';
import { FaCheck } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import Dimg from '../../assets/img/purpledivider.png';
import { pointAPI } from '@/api/point/pointAPI';

const MyPoint: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [balance, setBalance] = useState<number>(0);
  const [chargeHistory, setChargeHistory] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const itemsPerPage = 5;
  const displayedItems = chargeHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [balanceRes, chargeRes] = await Promise.all([
          pointAPI.balance(),
          pointAPI.transactionscharge(),
        ]);

        if (balanceRes.isSuccess && balanceRes.result) {
          setBalance(Number(balanceRes.result.point) || 0);
        } else {
          throw new Error('잔액 정보를 불러올 수 없습니다.');
        }

        if (chargeRes.isSuccess && chargeRes.result) {
          setChargeHistory(chargeRes.result.pointList ?? []);
          setTotalPages(chargeRes.result.totalPage || 1);
        } else {
          throw new Error('포인트 충전 내역을 불러올 수 없습니다.');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : '데이터 로딩 실패');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return (
      <Container>
        <Title>내 포인트 로딩</Title>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Title>내 포인트 에러</Title>
      </Container>
    );
  }

  return (
    <Container>
      <DividerFirst src={Dimg} />
      <Title>내 포인트</Title>

      <MyPointContainer>
        <PointContainer>
          <Name>보유 포인트</Name>
          <Point>{balance} P</Point>
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

        {displayedItems.map((item, index) => (
          <PointRow key={index}>
            <LeftGroup>
              <DateTime>{item.chargedAt}</DateTime>
              <Payment>{item.chargedBy}</Payment>
            </LeftGroup>
            <RightGroup>
              <Name2>{item.point} P</Name2>
              <Used>사용 완료</Used>
            </RightGroup>
          </PointRow>
        ))}

        <Divider />

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

const DividerFirst = styled.img`
  width: 1193px;
  margin-top: 130px;
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: auto;
  justify-content: center;
  align-items: center;
  overflow: visible; /* 스크롤 숨김이 아니라 표시되도록 */
  position: relative;
  background-color: #101148;
`;

const Title = styled.div`
  display: flex;
  position: relative;
  font-family: 'Gothic A1';
  align-self: flex-start;
  font-size: 38px;
  font-weight: 600;
  line-height: 47.5px;
  color: #ffffff;
  margin-top: 121px;
  margin-left: 56px;
  flex-shrink: 0;
`;

const MyPointContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 1196px;
  height: 138px;
  background: #ffffff;
  border-radius: 20px;
  margin-top: 22px;
  border: 1.5px solid #605f5f;
`;

const PointContainer = styled.div`
  display: flex;
  align-self: center;
  justify-content: space-between;
  width: 100%; // 버튼 간 간격을 조절할 수 있습니다.
`;

const PointChargeListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 1196px;
  height: 895px;
  background: #ffffff;
  border-radius: 20px;
  margin-top: 32px;
`;

const Name = styled.div`
  display: flex;
  font-family: 'Gothic A1';
  font-size: 30px;
  font-weight: 600;
  line-height: 37.5px;
  color: #101148;
  margin-top: 24px;
  margin-left: 33px;
  align-self: flex-start;
`;

const Point = styled.div`
  display: flex;
  font-family: 'Gothic A1';
  font-size: 45px;
  font-weight: 600;
  line-height: 56.25px;
  color: #101148;
  margin-top: 37px;
  margin-right: 47px;
  margin-bottom: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-self: flex-end;
  justify-content: space-between;
  margin-right: 23px;
`;

const StyledFaCheck = styled(FaCheck)`
  margin-right: 4px;
`;

const ChargeButton = styled.button`
  display: flex;
  font-family: 'Gothic A1';
  font-size: 20px;
  font-weight: 600;
  line-height: 25px;
  color: #605f5f;
  padding: 0px;
  margin-right: 26px;
`;

const CheckButton = styled.button`
  display: flex;
  font-family: 'Gothic A1';
  font-size: 20px;
  font-weight: 600;
  line-height: 25px;
  color: #605f5f;
  padding: 0px;
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
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  color: #000000;
  margin-left: 52px;
`;

const Payment = styled.div`
  display: flex;
  font-family: 'Gothic A1';
  font-size: 20px;
  font-weight: 500;
  line-height: 20px;
  color: #000000;
  margin-left: 52px;
`;

const Name2 = styled.div`
  display: flex;
  font-family: 'Gothic A1';
  font-size: 20px;
  font-weight: 500;
  line-height: 25px;
  color: #000000;
  margin-right: 85px;
`;

const Used = styled.div`
  display: flex;
  font-family: 'Gothic A1';
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  color: #f74c4c;
  margin-right: 134px;
`;

const Divider = styled.hr`
  border: 1px solid #464654;
  width: 1100px;
  position: relative;
`;

const PointRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;
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
