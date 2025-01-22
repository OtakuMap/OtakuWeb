// login page
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import "../styles/font.css";
import kakaoIcon from '../assets/img/kakao-icon.png';
import naverIcon from '../assets/img/naver-icon.png';
import googleIcon from '../assets/img/google-icon.png';
import logoIcon from '../assets/logo.png';
import Backgroundimg from '../assets/logorepeat.png';

const {
  VITE_REST_API_KEY,
  VITE_KAKAO_REDIRECT_URI,
  VITE_GOOGLE_REDIRECT_URI,
  VITE_NAVER_REDIRECT_URI,
  VITE_NAVER_CLIENT_ID,
} = import.meta.env; 

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${VITE_REST_API_KEY}&redirect_uri=${VITE_KAKAO_REDIRECT_URI}&prompt=login`;
const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${VITE_NAVER_CLIENT_ID}&redirect_uri=${VITE_NAVER_REDIRECT_URI}`;
const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=YOUR_GOOGLE_CLIENT_ID&redirect_uri=${VITE_GOOGLE_REDIRECT_URI}&scope=email%20profile`;

const handleLogin = (provider: 'kakao' | 'naver' | 'google') => {
  switch(provider) {  
  case 'kakao':
    window.location.href = KAKAO_AUTH_URL;
    break;
  case 'naver':
    window.location.href = NAVER_AUTH_URL;
    break;
  case 'google':
    window.location.href = GOOGLE_AUTH_URL;
    break;
  default:
    console.error('Unknown provider');
  }
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate(); 
  return (
    <Container>
      <LoginBox>
        <Title>
          <WelcomeText>WELCOME!</WelcomeText>
          <Logo src={logoIcon} />
        </Title>
        <InputBox>
          <Form>
            <FormGroup>
              <Label1>ID</Label1>
              <Input type="text" />
            </FormGroup>
            <Divider />
            <FormGroup>
              <Label2>PW</Label2>
              <Input2 type="password" />
            </FormGroup>
          </Form>
        </InputBox>
        <Actions>
          <ActionLink onClick={() => navigate('/search-id-pw')}>아이디/비밀번호 찾기</ActionLink>
          <ActionLink onClick={() => navigate('/signup')}>회원가입</ActionLink>
        </Actions>
          <ActionButton>로그인하기</ActionButton>
        <Actions2>
        <ShortDivider />
          <ActionLink2>간편 회원가입/로그인</ActionLink2>
        <ShortDivider />
        </Actions2>
        <SocialLogin>
          <SocialIcon src={kakaoIcon} alt="Kakao Login" onClick={() => handleLogin("kakao")}/>
          <SocialIcon src={naverIcon} alt="Naver Login" onClick={() => handleLogin("naver")}/>
          <SocialIcon src={googleIcon} alt="Google Login" onClick={() => handleLogin("google")}/>
        </SocialLogin>
      </LoginBox>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
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
  background-position: center;  // 이미지 중앙 정렬
`;

const LoginBox = styled.div`
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

const Title = styled.div`
  text-align: center;
  color: #ffffff;
  margin-bottom: 30px;
`;

const WelcomeText = styled.h1`
  font-family: 'Pixelify Sans', sans-serif;
  font-weight: 600;
  font-size: 40px;
`;

const Logo = styled.img`
  width: 286px;
  height: 44px;
`;

const InputBox = styled.div`
  width: 464px; height:132px;
  background-color: #101148;
  border-radius: 20px;
  border: 2px solid #d1c1ff;
  padding: 20px;
  margin-bottom: 10px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: space-between; 
  align-items: flex-start; 
`;
const Label1 = styled.label`
  font-family: 'Pixelify Sans', sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  position:relative;
  top:-20px;
  margin-right: 20px; 
`;

const Label2 = styled.label`
  font-family: 'Pixelify Sans', sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  position:relative;
  margin-right: 10px; 
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  background-color: #101148;
  color: #ffffff;
  border: none;
  outline: none;
  width: 90%;

  &:focus {
    background-color: #101148;
    color: #ffffff;
  }

  &:-webkit-autofill {
    background-color: #101148 !important;
    -webkit-text-fill-color: #ffffff !important;  /* 자동 완성된 텍스트 색상 */
    -webkit-box-shadow: 0 0 0px 1000px #101148 inset !important;
    color: #ffffff !important;
  }
`;

const Input2 = styled.input`
position:relative;
bottom:-20px;
  padding: 10px;
  font-size: 16px;
  background-color: #101148;
  color: #ffffff;
  border: none;
  outline: none;
  width: 90%;
  &:focus {
    background-color: #101148;
    color: #ffffff;
  }

  &:-webkit-autofill {
    background-color: #101148 !important;
    -webkit-text-fill-color: #ffffff !important;  /* 자동 완성된 텍스트 색상 */
    -webkit-box-shadow: 0 0 0px 1000px #101148 inset !important;
    color: #ffffff !important;
  }
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-color: #999797;
  width: 421px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:center;
  width: 65%;
  margin-bottom: 25px;
`;

const Actions2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:center;
  width: 90%;
  margin-bottom: 25px;
`;

const ActionButton = styled.button`
  background-color: #b8effd;
  color: #000000;
  border: none;
  border-radius: 20px;
  font-size: 20px;
  font-weight: 600;
  line-height:25px;
  cursor: pointer;
  text-align: center;
  margin: 0 auto;
  width: 318px;
  height: 53px;
  margin-top: 0px;
  margin-bottom: 30px;
`;

const ActionLink = styled.a`
  font-family: 'Gothic A1';
  font-size: 12px;
  color: #cccccc;
  cursor: pointer;
`;

const ActionLink2 = styled.a`
  font-family: 'Gothic A1';
  font-weight: 600;
  font-size: 15px;
  color: #cccccc;
  cursor: pointer;
`;

const ShortDivider = styled.hr`
  border: 0;
  height: 1px;
  background-color: #FFFFFF;
  width: 170px;
`;

const SocialLogin = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const SocialIcon = styled.img`
  width: 68px;
  height: 68px;
  cursor: pointer;
  border-radius: 50%;
`;
