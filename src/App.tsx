import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppSelector } from './hooks/reduxHook';

import styled from 'styled-components';
import './App.css';
import LoginPage from './pages/login/login';
import SignupPage from './pages/login/signup';
import SearchIdPWPage from './pages/login/search_idpw';
import NewSetPWPage from './pages/login/newsetpw';
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

// Navbar를 조건부로 렌더링하는 컴포넌트
// const NavigationWrapper = () => {
//   const location = useLocation();
//   const hideNavbarPaths = ['/map', '/route'];

//   return hideNavbarPaths.includes(location.pathname) ? null : <Navbar />;
// };

// 라우팅을 담당할 새로운 컴포넌트
const AppRoutes: React.FC = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const hideNavbarPaths = ['/map', '/route'];

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/search-id-pw" element={<SearchIdPWPage />} />
        <Route path="/newsetpw" element={<NewSetPWPage />} />
      </Routes>
    );
  }

  return (
    <AppContainer>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Cover />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/route" element={<RoutePage />} />
        <Route path="/review1" element={<ReviewPage1 />} />
        <Route path="/review2" element={<ReviewPage2 />} />
        <Route path="/review3" element={<ReviewPage3 />} />
        <Route path="/review4" element={<ReviewPage4 />} />
        <Route path="/review5" element={<ReviewPage5 />} />
        <Route path="/route-management" element={<RouteManagement />} />
        <Route path="/saved-places" element={<SavedPlaces />} />
        <Route path="/saved-events" element={<SavedEvents />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/main" element={<Main />} />
        <Route path="/category" element={<Category />} />
      </Routes>
    </AppContainer>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
};

export default App;