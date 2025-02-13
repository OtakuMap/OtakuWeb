import styled from 'styled-components';

export const SearchContainer = styled.div`
  position: relative;
  width: 272px;
  margin: 0 auto;
  padding-top: 16px;
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

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #e6dfff;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1c1ff;
    border-radius: 3px;
  }
`;

export const LoadingItem = styled.div`
  padding: 8px 16px;
  text-align: center;
  color: #666;
  font-family: 'Gothic A1';
  font-size: 14px;
  line-height: 18px;
`;

export const SuggestionContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0; // 이것은 text-overflow: ellipsis가 작동하게 합니다
`;

export const SuggestionTitle = styled.div`
  font-family: 'Gothic A1';
  font-size: 12px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
`;

export const SuggestionAnime = styled.div`
  font-family: 'Gothic A1';
  font-size: 14px;
  color: #333;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SuggestionType = styled.small`
  font-family: 'Gothic A1';
  font-size: 12px;
  color: #666;
  background-color: #d1c1ff;
  padding: 2px 8px;
  border-radius: 4px;
  margin-left: 8px;
  white-space: nowrap;
`;

// SuggestionItem 스타일 수정
export const SuggestionItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #d1c1ff;

    ${SuggestionType} {
      background-color: #e6dfff;
    }
  }
`;
