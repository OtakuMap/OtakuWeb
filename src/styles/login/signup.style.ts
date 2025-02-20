import styled from 'styled-components';
import Backgroundimg from '../../assets/logorepeat.png';
import '../font.css';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: url(${Backgroundimg});
  background-size: cover;
  background-position: center;
`;

export const SignupBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 806px;
  max-height: 90%;
  background: #101148;
  border-radius: 20px;
  overflow-y: auto;
  scrollbar-width: none;
`;

export const Title = styled.div`
  text-align: center;
  font-family: 'Gothic A1';
  font-size: 24px;
  font-weight: 600;
  line-height: 30px;
  color: #ffffff;
  margin-top: 30px;
  margin-bottom: 37px;
`;

export const InputBox = styled.div`
  width: 549px;
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const FormGroup2 = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  margin-top: 37px;
  margin-bottom: 10px;
`;

export const FormGroup3 = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  margin-top: 37px;
  margin-bottom: 20px;
`;

export const FormGroup4 = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 60px;
`;

export const Name = styled.label`
  width: 154px;
  position: relative;
  font-family: 'Gothic A1';
  font-size: 20px;
  font-weight: 600;
  line-height: 25px;
  color: #ffffff;
  flex-shrink: 0;
`;

export const Input = styled.input`
  width: 395.25px;
  height: 60px;
  padding: 20px 20px;
  font-size: 18px;
  background-color: #101148;
  color: #ffffff;
  border: 2px solid #d1c1ff;
  border-radius: 20px;
  &::placeholder {
    color: #999797;
    font-size: 18px;
  }
  &:-webkit-autofill {
    background-color: #101148 !important;
    -webkit-text-fill-color: #ffffff !important;
    -webkit-box-shadow: 0 0 0px 1000px #101148 inset !important;
    color: #ffffff !important;
  }
`;

export const InputShort = styled.input`
  width: 303px;
  height: 60px;
  padding: 20px 20px;
  font-size: 18px;
  background-color: #101148;
  color: #ffffff;
  border: 2px solid #d1c1ff;
  border-radius: 20px;
  &::placeholder {
    color: #999797;
    font-size: 18px;
  }
  &:-webkit-autofill {
    background-color: #101148 !important;
    -webkit-text-fill-color: #ffffff !important;
    -webkit-box-shadow: 0 0 0px 1000px #101148 inset !important;
    color: #ffffff !important;
  }
`;

export const VerifyButton = styled.button`
  height: 60px;
  width: 84px;
  background-color: #bdaee5;
  color: #101148;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  line-height: 15px;
  cursor: pointer;
  padding: 0px;
`;
export const DetailText = styled.label`
  text-align: flex-start;
  font-family: 'Gothic A1';
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #999797;
  width: 419px;
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: -25px;
`;

export const VerifyButtonShort = styled.button`
  height: 60px;
  width: 84px;
  background-color: #bdaee5;
  color: #101148;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  line-height: 15px;
  cursor: pointer;
  padding: 0px;
`;

export const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 440px;
  margin-bottom: 60px;
`;

export const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
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

export const CheckboxLabel = styled.label`
  font-family: 'Gothic A1';
  font-size: 18px;
  line-height: 22.5px;
  color: #ffffff;
  text-align: right;
  flex: 1;
`;

export const Openbutton = styled.a`
  font-family: 'Gothic A1';
  line-height: 22.5px;
  font-size: 18px;
  color: #999797;
  cursor: pointer;
`;

export const Divider = styled.hr`
  margin-bottom: 22px;
  height: 1px;
  background-color: #ffffff;
  width: 700px;
`;

export const ActionLink = styled.a`
  font-family: 'Gothic A1';
  font-size: 24px;
  color: #ffffff;
  cursor: pointer;
  margin-bottom: 82px;
`;

export const CheckIcon1 = styled.img`
  position: absolute;
  margin-left: 423px;
`;

export const CheckIcon2 = styled.img`
  position: absolute;
  margin-right: 17px;
  margin-top: 22px;
`;

export const TermsContent = styled.div`
  width: 395px;
  font-family: 'Gothic A1';
  color: #999797;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
  margin-top: 10px;
`;

export const Terms = styled.img`
  margin-top: 2px;
  width: 487px;
`;
