import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

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
import Category from './components/category';
import MapPage from './pages/map/MapPage';
import ReviewPage1 from './pages/ReviewPage1';
import ReviewPage2 from './pages/ReviewPage2';
import ReviewPage3 from './pages/ReviewPage3';
import ReviewPage4 from './pages/ReviewPage4';
import ReviewPage5 from './pages/ReviewPage5';

const AppContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: #0c004b;
`;

// Navbar를 조건부로 렌더링하는 컴포넌트
const NavigationWrapper = () => {
  const location = useLocation();
  return location.pathname !== '/map' ? <Navbar /> : null;
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      {!isLoggedIn ? (
        <Routes>
          <Route
            path="/"
            element={<LoginPage onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/search-id-pw" element={<SearchIdPWPage />} />
          <Route path="/newsetpw" element={<NewSetPWPage />} />
        </Routes>
      ) : (
        <AppContainer>
          <NavigationWrapper />
          <Routes>
            <Route path="/" element={<RouteManagement />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/review1" element={<ReviewPage1 />} />
            <Route path="/review2" element={<ReviewPage2 />} />
            <Route path="/review3" element={<ReviewPage3 />} />
            <Route path="/review4" element={<ReviewPage4 />} />
            <Route path="/review5" element={<ReviewPage5 />} />
          </Routes>
        </AppContainer>
      )}
    </BrowserRouter>
  );
};

export default App;
