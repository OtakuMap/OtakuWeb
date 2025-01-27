import styled from 'styled-components';

export const FilterContainer = styled.div`
  position: absolute;
  width: 149px; // 186 * 0.8
  height: 44px; // 55 * 0.8
  right: 16px; // 20 * 0.8
  bottom: 24px; // 30 * 0.8
  z-index: 2;
  background: #101148;
  border-radius: 16px; // 20 * 0.8
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 9px; // 11 * 0.8
`;

export const FilterOption = styled.div<{ $isActive: boolean }>`
  width: 60px; // 75 * 0.8
  height: 28px; // 35 * 0.8
  background: ${(props) => (props.$isActive ? '#9A86D3' : 'transparent')};
  border-radius: 12px; // 15 * 0.8
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
  font-size: 16px; // 20 * 0.8
  line-height: 24px; // 30 * 0.8
  color: #ffffff;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: opacity 0.2s;
  pointer-events: none;
`;

export const LeftText = styled(BaseFilterText)<{ $isVisible: boolean }>`
  left: 12px; // 15 * 0.8
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
`;

export const RightText = styled(BaseFilterText)<{ $isVisible: boolean }>`
  right: 16px; // 20 * 0.8
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
`;
