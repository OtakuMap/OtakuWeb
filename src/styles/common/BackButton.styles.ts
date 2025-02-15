import styled from 'styled-components';

export const StyledBackButton = styled.button`
  position: absolute;
  left: 4px;
  top: 12px;
  width: 27px;
  height: 17.7px;
  border: none;
  cursor: pointer;
  padding: 0;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &:focus {
    outline: none;
  }
`;
