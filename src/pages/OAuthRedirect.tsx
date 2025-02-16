import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/login/useAuth';

const OAuthRedirectHandler = () => {
  const { oauthLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');
    const state = queryParams.get('state');
    const savedState = localStorage.getItem('oauth_state');

    if (!code || !state || state !== savedState) {
      console.error('OAuth 인증 실패: CSRF 검증 실패.');
      alert('잘못된 접근입니다. 다시 시도해주세요.');
      navigate('/');
      return;
    }

    localStorage.removeItem('oauth_state'); // 검증 후 state 삭제

    let provider: 'google' | 'kakao' | 'naver' | null = null;
    if (location.pathname.includes('kakao')) provider = 'kakao';
    else if (location.pathname.includes('naver')) provider = 'naver';
    else if (location.pathname.includes('google')) provider = 'google';

    if (provider) {
      console.log(`OAuth 로그인 요청 시작: provider=${provider}, code=${code}`);
      oauthLogin(provider, { code })
        .then(() => {
          console.log('OAuth 로그인 성공, 메인 페이지 이동');
          navigate('/main');
        })
        .catch((error) => {
          console.error('OAuth 로그인 실패:', error);
          alert('로그인에 실패했습니다. 다시 시도해주세요.');
          navigate('/');
        });
    }
  }, [navigate, oauthLogin, location]);

  return <p>로그인 중입니다. 잠시만 기다려 주세요...</p>;
};

export default OAuthRedirectHandler;
