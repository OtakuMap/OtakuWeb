import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation  } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import SearchIdPWPage from './pages/search_idpw';
import NewSetPWPage from './pages/newsetpw';
import RouteManagement from './components/RouteManagement';
import Navbar from './components/common/Navbar';
import MapPage from './pages/map/MapPage';

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
        </Routes>
      </AppContainer>
    )}
  </BrowserRouter>
);
};

export default App;
