import styled from 'styled-components';
import Backgroundimg from '../../assets/logorepeat.png';
import '../font.css';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  background-image: url(${Backgroundimg});
  background-size: cover; // 화면 크기에 맞게 이미지 크기 조정
  background-position: center; // 이미지 중앙 정렬
`;

export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 724px;
  height: 622px;
  background: #101148;
  border-radius: 20px;
`;

export const Title = styled.div`
  text-align: center;
  color: #ffffff;
  margin-bottom: 30px;
`;

export const WelcomeText = styled.h1`
  font-family: 'Pixelify Sans', sans-serif;
  font-weight: 600;
  font-size: 40px;
`;

export const Logo = styled.img`
  width: 286px;
  height: 44px;
`;

export const InputBox = styled.div`
  width: 464px;
  height: 132px;
  background-color: #101148;
  border-radius: 20px;
  border: 2px solid #d1c1ff;
  padding: 20px;
  margin-bottom: 10px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: space-between;
  align-items: flex-start;
`;

export const Label1 = styled.label`
  font-family: 'Pixelify Sans', sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  position: relative;
  top: -20px;
  margin-right: 20px;
`;

export const Label2 = styled.label`
  font-family: 'Pixelify Sans', sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  position: relative;
  margin-right: 10px;
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 18px;
  background-color: transparent;
  color: #ffffff;
  border: none;
  outline: none;
  width: 90%;

  &:focus {
    background-color: transparent;
    color: #ffffff;
  }

  &:-webkit-autofill {
    background-color: transparent !important;
    -webkit-text-fill-color: #ffffff !important; /* 자동 완성된 텍스트 색상 */
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
    color: #ffffff !important;
  }

  &::placeholder {
    color: #999797; /* Placeholder 색상 */
    font-size: 18px; /* Placeholder 글꼴 크기 */
    line-height: 22.5px;
  }
`;

export const Input2 = styled.input`
  position: relative;
  bottom: -20px;
  padding: 10px;
  background-color: transparent;
  color: #ffffff;
  border: none;
  outline: none;
  font-size: 18px;
  width: 90%;

  &:focus {
    background-color: transparent;
    color: #ffffff;
  }

  &:-webkit-autofill {
    background-color: transparent !important;
    -webkit-text-fill-color: #ffffff !important; /* 자동 완성된 텍스트 색상 */
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
    color: #ffffff !important;
  }

  &::placeholder {
    color: #999797; /* Placeholder 색상 */
    font-size: 18px; /* Placeholder 글꼴 크기 */
    line-height: 22.5px;
  }
`;

export const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-color: #999797;
  width: 421px;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 65%;
  margin-bottom: 25px;
`;

export const Actions2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin-bottom: 25px;
`;

export const ActionButton = styled.button`
  background-color: #b8effd;
  color: #000000;
  border: none;
  border-radius: 20px;
  font-size: 20px;
  font-weight: 600;
  line-height: 25px;
  cursor: pointer;
  text-align: center;
  margin: 0 auto;
  width: 318px;
  height: 53px;
  margin-top: 0px;
  margin-bottom: 30px;
`;

export const ActionLink = styled.a`
  font-family: 'Gothic A1';
  font-size: 12px;
  color: #cccccc;
  cursor: pointer;
`;

export const ActionLink2 = styled.div`
  font-family: 'Gothic A1';
  font-weight: 600;
  font-size: 15px;
  color: #cccccc;
`;

export const ShortDivider = styled.hr`
  border: 0;
  height: 1px;
  background-color: #ffffff;
  width: 170px;
`;

export const SocialLogin = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

export const SocialIcon = styled.img`
  width: 68px;
  height: 68px;
  cursor: pointer;
  border-radius: 50%;
`;

export const RecentLoginWrapper = styled.img`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 71px;
  height: 33px;
`;

export const RecentLoginText = styled.img`
  position: absolute;
  color: #101148;
  font-size: 10px;
  font-weight: 600;
  line-height: 12.5px;
`;
