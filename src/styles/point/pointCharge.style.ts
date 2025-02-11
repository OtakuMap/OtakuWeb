import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: auto; /* Set to 100vh to ensure it takes up the full screen */
  max-height: 90%; /* Ensure no height limitation */
  justify-content: flex-start; /* Align content from the top */
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
  margin-top: 121px;
  margin-left: 56px;
  flex-shrink: 0;
`;
export const PointChargeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 854px;
  height: auto;
  max-height: 90%;
  background: #ffffff;
  border-radius: 20px;
  overflow-y: auto;
  scrollbar-width: none;
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
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  cursor: pointer;
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
  padding: 16px 41px;
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
  align-items: flex-start;
  font-family: 'Gothic A1';
  color: #101148;
  font-size: 20px;
  font-weight: 600;
  line-height: 25px;
  width: 858px;
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 30px;
  height: 30px;
  accent-color: #bdaee5; /* 체크박스 색상 */
  cursor: pointer;
  margin-right: 14px;
`;

export const Pagebutton = styled.div`
  width: 16px;
  height: 37px;
  margin-right: 20px;
`;

export const SubTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #101148;
`;

export const ButtonGroup = styled.div`
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
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
`;

export const Purchase = styled.div`
  font-size: 24px;
  font-weight: 600
  margin-bottom: 37px;
  color: #101148;
  font-family: 'Gothic A1';
  margin-left:98px;
`;

export const Header = styled.div`
  align-items: center;
  gap: 10px;
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
