import styled from 'styled-components';

const IPHONE_15_BREAKPOINT = '430px';

export const Container = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  width: 100vw;
  background-color: #101148;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    flex-direction: column;
    margin-top: 20px;
    width: 100%;
  }
`;

export const Sidebar = styled.div`
  margin-top: 30px;
  display: flex;
  width: 300px;
  overflow: hidden;
  border: 2px solid #d1c1ff;
  border-radius: 0 12px 0 0;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    margin-top: 10px;
    width: 100%;
    border-radius: 0;
    flex-direction: column;
  }
`;

export const PurpleAccent = styled.div`
  width: 150px;
  background-color: #d1c1ff;
  flex-direction: column;
  display: flex;
  padding-top: 50px;
  justify-content: flex-start;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 100%;
    padding-top: 20px;
    flex-direction: row;
    justify-content: space-around;
  }
`;

export const MenuSection = styled.div`
  background-color: #101148;
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 100%;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  border-bottom: 2px solid rgb(255, 255, 255);
  width: 200px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 100%;
    justify-content: center;
  }
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
  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    text-align: center;
    padding: 10px;
    font-size: 13px;
  }
`;

export const SubMenuContainer = styled.div`
  flex: 1;
  background-color: #101148;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 10px;
  }
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

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: auto;
    padding: 8px 15px;
    text-align: center;
    font-size: 13px;
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  width: 272px;
  margin-left: 40px;
  padding-top: 16px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 90%;
    margin: 20px auto;
    padding-top: 10px;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 28px;
  padding-left: 36px;
  background: transparent;
  border: none;
  color: #999797;
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  outline: none;

  &::placeholder {
    color: #999797;
  }
`;

export const SearchIcon = styled.img`
  position: absolute;
  left: 8px;
  top: 20px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const SearchLine = styled.div`
  position: absolute;
  width: 100%;
  height: 2px;
  background: #d1c1ff;
  bottom: -8px;
`;

export const SuggestionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #e6dfff;
  border-radius: 6px;
  margin-top: 12px;
  max-height: 240px;
  overflow-y: auto;
  z-index: 1000;
  padding: 8px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    max-height: 200px;
  }
`;

export const SuggestionItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  color: #333;

  &:hover {
    background-color: #d1c1ff;
  }

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    padding: 10px;
    font-size: 13px;
  }
`;

export const MainContent = styled.div`
  flex: 1;
  padding: 30px;
  background-color: #101148;
  min-height: 100vh;
  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    padding: 15px;
  }
`;

export const ContentTitle = styled.h2`
  color: white;
  margin-bottom: 20px;
  font-family: 'Gothic A1';
  font-size: 38px;
  font-weight: 600;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    font-size: 24px;
    text-align: center;
    margin-bottom: 15px;
  }
`;

export const AnimeGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 30px;
  margin-left: 180px;
  width: 846px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    margin: 15px auto;
    width: 100%;
    gap: 20px;
  }
`;

export const AnimeRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  padding-bottom: 40px;
  position: relative; // 추가

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    padding-bottom: 20px;
  }

  &::after {
    // border-bottom 대신 after 가상요소 사용
    content: '';
    position: absolute;
    bottom: 0;
    left: -5px; // 왼쪽으로 더 확장
    right: -58px; // 오른쪽으로 더 확장
    height: 1px;
    background-color: #a09797;
  }

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    left: 0;
    right: 0;
  }

  &:last-child::after {
    display: none; // 마지막 행에는 선 없음
  }
`;

export const AnimeCard = styled.div`
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const AnimeImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  background-color: #2d2f63;
  border-radius: 4px;
  margin-bottom: 10px;
  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 150px;
    height: 150px;
  }
`;

export const AnimeTitle = styled.p`
  color: white;
  width: 188px;
  font-family: Gothic A1;
  font-weight: 600;
  font-size: 18px;
  line-height: 22.5px;
  text-align: center;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 140px;
    font-size: 14px;
    line-height: 18px;
  }
`;

export const EventDate = styled.p`
  color: white;
  margin-top: 4px;
  font-family: Gothic A1;
  font-weight: 600;
  font-size: 18px;
  line-height: 22.5px;
  text-align: center;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    font-size: 14px;
    line-height: 18px;
  }
`;

export const LoadMoreButton = styled.button`
  width: 846px;
  height: 48px;
  margin-top: 40px;
  margin-left: 180px;
  background-color: transparent;
  border: 1px solid #2d2f63;
  border-radius: 4px;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2d2f63;
  }

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 90%;
    margin: 20px auto;
    height: 40px;
    font-size: 13px;
  }
`;

export const LoadingIndicator = styled.div`
  width: 846px;
  text-align: center;
  margin-top: 40px;
  margin-left: 180px;
  color: #8e8ea0;
  font-size: 14px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 100%;
    margin: 20px 0;
  }
`;

export const NoResultsMessage = styled.div`
  width: 100%;
  text-align: center;
  padding: 40px 0;
  font-size: 16px;
  color: #666;
`;
