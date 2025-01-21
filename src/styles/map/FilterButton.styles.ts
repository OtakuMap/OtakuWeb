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
  justify-content: space-between;
  padding: 0 11px;
`;

export const FilterOption = styled.div<{ $isActive: boolean }>`
  width: 75px;
  height: 35px;
  background: ${(props) => (props.$isActive ? '#9A86D3' : 'transparent')};
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BaseFilterText = styled.span`
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  color: #ffffff;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: opacity 0.2s;
  pointer-events: none;
`;

export const LeftText = styled(BaseFilterText)<{ $isVisible: boolean }>`
  left: 15px;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
`;

export const RightText = styled(BaseFilterText)<{ $isVisible: boolean }>`
  right: 20px;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
`;
