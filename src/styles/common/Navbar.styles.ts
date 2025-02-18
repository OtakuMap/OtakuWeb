import styled, { css } from 'styled-components';

const IPHONE_15_BREAKPOINT = '430px';

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 71px;
  background-color: #0c004b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  z-index: 1000;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    height: 60px;
    padding: 0 12px;
  }
`;

export const Logo = styled.div`
  cursor: pointer;
  margin-top: 16px;
  margin-bottom: 20px;

  img {
    height: 35px;
    object-fit: contain;
  }

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    margin-top: 12px;
    margin-bottom: 16px;

    img {
      height: 28px;
    }
  }
`;

export const IconsContainer = styled.div`
  display: flex;
  gap: 29px;
  align-items: center;

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    gap: 20px;
  }
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

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: ${(props) => {
      if (props.width) return 'calc(${props.width} * 0.8)';
      if (props.size) return `${props.size * 0.8}px`;
      return '22px';
    }};
    height: ${(props) => {
      if (props.height) return 'calc(${props.height} * 0.8)';
      if (props.size) return `${props.size * 0.8}px`;
      return '22px';
    }};
  }

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

        @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
          border-width: 2px;
        }
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

        @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
          width: 22px;
          top: 30px;
          border-width: 1.5px;
        }
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

    @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
      font-size: 9px;
      min-width: 14px;
      height: 14px;
      top: -4px;
      right: -4px;
    }
  }
`;

export const Overlay = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 71px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${(props) => (props.$isVisible ? 'block' : 'none')};

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    top: 60px;
  }
`;

export const AlarmPopup = styled.div`
  position: absolute;
  top: 71px;
  right: 16px;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  width: 256px;
  max-height: 400px;
  overflow-y: auto;
  z-index: 2000;
  align-items: center;

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    top: 60px;
    right: 12px;
    width: 280px;
    max-height: 350px;
    border-radius: 8px;
  }

  h4 {
    margin: 13px 13px 0;
    padding-bottom: 13px;
    font-size: 14px;
    font-weight: bold;
    color: #333;
    text-align: center;
    position: relative;

    @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
      margin: 10px 10px 0;
      padding-bottom: 10px;
      font-size: 13px;
    }

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

  li {
    background: #f4f4f4;
    border-radius: 10px;
    padding: 13px;
    margin: 8px;
    position: relative;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);

    @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
      padding: 10px;
      margin: 6px;
    }

    h5 {
      font-size: 13px;
      font-weight: bold;
      margin-bottom: 6px;
      color: #333;

      @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
        font-size: 12px;
        margin-bottom: 4px;
      }
    }

    p {
      font-size: 11px;
      color: #555;
      line-height: 1.4;

      @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
        font-size: 10px;
      }
    }

    button {
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      color: #888;
      font-size: 13px;
      cursor: pointer;

      @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
        top: 8px;
        right: 8px;
        font-size: 12px;
      }
    }
  }
`;

export const ProfilePopup = styled.div`
  position: absolute;
  top: 71px;
  right: 16px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  width: 160px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
  z-index: 2000;
  overflow: hidden;

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    top: 60px;
    right: 12px;
    width: 140px;
    border-radius: 8px;
  }
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 16px 12px;
  position: relative;

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    padding: 12px 12px 10px;
  }

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
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #f0f0f0;
  margin-bottom: 8px;
  border: 2px solid #d1c1ff;
  overflow: hidden;
  flex-shrink: 0;

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 40px;
    height: 40px;
    margin-bottom: 6px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProfileName = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #333;

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    font-size: 12px;
  }
`;

export const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const MenuItem = styled.li`
  padding: 10px 16px;
  cursor: pointer;
  color: #333;
  font-size: 11px;
  text-align: center;

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    padding: 8px 12px;
    font-size: 10px;
  }

  &:hover {
    background-color: #f5f5f5;
  }
`;
