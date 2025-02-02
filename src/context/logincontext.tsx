import { createContext, useContext, useState, useEffect } from 'react';

// 로그인 상태를 관리할 Context 생성
const AuthContext = createContext();
const context = useContext(AuthContext);
// 인증 상태에 접근하는 커스텀 훅
export const useAuth = () => {
  if (context === undefined) {
    return {
      authState: {
        accessToken: null,
        isAuthenticated: false,
        email: null,
      },
      login: () => {},
      logout: () => {},
    };
  }

  return context;
};

// AuthProvider 컴포넌트: 인증 상태와 관련된 로직을 관리
export const AuthProvider = ({ children }) => {
  // 초기 상태 설정 (localStorage에서 값 불러오기)
  const [authState, setAuthState] = useState({
    accessToken: localStorage.getItem('accessToken'),
    isAuthenticated: !!localStorage.getItem('accessToken'),
    email: localStorage.getItem('email'),
  });

  // 로그인 함수
  const login = (email, accessToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('email', email);
    setAuthState({
      accessToken,
      isAuthenticated: true,
      email,
    });
  };

  // 로그아웃 함수
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('email');
    setAuthState({
      accessToken: null,
      isAuthenticated: false,
      email: null,
    });
  };

  // 로그인 상태 변화 감지하여 업데이트
  useEffect(() => {
    setAuthState({
      accessToken: localStorage.getItem('accessToken'),
      isAuthenticated: !!localStorage.getItem('accessToken'),
      email: localStorage.getItem('email'),
    });
  }, []);

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>{children}</AuthContext.Provider>
  );
};
