import styled from 'styled-components';

export const StyledBackButton = styled.button`
  position: absolute;
  left: 5px;
  top: 15px;
  width: 34px;
  height: 22.1px;
  border: 1.5px solid #d1c1ff;
  border: none;
  background: url('/src/assets/back.png') no-repeat center / contain;
  cursor: pointer;
  padding: 0;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;
