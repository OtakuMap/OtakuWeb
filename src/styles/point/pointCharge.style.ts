import styled from 'styled-components';

export const DividerFirst = styled.img`
  width: 1450px;
  margin-top: 70px;
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  max-height: 90%;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  scrollbar-width: none;
  overflow-y: auto;
  background-color: #101148;
`;
export const Title = styled.div`
  display: flex;
  position: relative;
  font-family: 'Gothic A1';
  align-self: flex-start;
  font-size: 38px;
  font-weight: 600;
  line-height: 38px;
  color: #ffffff;
  margin-top: 32px;
  margin-left: 56px;
  flex-shrink: 0;
  margin-bottom: 42px;
`;

export const PointChargeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 854px;
  height: auto;
  background: #ffffff;
  border-radius: 20px;
  overflow-y: hidden;
  overflow-x: hidden;
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 16px;
  width: 656px;
`;
export const Divider = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 700px;
  border: 1px solid #464654;
`;

export const DetailTitle = styled.div`
  width: 656px;
  font-family: 'Gothic A1';
  color: #464654;
  font-size: 20px;
  font-weight: 600;
  line-height: 25px;
  align-items: flex-start;
  margin-bottom: 13px;
`;

export const DetailText = styled.div`
  font-family: 'Gothic A1';
  color: #464654;
  font-size: 15px;
  font-weight: 600;
  line-height: 25px;
  cursor: pointer;
  text-align: flex-start;
  width: 656px;
`;

export const ChargeButton = styled.button`
  display: flex;
  width: 171px;
  height: 55px;
  background-color: #ffc50c;
  color: #000000;
  border-radius: 20px;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  margin-top: 64px;
  margin-bottom: 60px;
  justify-content: center; /* 가로 정렬 */
  align-items: center; /* 세로 정렬 */
`;

export const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 656px;
  margin-top: 16px;
  align-items: flex-start;
`;

export const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Gothic A1';
  color: #101148;
  font-size: 20px;
  font-weight: 600;
  line-height: 25px;
  width: 858px;
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  border: 2px solid #d1c4e9; /* 연보라색 테두리 */
  background-color: #d1c4e9; /* 기본 연보라색 배경 */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 14px;

  &:checked {
    background-color: #d1c4e9; /* 체크 후에도 연보라색 유지 */
    position: relative;
  }

  &:checked::after {
    content: ' '; /* 기본 체크 표시 */
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 10px;
    border: solid #6b38fd;
    border-width: 0 0 5px 5px;
    transform: translate(-50%, -70%) rotate(-45deg);
    border-radius: 3px;
  }
`;

export const Pagebutton = styled.div`
  width: 16px;
  height: 37px;
  margin-right: 20px;
  align-self: flex-start;
  margin-left: 85px;
  margin-top: 63px;
`;

export const SubTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #101148;
  align-self: flex-start;
  margin-top: 68px;
  line-height: 30px;
`;
export const SubTitle2 = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #101148;
  align-self: flex-start;
  line-height: 30px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
  margin-right: 86px;
`;

export const PointGroup = styled.div`
  margin-left: 75px;
  display: flex;
  align-items: center;
  margin-top: 57px;
`;

export const InputGroup = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 21px;
`;

export const Input1000 = styled.div`
  display: flex;
  border-radius: 20px;
  width: 293px;
  height: 49px;
  border: 1px solid #101148;
  flex-direction: column;
  margin-bottom: 45px;
  color: #000;
  align-items: flex-start;
  justify-content: center;
  padding: 12px;
  font-family: 'Gothic A1';
  font-size: 20px;
  font-weight: 500;
`;

export const Input5000 = styled.div`
  display: flex;
  border-radius: 20px;
  width: 293px;
  height: 49px;
  border: 1px solid #101148;
  flex-direction: column;
  margin-bottom: 45px;
  color: #000;
  align-items: flex-start;
  justify-content: center;
  padding: 12px;
  font-family: 'Gothic A1';
  font-size: 20px;
  font-weight: 500;
`;

export const Input10000 = styled.div`
  display: flex;
  border-radius: 20px;
  width: 293px;
  height: 49px;
  border: 1px solid #101148;
  flex-direction: column;
  margin-bottom: 45px;
  color: #000;
  align-items: flex-start;
  justify-content: center;
  padding: 12px;
  font-family: 'Gothic A1';
  font-size: 20px;
  font-weight: 500;
`;

export const Button = styled.button`
  display: flex;
  border-radius: 20px;
  width: 108px;
  height: 49px;
  flex-direction: column;
  background: #9a86d3;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  font-family: 'Gothic A1';
  margin-bottom: 45px;
  color: #fff;
  padding: 14px;
  font-family: 'Gothic A1';
  font-size: 20px;
  font-weight: 500;
  align-items: center;
`;

export const Purchase = styled.div`
  font-size: 24px;
  font-weight: 600
  margin-bottom: 37px;
  color: #101148;
  font-family: 'Gothic A1';
  margin-left: 130px;
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
`;

export const PurchaseGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  width: 810px;
  height: auto;
  max-height: 90%;
  background: #ffffff;
  border-radius: 20px;
  margin-left: 200px;
  margin-bottom: 37px;
`;
