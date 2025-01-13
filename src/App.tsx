import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import RouteManagement from './components/RouteManagement';
import SavedPlaces from './components/SavedPlaces';
import SavedEvents from './components/SavedEvents';
import Navbar from './components/common/Navbar';
import MyPage from './components/MyPage';
import Cover from './components/Cover';
import Category from './components/category';

const AppContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: #0c004b;
`;

const App: React.FC = () => {
  return (
    <Router>
      <AppContainer>
        <Navbar />
        <Routes>
          {/* 기본 루트: RouteManagement */}
          <Route path="/" element={<RouteManagement />} />
          {/* 찜 페이지 */}
          <Route path="/saved-places" element={<SavedPlaces />} />
          {/* 저장한 이벤트 페이지 */}
          <Route path="/saved-events" element={<SavedEvents />} />
          {/* 마이페이지 */}
          <Route path="/my-page" element={<MyPage />} />
          {/* 추가된 경로 */}
          <Route path="/cover" element={<Cover />} />
          <Route path="/category" element={<Category />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;
