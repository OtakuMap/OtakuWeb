import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate, matchPath } from 'react-router-dom';
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
import Main from './components/main/Main';
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
import ReviewPage6 from './pages/ReviewPage6';
import ReviewPage7 from './pages/ReviewPage7';
import EventPage from './pages/EventPage2';
import LoginModal from './components/common/LoginModal';
import PurchaseIncomeCheck from './pages/point/purchaseIncomeCheck';
import PointCharge from './pages/point/pointCharge';
import MyPoint from './pages/point/myPoint';
import OAuthRedirectHandler from './pages/OAuthRedirect';

const AppContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: #0c004b;
`;

const queryClient = new QueryClient();

// 보호된 라우트를 위한 wrapper 컴포넌트
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!isLoggedIn) {
    // 로그인 페이지로 리다이렉트하면서 이전 위치 저장
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const location = useLocation();
  //navbar를 넣고 싶지 않은 페이지
  const hideNavbarPaths = [
    '/login',
    '/map',
    '/route',
    '/route/:routeId',
    '/signup',
    '/search-id-pw',
    '/newsetpw',
  ];

  // 현재 경로가 hideNavbarPaths 중 하나와 매칭되는지 확인
  const shouldHideNavbar = hideNavbarPaths.some((path) => matchPath(path, location.pathname));

  return (
    <AppContainer>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        {/* 공통 라우트 - 로그인 여부와 관계없이 접근 가능 */}
        <Route path="/" element={<Main />} />
        <Route path="/cover" element={<Cover />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/search-id-pw" element={<SearchIdPWPage />} />
        <Route path="/newsetpw" element={<NewSetPWPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/route" element={<RoutePage />} />
        <Route path="/route/:routeId" element={<RoutePage />} />
        <Route path="/category" element={<Category />} />
        {/* <Route path="/main" element={<Main />} /> */}
        <Route path="/review1" element={<ReviewPage1 />} />
        <Route path="/review2" element={<ReviewPage2 />} />
        <Route path="/places/:placeId/review" element={<ReviewPage3 />} />
        <Route path="/places/:placeId/short-review" element={<ReviewPage4 />} />
        <Route path="/review/:reviewId" element={<ReviewPage5 />} />
        <Route path="/review6" element={<ReviewPage6 />} />
        <Route path="/review7" element={<ReviewPage7 />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/event/:eventId" element={<EventPage />} />
<Route path="/purchase-income-check" element={<PurchaseIncomeCheck />} />
        <Route path="/point-charge" element={<PointCharge />} />
        <Route path="/my-point" element={<MyPoint />} />
        
        {/* 보호된 라우트 - 로그인한 사용자만 접근 가능 */}
        <Route
          path="/route-management"
          element={
            <ProtectedRoute>
              <RouteManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-places"
          element={
            <ProtectedRoute>
              <SavedPlaces />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-events"
          element={
            <ProtectedRoute>
              <SavedEvents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-page"
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AppContainer>
  );
};

// Provider 내부에서 사용될 컴포넌트
const AppContent: React.FC = () => {
  const { isLoginModalOpen } = useAppSelector((state) => state.modal);

  return (
    <>
      <AppRoutes />
      {isLoginModalOpen && <LoginModal />}
    </>
  );
};

// 최상위 App 컴포넌트
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
