async loginWithProvider(provider: 'kakao' | 'google' | 'naver', code: string, email?: string) {
    const endpoint = `${this.baseUrl}/api/oauth/${provider}`;
    const params: { code: string; email?: string } = { code };

    // Include email in the request only if it's provided
    if (email) {
        params.email = email;
    }

    return await axios.get(endpoint, { params });
}

async kakaoLogin(code: string) {
    // Kakao doesn't require email
    return await this.loginWithProvider('kakao', code);
}

async googleLogin(code: string, email: string) {
    // Google requires email
    return await this.loginWithProvider('google', code, email);
}

async naverLogin(code: string, email: string) {
    // Naver requires email
    return await this.loginWithProvider('naver', code, email);
}

async registerSuccessfulLoginForJwt(email: string, token: string) {
    // Example: Save the JWT token in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('userEmail', email);
}
  