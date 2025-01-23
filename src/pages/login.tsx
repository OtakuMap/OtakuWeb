// login page
import { useNavigate } from 'react-router-dom';
import "../styles/font.css";
import kakaoIcon from '../assets/img/kakao-icon.png';
import naverIcon from '../assets/img/naver-icon.png';
import googleIcon from '../assets/img/google-icon.png';
import logoIcon from '../assets/logo.png';
import { Container,LoginBox, Title, WelcomeText, Logo, InputBox,Form, FormGroup,Label1, Label2,Input, Input2,Divider, Actions, Actions2, ActionButton,ActionLink,
  ActionLink2, ShortDivider,SocialLogin,SocialIcon
 } from '../styles/login/login.style';

const {
  VITE_KAKAO_CLIENT_ID,
  VITE_GOOGLE_CLIENT_ID,
  VITE_KAKAO_REDIRECT_URI,
  VITE_GOOGLE_REDIRECT_URI,
  VITE_NAVER_REDIRECT_URI,
  VITE_NAVER_CLIENT_ID,
} = import.meta.env; 

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${VITE_KAKAO_CLIENT_ID}&redirect_uri=${VITE_KAKAO_REDIRECT_URI}&prompt=login`;
const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${VITE_NAVER_CLIENT_ID}&redirect_uri=${VITE_NAVER_REDIRECT_URI}`;
const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${VITE_GOOGLE_CLIENT_ID}&redirect_uri=${VITE_GOOGLE_REDIRECT_URI}&scope=email%20profile`;

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

