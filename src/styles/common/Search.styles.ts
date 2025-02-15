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
`;

export const SuggestionItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  color: #333;

  &:hover {
    background-color: #d1c1ff;
  }
`;
