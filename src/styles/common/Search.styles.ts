import styled from 'styled-components';

export const SearchContainer = styled.div`
  position: relative;
  width: 340px;
  margin: 0 auto;
  padding-top: 20px;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 35px;
  padding-left: 45px; // 아이콘 공간 확보
  background: transparent;
  border: none;
  color: #999797;
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  outline: none;

  &::placeholder {
    color: #999797;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 10px;
  top: 25px;
  width: 25px;
  height: 25px;
  background: url('/src/assets/search.png') no-repeat center / contain;
  cursor: pointer;
`;

export const SearchLine = styled.div`
  position: absolute;
  width: 100%;
  height: 2px;
  background: #d1c1ff;
  bottom: -10px;
`;
