import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #0c004b;
  min-height: 100vh;
  padding: 20px; // 전체 패딩 줄임
  width: 100vw;
  position: relative;
`;

export const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-color: #d1c1ff;
  width: 100%;
  margin-top: 51px;
`;

export const IconContainer = styled.div`
  position: absolute;
  top: 105px;
  right: 80px; // 오른쪽 여백 조정
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const IconImage = styled.img``;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 60px; // 좌우 여백 줄임
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
  margin-bottom: 0;
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
  width: 1550px; // 넓이 조정
  border-radius: 0px 20px 20px 20px;
  padding: 45px 72px;
  margin-top: -1px;
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
  margin-left: 1250px;

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: inherit;
    padding: 0;

    &:hover {
      color: #black;
    }
  }
`;

export const CategoryFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  color: #666;
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
`;

export const CategoryDivider = styled.span`
  color: #666666;
  font-size: 16px;
  font-weight: 500;
`;

export const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 53px;
`;

export const EventCard = styled.div<{ isSelected: boolean }>`
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.2s;
  position: relative;
  cursor: pointer;
  width: 250px;

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
  width: 250px;
  height: 250px;
  border-radius: 15px;
  object-fit: cover;
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
  color: #000000;
  margin-bottom: 8px;
  font-family: Gothic A1;
  font-weight: 600;
  font-size: 18px;
  line-height: 22.5px;
  letter-spacing: 0%;
  text-align: center;
`;

export const EventCategory = styled.span`
  font-size: 12px;
  color: #666;
`;

export const EventDate = styled.div`
  color: #000000;
  margin-top: 4px;
  font-family: Gothic A1;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
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
