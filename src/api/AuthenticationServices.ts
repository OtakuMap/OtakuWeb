// AuthenticationService.ts

class AuthenticationService {
  static async loginUser(userData: { email: string; password: string }) {
    const response = await axiosInstance.post('/auth/login', userData);
    const { accessToken, refreshToken } = response.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return response.data;
  }

  static logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login'; // or use navigate('/login') if using React Router
  }

  // Other reusable authentication-related methods...
}

export default AuthenticationService;
