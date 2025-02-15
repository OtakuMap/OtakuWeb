import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/login/useAuth';

const OAuthRedirectHandler = () => {
  const { oauthLogin } = useAuth();
  const navigate = useNavigate();
  const { provider } = useParams<{ provider: 'kakao' | 'naver' | 'google' }>(); // useParams는 최상단에서 호출
  const code: string | null = new URL(window.location.href).searchParams.get('code');

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

      try {
        await oauthLogin(provider, code);
        navigate('/main'); // 로그인 성공 시 메인 페이지로 이동
      } catch (error) {
        console.error('OAuth Login failed:', error);
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
        navigate('/');
      }
    };

    handleLogin();
  }, [code, provider, navigate, oauthLogin]);

  return <div>로그인 중입니다. 잠시만 기다려 주세요...</div>;
};

export default OAuthRedirectHandler;
