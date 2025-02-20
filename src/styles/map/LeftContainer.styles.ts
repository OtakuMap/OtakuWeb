import styled from 'styled-components';

const IPHONE_15_BREAKPOINT = '430px';

interface RecommendationItemProps {
  $isSelected?: boolean;
}

export const Container = styled.div`
  position: relative;
  width: 320px;
  height: 100vh;
  background: #101148;
  padding: 16px;
  flex-shrink: 0;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60vh;
    border-radius: 20px 20px 0 0;
    transform: translateY(calc(100% - 60px));
    transition: transform 0.3s ease-in-out;
    z-index: 1000;
    padding: 12px;

    &.expanded {
      transform: translateY(0);
    }
  }
`;

export const HandleBar = styled.div`
  display: none;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    display: block;
    width: 40px;
    height: 4px;
    background: #d1c1ff;
    border-radius: 2px;
    margin: 8px auto;
    cursor: pointer;
  }
`;

export const SearchWrapper = styled.div`
  position: relative; // 기본 스타일 추가
  width: 100%; // 기본 스타일 추가
  z-index: 1000; // 기본 스타일 추가

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    position: fixed;
    top: 16px;
    left: 16px;
    right: 16px;
    z-index: 1000;
    background: transparent;
  }
`;

export const ButtonContainer = styled.div`
  position: absolute;
  display: flex;
  gap: 16px;
  left: 26px;
  top: 84px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    position: relative;
    left: 0;
    top: 0;
    padding: 16px;
    justify-content: space-between;
    margin-top: 48px;
  }
`;

export const SavedRoutesButton = styled.button<{ isActive?: boolean }>`
  width: 128px; // 160 * 0.8
  height: 77px; // 96 * 0.8
  background: ${(props) => (props.isActive ? ' #9A86D3' : '#d1c1ff')};
  border-radius: 12px; // 15 * 0.8
  border: none;
  cursor: pointer;
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 700;
  font-size: 16px; // 20 * 0.8
  line-height: 20px; // 25 * 0.8
  text-align: center;
  color: ${(props) => (props.isActive ? '#FFFFFF' : '#101148')};
  transition: all 0.2s ease-in-out;
  outline: none;

  &:hover {
    opacity: 0.9;
    border: none;
    outline: none;
  }
  &:focus {
    border: none;
    outline: none;
  }

  &:focus-visible {
    border: none;
    outline: none;
  }
`;

export const FavoritePlacesButton = styled.button<{ isActive?: boolean }>`
  width: 124px; // 155 * 0.8
  height: 77px; // 96 * 0.8
  background: ${(props) => (props.isActive ? '#FFC50C' : '#fff5d5')};
  border-radius: 12px; // 15 * 0.8
  border: none;
  outline: none;
  cursor: pointer;
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 700;
  font-size: 16px; // 20 * 0.8
  line-height: 20px; // 25 * 0.8
  text-align: center;
  color: ${(props) => (props.isActive ? '#FFFFFF' : '#101148')};
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
    border: none;
    outline: none;
  }
  &:focus {
    border: none;
    outline: none;
  }

  &:focus-visible {
    border: none;
    outline: none;
  }
`;

export const RecentSearchesTitle = styled.h2`
  position: absolute;
  white-space: nowrap;
  left: 44px;
  bottom: 188px;
  font-family: 'Gothic A1';
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #cccccc;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    position: relative;
    left: 16px;
    bottom: auto;
    margin-top: 24px;
  }
`;

export const RecentSearchesBox = styled.div`
  position: absolute;
  width: 270px;
  height: 162px;
  left: 26px;
  bottom: 16px;
  background: #252660;
  border-radius: 20px;
  filter: blur(4px);

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    position: relative;
    width: calc(100% - 32px);
    left: 16px;
    bottom: auto;
    margin-top: 8px;
  }
`;

export const RecentSearchList = styled.div`
  position: absolute;
  width: 142px;
  left: 41px;
  bottom: 32px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 1;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    position: relative;
    width: calc(100% - 32px);
    left: 16px;
    bottom: auto;
    margin-top: -150px;
  }
`;

export const RecentSearchItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 20px; // 25 * 0.8
`;

export const DeleteButton = styled.button`
  position: absolute;
  left: 4px;
  width: 12px;
  height: 12px;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent; /* 배경 투명하게 설정 */
  box-shadow: none; /* 그림자 제거 */

  /* Safari에서 기본 버튼 스타일 제거 */
  -webkit-appearance: none;

  /* 자식 요소(X 아이콘)에 대한 그림자 효과 제거 */
  & > * {
    filter: none;
    box-shadow: none;
  }

  &:focus {
    outline: none;
  }
`;
export const SearchText = styled.span`
  margin-left: 20px; // 25 * 0.8
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 400;
  font-size: 16px; // 20 * 0.8
  line-height: 20px; // 25 * 0.8
  color: #cccccc;
  white-space: nowrap;
`;

export const RecommendationsContainer = styled.div`
  position: absolute;
  width: 268px; // 컨테이너 너비 증가
  left: 26px;
  top: 172px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 190px;
  overflow-y: auto;
  overflow-x: hidden; // 가로 스크롤 방지
  padding: 0 10px;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(209, 193, 255, 0.3);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(209, 193, 255, 0.5);
  }

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    position: relative;
    width: calc(100% - 32px);
    left: 16px;
    top: 0;
    max-height: 30vh;
    margin-top: 13px;
  }
`;

export const RecommendationItem = styled.div<RecommendationItemProps>`
  box-sizing: border-box;
  width: 100%;
  height: auto; // 높이를 자동으로
  border: 1px solid #d1c1ff;
  border-radius: 20px;
  padding: 5px 12px;
  display: flex; // 다시 flex로
  align-items: center; // 세로 중앙 정렬
  justify-content: center;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    padding: 8px 16px;
    margin-bottom: 8px;
  }
`;

export const RecommendationText = styled.div`
  // span에서 div로 변경
  width: 100%;
  font-family: 'Gothic A1';
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #ffffff;
  text-align: center;
  padding: 1px 0;
  overflow-wrap: break-word;
  white-space: normal;
  word-break: break-all;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    font-size: 14px;
    line-height: 22px;
  }
`;
