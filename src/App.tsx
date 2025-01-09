import React from 'react';
import styled from 'styled-components';
import RouteManagement from './components/RouteManagement';
import Navbar from './components/common/Navbar';

const AppContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: #0c004b;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <Navbar />
      <RouteManagement />
    </AppContainer>
  );
};

export default App;
