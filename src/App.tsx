import React from 'react';
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

const AppContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: #0c004b;
`;

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppContainer>
      <Navbar />
      <RouteManagement />
    </AppContainer>
  );
};

export default App;
