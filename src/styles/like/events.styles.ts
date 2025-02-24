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
  padding: 20px;
  width: 100%;
  position: relative;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 10px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 5px;
  }
`;

export const IconContainer = styled.div`
  position: absolute;
  top: 105px;
  right: 80px;
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: ${breakpoints.tablet}) {
    top: 70px;
    right: 40px;
    gap: 8px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    top: 50px;
    right: 20px;
    gap: 5px;
  }
`;

export const IconImage = styled.img`
  max-width: 100%;
  height: auto;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 60px;
  margin-top: 30px;

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

export const Title = styled.h1`
  color: #fff;
  font-family: 'Gothic A1';
  font-size: 38px;
  font-weight: 600;
  margin: 48px 0;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 28px;
    margin: 30px 0;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 22px;
    margin: 32px 10px;
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

export const EventListContainer = styled.div`
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
  margin-left: auto;
  align-items: center;

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
    gap: 4px;
  }
`;

export const CategoryFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  color: #666;
  flex-wrap: wrap;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 4px;
    margin-bottom: 10px;
  }
`;

export const CategoryButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border: none;
  background: none;
  color: ${(props) => (props.active ? '#000000' : '#666666')};
  font-family: Gothic A1;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #000000;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 4px 8px;
    font-size: 14px;
  }
`;

export const CategoryDivider = styled.span`
  color: #666666;
  font-size: 16px;
  font-weight: 500;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 14px;
  }
`;

export const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 53px;

  @media (max-width: ${breakpoints.tablet}) {
    gap: 30px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    gap: 15px;
  }
`;

export const EventCard = styled.div<{ $isSelected: boolean }>`
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.2s;
  position: relative;
  cursor: pointer;
  width: 250px;

  ${(props) =>
    props.$isSelected &&
    `
    outline: 3px solid #7B66FF;
    transform: translateY(-4px);
  `}

  &:hover {
    transform: translateY(-4px);
  }
`;

export const EventImageWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const EventImage = styled.img`
  width: 100%;
  height: 250px;
  border-radius: 15px;
  object-fit: cover;

  @media (max-width: ${breakpoints.mobile}) {
    height: 200px;
  }
`;

export const Controls = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px;
  z-index: 1;
`;

export const StarIconImage = styled.img`
  cursor: pointer;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.3));
  width: 30px;
  height: 30px;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 24px;
    height: 24px;
  }
`;

export const EventDetails = styled.div`
  padding: 16px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;
  }
`;

export const EventTitle = styled.h3`
  color: #000000;
  margin-bottom: 8px;
  font-family: Gothic A1;
  font-weight: 600;
  font-size: 18px;
  line-height: 22.5px;
  letter-spacing: 0%;
  text-align: center;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 16px;
    margin-bottom: 4px;
  }
`;

export const EventCategory = styled.span`
  font-size: 12px;
  color: #666;
  display: block;
  text-align: center;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 10px;
  }
`;

export const EventDate = styled.div`
  color: #000000;
  margin-top: 4px;
  font-family: Gothic A1;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-align: center;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 14px;
  }
`;

export const LoadMoreButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 24px;
  background: none;
  border: 1px solid #ddd;
  border-radius: 8px;
  color: #666;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 8px;
    font-size: 12px;
    margin-top: 16px;
  }
`;

export const LoadingText = styled.div`
  text-align: center;
  color: #666;
  padding: 20px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;
    font-size: 14px;
  }
`;
