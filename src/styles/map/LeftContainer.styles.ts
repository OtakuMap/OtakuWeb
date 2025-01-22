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
  left: 4px; // 5 * 0.8
  width: 12px; // 15 * 0.8
  height: 12px; // 15 * 0.8
  border: none;
  outline: none;
  cursor: pointer;
  background: url('/src/assets/search_delete.png') no-repeat center / contain;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

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
  width: 237px; // 296 * 0.8
  left: 44px; // 55 * 0.8
  top: 172px; // 215 * 0.8
  display: flex;
  flex-direction: column;
  gap: 8px; // 10 * 0.8
`;

export const RecommendationItem = styled.div<RecommendationItemProps>`
  box-sizing: border-box;
  width: 237px; // 296 * 0.8
  height: 25px; // 31 * 0.8
  border: 1px solid #d1c1ff;
  border-radius: 16px; // 20 * 0.8
  padding: 4px 16px; // 5 * 0.8, 20 * 0.8
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(209, 193, 255, 0.1);
  }
`;

export const RecommendationText = styled.span`
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 400;
  font-size: 13px; // 16 * 0.8
  line-height: 16px; // 20 * 0.8
  color: #ffffff;
`;
