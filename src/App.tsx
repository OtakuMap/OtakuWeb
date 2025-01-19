import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import RouteManagement from './components/RouteManagement';
import SavedPlaces from './components/SavedPlaces';
import SavedEvents from './components/SavedEvents';
import Navbar from './components/common/Navbar';
import MyPage from './components/MyPage';
import Cover from './components/Cover';
import Main from './components/Main';
import Category from './pages/Category';

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
          <Route path="/" element={<Cover />} />
          <Route path="/route-management" element={<RouteManagement />} />
          <Route path="/saved-places" element={<SavedPlaces />} />
          <Route path="/saved-events" element={<SavedEvents />} />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/main" element={<Main />} />
          <Route path="/category" element={<Category />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;
