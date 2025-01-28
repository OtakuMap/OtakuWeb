import styled from 'styled-components';

export const StyledBackButton = styled.button`
  position: absolute;
  left: 4px; // 5 * 0.8
  top: 12px; // 15 * 0.8
  width: 27px; // 34 * 0.8
  height: 17.7px; // 22.1 * 0.8
  border: 1.2px solid #d1c1ff; // 1.5 * 0.8
  border: none;
  background: url('/src/assets/back.png') no-repeat center / contain;
  cursor: pointer;
  padding: 0;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;
