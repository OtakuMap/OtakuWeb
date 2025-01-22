import styled from 'styled-components';

export const SearchContainer = styled.div`
  position: relative;
  width: 272px; // 340 * 0.8
  margin: 0 auto;
  padding-top: 16px; // 20 * 0.8
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 28px; // 35 * 0.8
  padding-left: 36px; // 45 * 0.8 아이콘 공간 확보
  background: transparent;
  border: none;
  color: #999797;
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 400;
  font-size: 14px; // 18 * 0.8
  line-height: 18px; // 22 * 0.8
  outline: none;

  &::placeholder {
    color: #999797;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 8px; // 10 * 0.8
  top: 20px; // 25 * 0.8
  width: 20px; // 25 * 0.8
  height: 20px; // 25 * 0.8
  background: url('/src/assets/search.png') no-repeat center / contain;
  cursor: pointer;
`;

export const SearchLine = styled.div`
  position: absolute;
  width: 100%;
  height: 2px;
  background: #d1c1ff;
  bottom: -8px; // -10 * 0.8
`;

export const SuggestionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border-radius: 6px; // 8 * 0.8
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); // 8 * 0.8
  margin-top: 3px; // 4 * 0.8
  max-height: 240px; // 300 * 0.8
  overflow-y: auto;
  z-index: 1000;
`;

export const SuggestionItem = styled.div`
  padding: 10px 13px; // 12 * 0.8, 16 * 0.8
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const SuggestionTitle = styled.div`
  font-size: 11px; // 14 * 0.8
  font-weight: 500;
  color: #333;
  margin-bottom: 3px; // 4 * 0.8
`;

export const SuggestionAnime = styled.div`
  font-size: 10px; // 12 * 0.8
  color: #666;
  margin-bottom: 3px; // 4 * 0.8
`;

export const HashtagContainer = styled.div`
  display: flex;
  gap: 6px; // 8 * 0.8
  flex-wrap: wrap;
`;

export const Hashtag = styled.span`
  font-size: 10px; // 12 * 0.8
  color: #0066cc;
  background-color: #f0f7ff;
  padding: 2px 6px; // 2px, 8 * 0.8
  border-radius: 10px; // 12 * 0.8
`;
