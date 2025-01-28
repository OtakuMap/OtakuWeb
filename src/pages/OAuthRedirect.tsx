/*import {useDispatch} from 'react-redux';
import {actionCreators as userActions} from  'react-loader-spinner';
import {useNavigate} from 'react-router-dom';
import AuthenticationService from '../api/AuthenticationService';

const OAuthRedirectHandler = (props) => {
    const code = new URL(window.location.href).searchParams.get("code");
    const navigate = useNavigate(); 

        useEffect(async() => {
            // 성공 시 일반 로그인과 마찬가지로 http로 응답받은
            // JWT token을 로컬 스토리지에 저장하고 로그인 처리되며 메인으로 이동동
            await AuthenticationService.kakaoLogin(code)
            .then((response) => {
                console.log('kakaoLogin');
                console.log(response.data.data.token);
                console.log(response.data.data.userEmail);
                AuthenticationService.registerSuccessfulLoginForJwt(response.data.data.userEmail, response.data.data.token);
            })
            .catch(error) => {
                console.log('kakaoLogin Failed');
            });
            Navigate('/main');
            },[]);
            await AuthenticationService.naverLogin(code)
            .then((response) => {
                console.log('naverLogin');
                console.log(response.data.data.token);
                console.log(response.data.data.userEmail);
                AuthenticationService.registerSuccessfulLoginForJwt(response.data.data.userEmail, response.data.data.token);
            })
            .catch(error) => {
                console.log('naverLogin Failed');
            });
            Navigate('/main');
            },[]);
            await AuthenticationService.googleLogin(code)
            .then((response) => {
                console.log('googleLogin');
                console.log(response.data.data.token);
                console.log(response.data.data.userEmail);
                AuthenticationService.registerSuccessfulLoginForJwt(response.data.data.userEmail, response.data.data.token);
            })
            .catch(error) => {
                console.log('googleLogin Failed');
            });
            Navigate('/main');
            },[]);
return (
    <div>
        잠시만 기다려주세요 ! 로그인 중입니다.
    </div>
);
};
export default OAuthRedirectHandler;*/