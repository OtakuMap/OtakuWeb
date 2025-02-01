import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { useAppSelector } from './hooks/reduxHooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import styled from 'styled-components';
import './App.css';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import SearchIdPWPage from './pages/search_idpw';
import NewSetPWPage from './pages/newsetpw';
import RouteManagement from './components/RouteManagement';
import SavedPlaces from './components/SavedPlaces';
import SavedEvents from './components/SavedEvents';
import Navbar from './components/common/Navbar';
import MyPage from './components/MyPage';
import Cover from './components/Cover';
import Category from './components/Category';
import MapPage from './pages/map/MapPage';
import RoutePage from './pages/map/RoutePage';
import ReviewPage1 from './pages/ReviewPage1';
import ReviewPage2 from './pages/ReviewPage2';
import ReviewPage3 from './pages/ReviewPage3';
import ReviewPage4 from './pages/ReviewPage4';
import ReviewPage5 from './pages/ReviewPage5';
import Main from './components/Main';

const AppContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: #0c004b;
`;

const queryClient = new QueryClient();

const AppRoutes: React.FC = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const hideNavbarPaths = [
    '/map',
    '/route',
    '/review1',
    '/review2',
    '/review3',
    '/review4',
    '/review5',
  ];

  // 로그인이 필요한 보호된 라우트들
  const protectedRoutes = [
    '/route-management',
    '/saved-places',
    '/saved-events',
    '/my-page',
    '/review1',
    '/review2',
    '/review3',
    '/review4',
    '/review5',
  ];

  // 현재 경로가 보호된 라우트인지 확인
  const isProtectedRoute = protectedRoutes.includes(location.pathname);

  // 로그인이 되어있지 않고 보호된 라우트에 접근하려 할 때 로그인 페이지로 리다이렉트
  if (!isLoggedIn && isProtectedRoute) {
    return (
      <Routes>
        <Route path="*" element={<LoginPage />} />
      </Routes>
    );
  }

  return (
    <AppContainer>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <Routes>
        {/* 공통 라우트 - 로그인 여부와 관계없이 접근 가능 */}
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/search-id-pw" element={<SearchIdPWPage />} />
        <Route path="/newsetpw" element={<NewSetPWPage />} />
        <Route path="/cover" element={<Cover />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/route" element={<RoutePage />} />
        <Route path="/category" element={<Category />} />

        {/* 보호된 라우트 - 로그인한 사용자만 접근 가능 */}
        {isLoggedIn && (
          <>
            <Route path="/route-management" element={<RouteManagement />} />
            <Route path="/saved-places" element={<SavedPlaces />} />
            <Route path="/saved-events" element={<SavedEvents />} />
            <Route path="/my-page" element={<MyPage />} />
            <Route path="/review1" element={<ReviewPage1 />} />
            <Route path="/review2" element={<ReviewPage2 />} />
            <Route path="/review3" element={<ReviewPage3 />} />
            <Route path="/review4" element={<ReviewPage4 />} />
            <Route path="/review5" element={<ReviewPage5 />} />
          </>
        )}
      </Routes>
    </AppContainer>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
