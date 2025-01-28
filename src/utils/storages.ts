export const storage = {
    setTokens: (access: string, refresh: string) => {
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
    },
    clearTokens: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    getAccessToken: () => localStorage.getItem('accessToken'),
    getRefreshToken: () => localStorage.getItem('refreshToken'),
  };