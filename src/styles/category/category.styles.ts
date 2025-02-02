import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  width: 100vw;
  background-color: #101148;
`;

export const Sidebar = styled.div`
  display: flex;
  width: 300px;
  overflow: hidden;
  border: 2px solid #d1c1ff;
  border-radius: 0 12px 0 0;
`;

export const PurpleAccent = styled.div`
  width: 150px;
  background-color: #d1c1ff;
  flex-direction: column;
  display: flex;
  padding-top: 50px;
  justify-content: flex-start;
`;

export const MenuSection = styled.div`
  background-color: #101148;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const TabContainer = styled.div`
  display: flex;
  border-bottom: 2px solid rgb(255, 255, 255);
  width: 200px;
`;

export const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 15px 0;
  text-align: center;
  background-color: ${(props) => (props.$active ? '#101148' : '#101148')};
  color: ${(props) => (props.$active ? 'white' : 'white')};
  border: none;
  cursor: pointer;
  font-size: 14px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    bottom: -3px;
    transform: translateX(-50%);
    width: 50px;
    height: 5.763px;
    border-radius: 5px;
    background-color: ${(props) => (props.$active ? '#B8EFFD' : 'transparent')};
    transition: all 0.2s ease;
  }

  &:first-child::before {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 60%;
    width: 1px;
    background-color: #2d2f63;
  }
`;

export const MainMenuItem = styled.button<{ $active: boolean }>`
  width: 100%;
  padding: 12px 15px;
  text-align: left;
  background-color: ${(props) => (props.$active ? '#101148' : '#D1C1FF')};
  color: ${(props) => (props.$active ? '#FFF' : '#000')};
  border: none;
  cursor: pointer;
  font-size: 14px;
  position: relative;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.$active ? '#101148' : '#BFB0EE')};
  }

  ${(props) =>
    props.$active &&
    `
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
    }
  `}
`;

export const SubMenuContainer = styled.div`
  flex: 1;
  background-color: #101148;
`;

export const SubMenuItem = styled.button<{ $active: boolean }>`
  width: 100%;
  padding: 12px 20px;
  text-align: left;
  background-color: transparent;
  color: ${(props) => (props.$active ? '#ffffff' : '#8e8ea0')};
  border: none;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #101148;
  }
`;

export const SearchContainer = styled.div`
  flex: 1;
  margin-right: 998px;
`;

export const MainContent = styled.div`
  flex: 1;
  padding: 30px;
  background-color: #101148;
  min-height: 100vh;
`;

export const ContentTitle = styled.h2`
  color: white;
  margin-bottom: 20px;
  font-family: 'Gothic A1';
  font-size: 38px;
  font-weight: 600;
`;

export const AnimeGrid = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-left: 180px;
  width: 846px; // 188px * 4 (cards) + 33px * 3 (gaps) = 846px
`;

export const GridRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  padding-bottom: 33px;
  border-bottom: 1px solid #2d2f63;
  margin-bottom: 33px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const AnimeCard = styled.div`
  cursor: pointer;
`;

export const AnimeImage = styled.div`
  width: 200px;
  height: 200px;
  aspect-ratio: 1;
  background-color: #2d2f63;
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const AnimeTitle = styled.p`
  color: white;
  width: 188px;
  font-size: 14px;
  text-align: center;
`;
