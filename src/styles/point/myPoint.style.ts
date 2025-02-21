import styled from 'styled-components';
import '../font.css';
import { FaCheck } from 'react-icons/fa6';

export const DividerFirst = styled.img`
  width: 1450px;
  margin-top: 70px;
`;

export const PageNumber = styled.div`
  display: flex;
  font-family: 'Gothic A1';
  align-self: center;
  font-size: 20px;
  font-weight: 600;
  line-height: 25px;
  color: #000000;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 90%;
  justify-content: center;
  align-items: center;
  overflow-y: auto; /* 세로 스크롤이 가능하도록 설정 */
  overflow-x: hidden; /* 가로 스크롤 숨기기 */
  scrollbar-width: thin; /* Firefox에서 스크롤바를 얇게 설정 */
  position: relative;
  background-color: #101148;

  /* Webkit 브라우저에서 스크롤바 숨기기 */
  ::-webkit-scrollbar {
    width: 0; /* 세로 스크롤바 숨기기 */
  }

  ::-webkit-scrollbar-thumb {
    background: transparent; /* 스크롤바 핸들을 투명으로 설정 */
  }
`;

export const Title = styled.div`
  display: flex;
  position: relative;
  font-family: 'Gothic A1';
  align-self: flex-start;
  font-size: 38px;
  font-weight: 600;
  line-height: 47.5px;
  color: #ffffff;
  margin-top: 32px;
  margin-left: 56px;
  flex-shrink: 0;
`;

export const MyPointContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 1450px;
  height: 138px;
  background: #ffffff;
  border-radius: 20px;
  margin-top: 22px;
  border: 1.5px solid #605f5f;
`;

export const PointContainer = styled.div`
  display: flex;
  align-self: center;
  justify-content: space-between;
  width: 100%; // 버튼 간 간격을 조절할 수 있습니다.
`;

export const PointChargeListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 1450px;
  background: #ffffff;
  border-radius: 20px;
  margin-top: 32px;
  margin-bottom: 67px;
`;

export const Name = styled.div`
  display: flex;
  font-family: 'Gothic A1';
  font-size: 30px;
  font-weight: 600;
  line-height: 37.5px;
  color: #101148;
  margin-top: 24px;
  margin-left: 33px;
  align-self: flex-start;
  margin-bottom: 11px;
`;

export const Point = styled.div`
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

export const ButtonContainer = styled.div`
  display: flex;
  align-self: flex-end;
  justify-content: space-between;
  margin-right: 23px;
`;

export const StyledFaCheck = styled(FaCheck)`
  margin-right: 4px;
`;

export const ChargeButton = styled.button`
  display: flex;
  font-family: 'Gothic A1';
  font-size: 20px;
  font-weight: 600;
  line-height: 25px;
  color: #605f5f;
  padding: 0px;
  margin-right: 26px;
`;

export const CheckButton = styled.button`
  display: flex;
  font-family: 'Gothic A1';
  font-size: 20px;
  font-weight: 600;
  line-height: 25px;
  color: #605f5f;
  padding: 0px;
`;

export const LeftGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
  gap: 9px;
`;

export const RightGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 49px;
  gap: 9px;
`;

export const DateTime = styled.div`
  display: flex;
  font-family: 'Gothic A1';
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  color: #000000;
  margin-left: 85px;
  margin-top: 20px;
`;

export const Payment = styled.div`
  display: flex;
  font-family: 'Gothic A1';
  font-size: 20px;
  font-weight: 500;
  line-height: 20px;
  color: #000000;
  margin-left: 84px;
  margin-bottom: 49px;
`;

export const Name2 = styled.div`
  display: flex;
  font-family: 'Gothic A1';
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  color: #101148;
  margin-right: 135px;
  margin-bottom: 20px;
`;

export const Used = styled.div`
  display: flex;
  font-family: 'Gothic A1';
  font-size: 20px;
  font-weight: 500;
  line-height: 25px;
  color: #000000;
  margin-right: 86px;
`;

export const Divider = styled.hr`
  border: 1px solid #464654;
  width: 1300px;
  position: relative;
`;

export const PointRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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
