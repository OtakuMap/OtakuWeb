import styled from 'styled-components';
import '../font.css';

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-left: 43px; /* 기존 Title의 margin-left 적용 */
`;

export const Pagebutton = styled.img`
  width: 16px;
  height: 37px;
  cursor: pointer;
  margin-right: 18px; /* Title과 간격 조정 */
`;

export const Img = styled.img`
  width: 130px;
  margin-right: 64px;
  margin-left: 930px;
  transform: translateY(35px);
`;

export const Title = styled.h1`
  font-family: 'Gothic A1';
  font-size: 38px;
  font-weight: 600;
  color: #fff;
  margin-top: 32px;
  margin-bottom: 25px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  max-height: 90%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #101148;
  overflow-y: auto;
  scrollbar-width: none;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  background-color: #101148;
`;

export const TabContainer = styled.div`
  display: flex;
  margin-bottom: 0px;
  width: 1450px; /* EventListContainer와 동일한 너비 설정 */
  margin: 0 auto; /* 중앙 정렬 */
`;

export const Tab = styled.button<{ $active?: boolean }>`
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
  margin-right: 28px;
`;

export const EventListContainer = styled.div`
  background: white;
  border-radius: 0px 20px 20px 20px;
  padding: 24px 80px;
  width: 1450px;
  align-items: center;
  justify-content: center;
  margin: 0 auto; /* 가운데 정렬 */
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;

export const PurchaseTitle = styled.div`
  font-family: 'Gothic A1';
  font-size: 30px;
  font-weight: 700;
  color: #000;
  margin-bottom: 10px;
  align-self: flex-start; /* 왼쪽 정렬 */
  margin-top: 23px;
`;

export const IncomeTitle = styled(PurchaseTitle)``;

export const PointRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const LeftGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 9px;
`;

export const RightGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DateTime = styled.div`
  font-family: 'Gothic A1';
  font-size: 20px;
  font-weight: 600;
  color: #000;
  margin-left: 57px;
`;

export const Listname = styled.div`
  font-family: 'Gothic A1';
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  color: #000;
  margin-left: 57px;
`;

export const Used = styled.div`
  font-family: 'Gothic A1';
  font-size: 30px;
  font-weight: 500;
  color: #1e68f0;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
`;

export const RemainPoint = styled.div`
  font-family: 'Gothic A1';
  font-size: 16px;
  font-weight: 500;
  color: #605f5f;
  margin-left: 57px;
  margin-bottom: 40px;
`;
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 55px;
  margin-bottom: 26px;
`;

export const PaginationButton = styled.button`
  margin: 0 8px;
  background: none;
  border: none;
  font-size: 16px;
  color: #101148;
  cursor: pointer;
  margin-left: 41px;
  margin-right: 41px;
  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

export const PageNumber = styled.div`
  font-family: 'Gothic A1';
  font-size: 20px;
  font-weight: 600;
  color: #000;
`;

export const DividerFirst = styled.img`
  width: 1450px;
  margin-top: 70px;
`;

export const Divider = styled.hr`
  width: 1300px;
  margin-top: 1px;
  color: #000000;
  margin-bottom: 61px;
`;
