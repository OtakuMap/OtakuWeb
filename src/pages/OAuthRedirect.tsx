import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationService from '../api/AuthenticationService';

const OAuthRedirectHandler = () => {
    const [loading, setLoading] = useState(true); // 로딩 상태
    const navigate = useNavigate();
    const code: string | null = new URL(window.location.href).searchParams.get("code");
    const email: string | null = new URL(window.location.href).searchParams.get("email"); // URL에서 이메일을 가져옴

    useEffect(() => {
        const handleLogin = async () => {
            try {
                let response;

                if (!code || !email) {  // 코드나 이메일이 없으면 처리하지 않음
                    console.error('Authorization code or email not found.');
                    alert('잘못된 접근입니다. 다시 시도해주세요.');
                    navigate('/'); // 예를 들어, 홈으로 리다이렉트
                    return;
                }

                if (window.location.href.includes('kakao')) {
                    response = await AuthenticationService.kakaoLogin(code);
                } else if (window.location.href.includes('naver')) {
                    response = await AuthenticationService.naverLogin(code, email); // 이메일 추가
                } else if (window.location.href.includes('google')) {
                    response = await AuthenticationService.googleLogin(code, email); // 이메일 추가
                }

                if (response && response.data && response.data.data) {
                    const { token, userEmail } = response.data.data;
                    console.log(`${response.data.data.provider} Login Successful`);
                    console.log('Token:', token);
                    console.log('User Email:', userEmail);
                    AuthenticationService.registerSuccessfulLoginForJwt(userEmail, token);
                    navigate('/main'); // 메인 페이지로 이동
                } else {
                    console.error('Invalid response data');
                }
            } catch (error) {
                console.error('Login failed:', error);
                alert('로그인에 실패했습니다. 다시 시도해주세요.');
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        handleLogin();
    }, [code, email, navigate]);

    return (
        <div>
            {loading ? '잠시만 기다려주세요! 로그인 중입니다.' : '로그인 처리가 완료되지 않았습니다.'}
        </div>
    );
};

export default OAuthRedirectHandler;
