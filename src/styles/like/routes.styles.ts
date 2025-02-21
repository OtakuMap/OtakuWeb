import styled from 'styled-components';

// 반응형 브레이크포인트 정의
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  largeDesktop: '1200px',
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #0c004b;
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow-x: hidden;
`;

export const HorizontalDivider = styled.hr`
  border: 0;
  height: 1px;
  background-color: #d1c1ff;
  width: 100%;
  margin-top: 51px;

  @media (max-width: ${breakpoints.tablet}) {
    margin-top: 30px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin-top: 20px;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 60px;

  @media (max-width: ${breakpoints.largeDesktop}) {
    margin: 0 30px;
    max-width: 90%;
  }

  @media (max-width: ${breakpoints.tablet}) {
    margin: 0 15px;
    max-width: 95%;
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin: 0 10px;
  }
`;

export const IconContainer = styled.div`
  position: absolute;
  top: 105px;
  right: 80px;
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 1;

  @media (max-width: ${breakpoints.tablet}) {
    top: 80px;
    right: 10px;
    gap: 8px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    top: 60px;
    right: 5px;
    gap: 6px;
  }
`;

export const IconImage = styled.img`
  @media (max-width: ${breakpoints.tablet}) {
    width: 36px;
    height: 36px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 30px;
    height: 30px;
  }
`;

export const Title = styled.h1`
  color: #fff;
  font-family: 'Gothic A1';
  font-size: 38px;
  font-weight: 600;
  margin: 48px 20px;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 28px;
    margin: 32px 16px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 22px;
    margin: 40px 10px;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 0;
  flex-wrap: wrap;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 4px;
  }
`;

export const Tab = styled.button<{ active?: boolean }>`
  width: 194px;
  height: 82px;
  border: none;
  background-color: ${(props) => (props.active ? '#fff' : '#CCC')};
  color: ${(props) => (props.active ? '#000' : '#464654')};
  border-radius: 20px 20px 0px 0px;
  cursor: pointer;
  text-align: center;
  font-family: 'Gothic A1';
  font-size: 20px;
  font-weight: 600;

  @media (max-width: ${breakpoints.tablet}) {
    width: 150px;
    height: 60px;
    font-size: 16px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100px;
    height: 40px;
    font-size: 14px;
  }
`;

export const RouteListContainer = styled.div`
  background: white;
  width: 1350px;
  border-radius: 0px 20px 20px 20px;
  padding: 45px 72px;
  margin-top: -1px;

  @media (max-width: ${breakpoints.largeDesktop}) {
    width: 100%;
    padding: 30px 40px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 20px 20px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 15px 10px;
  }
`;

export const ListHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: 10px;
  }
`;

export const ListTitle = styled.h2`
  color: #000;
  font-family: 'Gothic A1';
  font-size: 30px;
  font-weight: 700;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 24px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 18px;
  }
`;

export const HeaderDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #464654;
  margin: 16px 0;

  @media (max-width: ${breakpoints.mobile}) {
    margin: 10px 0;
  }
`;

export const ListActions = styled.div`
  display: flex;
  gap: 8px;
  color: #666;
  font-size: 14px;
  justify-content: flex-end;
  width: 100%;
  margin-top: 8px;

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: inherit;
    padding: 0;

    &:hover {
      color: black;
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 12px;
    gap: 6px;
  }
`;

export const RouteContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 56px;
  background-color: #e9e2ff;
  padding: 16px;
  border-radius: 15px;
  color: #000;
  font-family: 'Gothic A1';
  font-size: 20px;
  font-weight: 600;

  @media (max-width: ${breakpoints.tablet}) {
    height: auto;
    min-height: 56px;
    font-size: 16px;
    padding: 12px;
    flex-wrap: wrap;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 14px;
    padding: 10px;
  }
`;

export const RouteItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 40px;
  width: 100%;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: 20px;
    gap: 6px;
  }
`;

export const RadioButton = styled.div<{ checked: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid #7b66ff;
  border-radius: 50%;
  margin-right: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.checked ? '#7B66FF' : 'transparent')};

  &::after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: white;
    display: ${(props) => (props.checked ? 'block' : 'none')};
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 16px;
    height: 16px;
    margin-right: 12px;

    &::after {
      width: 6px;
      height: 6px;
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 14px;
    height: 14px;
    margin-right: 8px;

    &::after {
      width: 5px;
      height: 5px;
    }
  }
`;

export const RouteTitle = styled.span`
  flex: 1;
  color: #333;
  font-size: 16px;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 14px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 12px;
  }
`;

export const StarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 4px;
    margin-left: 4px;
  }
`;

export const StarIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 64px;

  @media (max-width: ${breakpoints.tablet}) {
    width: 24px;
    height: 24px;
    margin-right: 32px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 20px;
    height: 20px;
    margin-right: 16px;
  }
`;

export const ViewButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  font-family: Gothic A1;
  font-size: 16px;
  font-weight: 500;
  color: #464654;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 14px;
    padding: 6px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 12px;
    padding: 4px;
  }
`;

export const LoadMoreButton = styled.button`
  width: 100%;
  padding: 16px;
  margin-top: 20px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  color: #666;
  cursor: pointer;

  &:hover {
    background-color: #e9e9e9;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 12px;
    font-size: 14px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;
    font-size: 12px;
    margin-top: 15px;
  }
`;

export const LoadingIndicator = styled.div`
  text-align: center;
  padding: 16px;
  color: #666;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;
    font-size: 14px;
  }
`;

export const Divider = styled.span`
  color: #464654;
  margin: 0 8px;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 14px;
    margin: 0 6px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 12px;
    margin: 0 4px;
  }
`;
