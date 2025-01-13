/*const getOAuthUrl = (provider) => {
    const redirectUri = "http://localhost:3000/auth/callback";
    const baseUrls = {
      google: "https://accounts.google.com/o/oauth2/v2/auth",
      naver: "https://nid.naver.com/oauth2.0/authorize",
      kakao: "https://kauth.kakao.com/oauth/authorize",
    };
  
    const clientIds = {
      google: "YOUR_GOOGLE_CLIENT_ID",
      naver: "YOUR_NAVER_CLIENT_ID",
      kakao: "YOUR_KAKAO_CLIENT_ID",
    };
  
    const scopes = {
      google: "email profile",
      naver: "profile",
      kakao: "profile",
    };
  
    const queryParams = new URLSearchParams({
      client_id: clientIds[provider],
      redirect_uri: redirectUri,
      response_type: "token", // 또는 "code"
      scope: scopes[provider],
    });
  
    return `${baseUrls[provider]}?${queryParams.toString()}`;
  };*/