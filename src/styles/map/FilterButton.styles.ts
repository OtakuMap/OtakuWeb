import styled from 'styled-components';

export const FilterContainer = styled.div`
  position: absolute;
  width: 186px;
  height: 55px;
  right: 20px;
  bottom: 30px;
  z-index: 2;
  background: #101148;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding-left: 11px;
`;

export const ToggleButton = styled.div<{ isActive: boolean }>`
  width: 75px;
  height: 35px;
  background: ${(props) => (props.isActive ? '#9A86D3' : 'transparent')};
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.2s;
`;

export const FilterText = styled.span`
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  color: #ffffff;
  margin-left: 15px;
`;
