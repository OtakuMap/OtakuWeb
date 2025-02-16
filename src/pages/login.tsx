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

/*const generateState = () => Math.random().toString(36).substring(2, 15); // 랜덤 state 생성
 */

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, oauthLogin, loading } = useAuth();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [lastLogin, setLastLogin] = useState<'kakao' | 'naver' | 'google' | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const provider = queryParams.get('provider');
    const code = queryParams.get('code');
    const state = queryParams.get('state');

    if (provider && code) {
      // 로컬 저장된 state와 비교
      const storedState = localStorage.getItem(`${provider}_state`);
      if (storedState !== state) {
        console.error('Invalid state value');
        setError('잘못된 요청입니다. 다시 시도해주세요.');
        return;
      }

      // OAuth 로그인 실행
      oauthLogin(provider as 'kakao' | 'naver' | 'google', code);

      // URL 정리
      navigate('/', { replace: true });
    }
  }, [location, oauthLogin, navigate]);

  const FIXED_STATE = 'fixed_state_value'; // 테스트용 고정 state 값

  const handleLogin = (provider: 'kakao' | 'naver' | 'google') => {
    const state = FIXED_STATE; // state를 고정된 값으로 설정
    localStorage.setItem(`${provider}_state`, state);

    let authUrl = '';
    if (provider === 'naver') {
      authUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code
      &client_id=${VITE_NAVER_CLIENT_ID}
      &redirect_uri=${VITE_NAVER_REDIRECT_URI}
      &state=${state}`;
    } else if (provider === 'kakao') {
      authUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code
      &client_id=${VITE_KAKAO_CLIENT_ID}
      &redirect_uri=${VITE_KAKAO_REDIRECT_URI}
      &state=${state}`;
    } else if (provider === 'google') {
      authUrl = `https://accounts.google.com/o/oauth2/auth?response_type=code
      &client_id=${VITE_GOOGLE_CLIENT_ID}
      &redirect_uri=${VITE_GOOGLE_REDIRECT_URI}
      &scope=email%20profile
      &state=${state}`;
    }

    window.location.href = authUrl;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting || loading) return;
    if (!userId || !password) {
      setError('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }
    try {
      setIsSubmitting(true);
      await login(userId, password);
      console.log('Login success');
    } catch (err) {
      console.error('Login failed');
      setError('로그인에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
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
        <ActionButton onClick={() => formRef.current?.requestSubmit()} disabled={loading}>
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
