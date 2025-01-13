import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import SearchIdPWPage from './pages/search_idpw';
import NewSetPWPage from './pages/newsetpw';
import RouteManagement from './components/RouteManagement';
import Navbar from './components/common/Navbar';

const AppContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: #0c004b;
`;

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
          <Navbar />
          <RouteManagement />
        </AppContainer>
      )}
    </BrowserRouter>
  );
};

export default App;
