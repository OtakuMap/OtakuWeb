// login page
import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/login/useAuth';
import '../styles/font.css';
import kakaoIcon from '../assets/img/kakao-icon.png';
import naverIcon from '../assets/img/naver-icon.png';
import googleIcon from '../assets/img/google-icon.png';
import logoIcon from '../assets/logo.png';
import Speech_bubble from '../assets/img/speech_bubble.png';
import {
  Container,
  LoginBox,
  Title,
  WelcomeText,
  Logo,
  InputBox,
  Form,
  FormGroup,
  Label1,
  Label2,
  Input,
  Input2,
  Divider,
  Actions,
  Actions2,
  ActionButton,
  ActionLink,
  ActionLink2,
  ShortDivider,
  SocialLogin,
  SocialIcon,
  RecentLoginWrapper,
  RecentLoginText,
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

const generateState = () => {
  return Math.random().toString(36).substring(2, 15); // 랜덤 문자열 생성
};

const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code
  &client_id=${VITE_NAVER_CLIENT_ID}
  &redirect_uri=${VITE_NAVER_REDIRECT_URI}
  &state=${generateState()}`; // ✅ state 값 추가

const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${VITE_GOOGLE_CLIENT_ID}&redirect_uri=${VITE_GOOGLE_REDIRECT_URI}&scope=email%20profile`;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, oauthLogin, loading } = useAuth();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // error 상태 추가
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [lastLogin, setLastLogin] = useState<'kakao' | 'naver' | 'google' | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const provider = queryParams.get('provider');
    const code = queryParams.get('code');

    if (provider && code) {
      // OAuth 인증 후 코드가 있다면 로그인 시도
      oauthLogin(provider as 'kakao' | 'naver' | 'google', code);
    }
  }, [location, oauthLogin]);

  const handleLogin = (provider: 'kakao' | 'naver' | 'google') => {
    setLastLogin(provider);

    const state = generateState(); // state 값 생성

    // state 값을 localStorage에 저장
    localStorage.setItem('oauth_state', state);

    if (provider === 'naver') {
      window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${VITE_NAVER_CLIENT_ID}&redirect_uri=${VITE_NAVER_REDIRECT_URI}&state=${state}`; // state 값 추가
    } else if (provider === 'kakao') {
      window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${VITE_KAKAO_CLIENT_ID}&redirect_uri=${VITE_KAKAO_REDIRECT_URI}&state=${state}`; // state 값 추가
    } else if (provider === 'google') {
      window.location.href = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${VITE_GOOGLE_CLIENT_ID}&redirect_uri=${VITE_GOOGLE_REDIRECT_URI}&state=${state}`; // state 값 추가
    } else {
      console.error('Unknown provider');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 이미 제출 중이면 중단
    if (isSubmitting || loading) return;

    if (!userId || !password) {
      setError('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      await login(userId, password);
      console.log('Login form submission successful');
    } catch (err) {
      console.error('Login form submission failed');
      setError('로그인에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleButtonClick = () => {
    if (isSubmitting || loading) return;
    formRef.current?.requestSubmit(); // dispatchEvent 대신 requestSubmit 사용
  };

  return (
    <Container>
      <LoginBox>
        <Title>
          <WelcomeText>WELCOME!</WelcomeText>
          <Logo src={logoIcon} />
        </Title>
        <InputBox>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <FormGroup>
              <Label1>ID</Label1>
              <Input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="아이디를 입력하세요"
              />
            </FormGroup>
            <Divider />
            <FormGroup>
              <Label2>PW</Label2>
              <Input2
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
              />
            </FormGroup>
            {error && (
              <div style={{ color: 'red', marginTop: '14px', fontSize: '9px' }}>{error}</div>
            )}
            <button type="submit" style={{ display: 'none' }}></button>
          </Form>
        </InputBox>
        <Actions>
          <ActionLink onClick={() => navigate('/search-id-pw')}>아이디/비밀번호 찾기</ActionLink>
          <ActionLink onClick={() => navigate('/signup')}>회원가입</ActionLink>
        </Actions>
        <ActionButton onClick={handleButtonClick} disabled={loading}>
          {loading ? '로그인 중...' : '로그인하기'}
        </ActionButton>
        <Actions2>
          <ShortDivider />
          <ActionLink2>간편 회원가입/로그인</ActionLink2>
          <ShortDivider />
        </Actions2>

        {lastLogin && (
          <RecentLoginWrapper>
            <img src={Speech_bubble} alt="말풍선" style={{ width: '71px' }} />
            <RecentLoginText>최근 로그인</RecentLoginText>
          </RecentLoginWrapper>
        )}

        <SocialLogin>
          <SocialIcon src={kakaoIcon} alt="Kakao Login" onClick={() => handleLogin('kakao')} />
          <SocialIcon src={naverIcon} alt="Naver Login" onClick={() => handleLogin('naver')} />
          <SocialIcon src={googleIcon} alt="Google Login" onClick={() => handleLogin('google')} />
        </SocialLogin>
      </LoginBox>
    </Container>
  );
};

export default LoginPage;
