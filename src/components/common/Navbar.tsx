import React from 'react';
import styled from 'styled-components';
import logoImage from '../../assets/logo.png';
import searchIcon from '../../assets/search.png';
import menuIcon from '../../assets/menu.png';
import profileIcon from '../../assets/profile.png';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #0c004b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid #e9e2ff;
`;

const Logo = styled.div`
  color: white;
  font-size: 24px;

  img {
    height: 40px;
    object-fit: contain;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <Logo>
        <img src={logoImage} alt="Otaku Map" />
      </Logo>
      <IconsContainer>
        <IconWrapper>
          <img src={searchIcon} alt="Search" />
        </IconWrapper>
        <IconWrapper>
          <img src={menuIcon} alt="Menu" />
        </IconWrapper>
        <IconWrapper>
          <img src={profileIcon} alt="Profile" />
        </IconWrapper>
      </IconsContainer>
    </Nav>
  );
};

export default Navbar;
