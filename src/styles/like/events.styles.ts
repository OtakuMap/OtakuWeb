import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #0c004b;
  min-height: 100vh;
  padding: 40px;
  width: 100vw;
  position: relative;
`;

export const IconContainer = styled.div`
  position: absolute;
  top: 75px;
  right: 430px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const IconImage = styled.img``;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 208px;
`;

export const Title = styled.h1`
  color: #fff;
  font-family: 'Gothic A1';
  font-size: 38px;
  font-weight: 600;
  margin: 48px 0;
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 0px;
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
`;

export const EventListContainer = styled.div`
  background: white;
  width: 1197px;
  border-radius: 0px 20px 20px 20px;
  padding: 45px 72px;
`;

export const ListHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

export const ListTitle = styled.h2`
  color: #000;
  font-family: 'Gothic A1';
  font-size: 30px;
  font-weight: 700;
`;

export const HeaderDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #464654;
  margin: 16px 0;
`;

export const ListActions = styled.div`
  display: flex;
  gap: 8px;
  color: #666;
  font-size: 14px;
  margin-left: 900px;

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: inherit;
    padding: 0;

    &:hover {
      color: #333;
    }
  }
`;

export const CategoryFilter = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`;

export const CategoryButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border: none;
  background: none;
  color: ${(props) => (props.active ? '#333' : '#999')};
  font-weight: ${(props) => (props.active ? '600' : '400')};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #333;
  }
`;

export const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

export const EventCard = styled.div<{ isSelected: boolean }>`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  position: relative;
  cursor: pointer;

  ${(props) =>
    props.isSelected &&
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
`;

export const EventImage = styled.img`
  width: 212px;
  height: 206px;
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

  &:hover {
    transform: scale(1.1);
  }
`;

export const EventDetails = styled.div`
  padding: 16px;
`;

export const EventTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
`;

export const EventCategory = styled.span`
  font-size: 12px;
  color: #666;
`;

export const EventDate = styled.div`
  font-size: 12px;
  color: #999;
  margin-top: 4px;
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
`;

export const LoadingText = styled.div`
  text-align: center;
  color: #666;
  padding: 20px;
`;
