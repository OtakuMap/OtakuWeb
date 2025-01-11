import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';
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
  return (
    <BrowserRouter>
      <AppContainer>
        <NavigationWrapper />
        <Routes>
          <Route path="/" element={<RouteManagement />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
};

export default App;
