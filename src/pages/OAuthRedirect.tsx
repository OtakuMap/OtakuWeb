import { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/login/useAuth';

const OAuthRedirectHandler = () => {
  const { oauthLogin } = useAuth();
  const navigate = useNavigate();
  const { provider } = useParams<{ provider: 'kakao' | 'naver' | 'google' }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const savedState = localStorage.getItem('oauth_state'); // Get the saved state from localStorage

  useEffect(() => {
    const handleLogin = async () => {
      if (!code) {
        console.error('Authorization code not found.');
        alert('잘못된 접근입니다. 다시 시도해주세요.');
        navigate('/');
        return;
      }

      if (!provider) {
        console.error('Invalid provider');
        alert('잘못된 접근입니다.');
        navigate('/');
        return;
      }

      /* // Add state validation to prevent CSRF attacks
      if (state !== savedState) {
        console.error('State 값 불일치! CSRF 공격 가능성 있음.');
        alert('잘못된 요청입니다. 다시 시도해주세요.');
        navigate('/');
        return;
      }*/

      try {
        console.log(`Logging in with provider: ${provider}, code: ${code}, state: ${state}`);
        await oauthLogin(provider, code);
        navigate('/main');
      } catch (error) {
        console.error('OAuth Login failed:', error);
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
        navigate('/');
      }
    };

    handleLogin();
  }, [code, provider, state, savedState, navigate, oauthLogin]);

  return <p>로그인 중입니다. 잠시만 기다려 주세요...</p>;
};

export default OAuthRedirectHandler;
