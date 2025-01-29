import styled from 'styled-components';

export const Nav = styled.nav`
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

export const Logo = styled.div`
  cursor: pointer;
  img {
    height: 40px;
    object-fit: contain;
  }
`;

export const IconsContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const IconWrapper = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  span {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: red;
    color: white;
    font-size: 12px;
    width: 18px;
    height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
`;

export const AlarmPopup = styled.div`
  position: absolute;
  top: 70px;
  right: 20px;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 320px;
  max-height: 500px;
  overflow-y: auto;
  z-index: 2000;
  align-items: center;

  h4 {
    margin: 16px 16px 0;
    padding-bottom: 16px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    text-align: center;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background-color: rgb(0, 0, 0);
    }
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    background: #f4f4f4;
    border-radius: 12px;
    padding: 16px;
    margin: 10px;
    position: relative;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h5 {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 8px;
      color: #333;
    }

    p {
      font-size: 14px;
      color: #555;
      line-height: 1.4;
    }

    button {
      position: absolute;
      top: 12px;
      right: 12px;
      background: none;
      border: none;
      color: #888;
      font-size: 16px;
      cursor: pointer;
    }

    button:hover {
      color: red;
    }
  }
`;

export const ProfilePopup = styled.div`
  position: absolute;
  top: 70px;
  right: 20px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 12px;
  width: 200px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 2000;
  overflow: hidden;
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px 15px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 1px;
    background-color: rgb(0, 0, 0);
  }
`;

export const ProfileImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f0f0f0;
  margin-bottom: 10px;
  border: 2px solid #d1c1ff;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProfileName = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

export const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const MenuItem = styled.li`
  padding: 12px 20px;
  cursor: pointer;
  color: #333;
  font-size: 14px;
  text-align: center;

  &:hover {
    background-color: #f5f5f5;
  }
`;
