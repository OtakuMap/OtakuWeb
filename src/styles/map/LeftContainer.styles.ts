import styled from 'styled-components';

interface RecommendationItemProps {
  $isSelected?: boolean;
}

export const Container = styled.div`
  position: relative;
  width: 320px; // 400 * 0.8
  height: 100vh;
  background: #101148;
  padding: 16px; // 20 * 0.8
  flex-shrink: 0;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  display: flex;
  gap: 16px; // 20 * 0.8
  left: 26px; // 33 * 0.8
  top: 84px; // 105 * 0.8
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
  left: 44px; // 55 * 0.8
  bottom: 188px; // 235 * 0.8
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 600;
  font-size: 16px; // 20 * 0.8
  line-height: 20px; // 25 * 0.8
  color: #cccccc;
`;

export const RecentSearchesBox = styled.div`
  position: absolute;
  width: 270px; // 338 * 0.8
  height: 162px; // 202 * 0.8
  left: 26px; // 32 * 0.8
  bottom: 16px; // 20 * 0.8
  background: #252660;
  border-radius: 20px; // 25 * 0.8
  filter: blur(4px); // 5 * 0.8
`;

export const RecentSearchList = styled.div`
  position: absolute;
  width: 142px; // 178 * 0.8
  left: 41px; // 51 * 0.8
  bottom: 32px; // 40 * 0.8
  display: flex;
  flex-direction: column;
  gap: 8px; // 10 * 0.8
  z-index: 1;
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
  // 아래 세 줄이 핵심입니다
  overflow-wrap: break-word;
  white-space: normal;
  word-break: break-all;
`;
