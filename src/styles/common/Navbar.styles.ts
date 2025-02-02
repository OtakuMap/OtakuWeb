import styled, { css } from 'styled-components';

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 71px; // 89px * 0.8
  background-color: #0c004b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px; // 20px * 0.8
  z-index: 1000;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1); // 4px * 0.8
`;

export const Logo = styled.div`
  cursor: pointer;
  margin-top: 16px; // 20px * 0.8
  margin-bottom: 20px; // 25px * 0.8
  img {
    height: 35px; // 44px * 0.8
    object-fit: contain;
  }
`;

export const IconsContainer = styled.div`
  display: flex;
  gap: 29px; // 29px * 0.8
  // margin-left: 29px;
  align-items: center;
`;

export const IconWrapper = styled.div<{
  isActive?: boolean;
  isProfile?: boolean;
  width?: string;
  height?: string;
  size?: number;
}>`
  position: relative;
  width: ${(props) => {
    if (props.width) return props.width;
    if (props.size) return `${props.size}px`;
    return '28px';
  }};
  height: ${(props) => {
    if (props.height) return props.height;
    if (props.size) return `${props.size}px`;
    return '28px';
  }};
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    ${(props) =>
      props.isProfile &&
      css`
        border: 3px solid ${props.isActive ? '#ffc50c' : '#d1c1ff'};
        border-radius: 50%;
        box-sizing: border-box;
      `}
  }

  ${(props) =>
    !props.isProfile &&
    props.isActive &&
    css`
      &::after {
        content: '';
        position: absolute;
        width: 28px;
        height: 0;
        left: -1.7px;
        top: 36px;
        border: 2px solid #fff5d5;
        border-radius: 4px;
      }
    `}

  span {
    position: absolute;
    top: -6px;
    right: -6px;
    background-color: #ff334b;
    color: white;
    font-size: 10px;
    min-width: 16px;
    height: 16px;
    padding: 0 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    font-weight: 500;
  }
`;

export const Overlay = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 71px; // 89px * 0.8
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
`;

export const AlarmPopup = styled.div`
  position: absolute;
  top: 71px;
  right: 16px; // 20px * 0.8
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1); // 4px 6px * 0.8
  border-radius: 6px; // 8px * 0.8
  width: 256px; // 320px * 0.8
  max-height: 400px; // 500px * 0.8
  overflow-y: auto;
  z-index: 2000;
  align-items: center;

  h4 {
    margin: 13px 13px 0; // 16px * 0.8
    padding-bottom: 13px; // 16px * 0.8
    font-size: 14px; // 18px * 0.8
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
    border-radius: 10px; // 12px * 0.8
    padding: 13px; // 16px * 0.8
    margin: 8px; // 10px * 0.8
    position: relative;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1); // 4px * 0.8

    h5 {
      font-size: 13px; // 16px * 0.8
      font-weight: bold;
      margin-bottom: 6px; // 8px * 0.8
      color: #333;
    }

    p {
      font-size: 11px; // 14px * 0.8
      color: #555;
      line-height: 1.4;
    }

    button {
      position: absolute;
      top: 10px; // 12px * 0.8
      right: 10px; // 12px * 0.8
      background: none;
      border: none;
      color: #888;
      font-size: 13px; // 16px * 0.8
      cursor: pointer;
    }

    button:hover {
      color: red;
    }
  }
`;

export const ProfilePopup = styled.div`
  position: absolute;
  top: 71px; // 70px * 0.8
  right: 16px; // 20px * 0.8
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px; // 12px * 0.8
  width: 160px; // 200px * 0.8
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1); // 4px 6px * 0.8
  z-index: 2000;
  overflow: hidden;
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 16px 12px; // 20px 20px 15px * 0.8
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
  width: 48px; // 60px * 0.8
  height: 48px; // 60px * 0.8
  border-radius: 50%;
  background-color: #f0f0f0;
  margin-bottom: 8px; // 10px * 0.8
  border: 2px solid #d1c1ff;
  overflow: hidden;
  flex-shrink: 0; // 이미지가 찌그러지지 않도록 방지

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProfileName = styled.span`
  font-size: 13px; // 16px * 0.8
  font-weight: 500;
  color: #333;
`;

export const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const MenuItem = styled.li`
  padding: 10px 16px; // 12px 20px * 0.8
  cursor: pointer;
  color: #333;
  font-size: 11px; // 14px * 0.8
  text-align: center;

  &:hover {
    background-color: #f5f5f5;
  }
`;
