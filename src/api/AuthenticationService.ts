async kakaoLogin(code) {
    return await axios.get('/api/oauth/kakao?code=${code}');
}
async googleLogin(code) {
    return await axios.get('/api/oauth/google?code=${code}');
}
async naverLogin(code) {
    return await axios.get('/api/oauth/naver?code=${code}');
}
export default AuthenticationService;