import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/login/useAuth';

const OAuthRedirectHandler = () => {
  const { oauthLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const code: string | null = new URL(window.location.href).searchParams.get('code');
  useEffect(() => {
    const handleLogin = async () => {
      if (!code) {
        console.error('Authorization code not found.');
        navigate('/');
        return;
      }
      let provider: 'google' | 'kakao' | 'naver' | null = null;
      if (location.pathname.includes('kakao')) provider = 'kakao';
      else if (location.pathname.includes('naver')) provider = 'naver';
      else if (location.pathname.includes('google')) provider = 'google';
      if (provider) {
        try {
          await oauthLogin(provider, code); // ⬅ 객체가 아닌 문자열 전달
          navigate('/');
        } catch (error) {
          console.error('OAuth Login failed:', error);
          // 에러 alert 있었으나 삭제
          navigate('/');
        }
      }
    };
    handleLogin();
  }, [code, navigate, oauthLogin]);

  return <div>로그인 중입니다. 잠시만 기다려 주세요...</div>;
};

export default OAuthRedirectHandler;
