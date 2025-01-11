import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import styled from 'styled-components';
// import RouteManagement from './components/RouteManagement';
// import Navbar from './components/common/Navbar';
import MapPage from './pages/map/MapPage';

// const AppContainer = styled.div`
//   position: relative;
//   min-height: 100vh;
//   background-color: #0c004b;
// `;

const App: React.FC = () => {
  return (
    // <AppContainer>
    //   <Navbar />
    //   <RouteManagement />
    // </AppContainer>
    <BrowserRouter>
      <Routes>
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
