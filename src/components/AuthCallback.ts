/*import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get("access_token");
    const error = hashParams.get("error");

    if (error) {
      console.error("OAuth Error:", error);
      alert("Login failed. Please try again.");
      return;
    }

    if (accessToken) {
      // Access token 성공적으로 수신
      console.log("Access Token:", accessToken);
      // 백엔드 서버에 토큰 전달 후 사용자 정보 요청 가능
      navigate("/dashboard"); // 로그인 성공 후 리다이렉트
    }
  }, [navigate]);

  return <h1>Processing login...</h1>;
};

export default AuthCallback;
*/