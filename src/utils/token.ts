export const tokenStorage = {
  setTokens: (accessToken: string, refreshToken: string, userId: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userId', userId);
  },
  getAccessToken: () => localStorage.getItem('accessToken'),
  getRefreshToken: () => localStorage.getItem('refreshToken'),
  getUserId: () => {
    const userId = localStorage.getItem('userId');
    // null, undefined, "undefined" 모두 null로 처리
    return userId && userId !== 'undefined' ? userId : null;
  },
  clearTokens: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
  },
};
// export const tokenStorage = {
//   setTokens: (accessToken: string, refreshToken: string, userId: string) => {
//     localStorage.setItem('accessToken', accessToken);
//     localStorage.setItem('refreshToken', refreshToken);
//     localStorage.setItem('userId', userId);
//   },
//   getAccessToken: () => localStorage.getItem('accessToken'),
//   getRefreshToken: () => localStorage.getItem('refreshToken'),
//   getUserId: () => localStorage.getItem('userId'),
//   clearTokens: () => {
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     localStorage.removeItem('userId');
//   },
// };
