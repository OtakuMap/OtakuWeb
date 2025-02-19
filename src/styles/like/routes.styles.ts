import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #0c004b;
  min-height: 100vh;
  padding: 20px; // 전체 패딩 줄임
  width: 100vw;
  position: relative;
`;

export const HorizontalDivider = styled.hr`
  border: 0;
  height: 1px;
  background-color: #d1c1ff;
  width: 100%;
  margin-top: 31px;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 60px; // 좌우 여백 줄임
`;

export const IconContainer = styled.div`
  position: absolute;
  top: 105px;
  right: 80px; // 오른쪽 여백 조정
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const IconImage = styled.img``;

export const Title = styled.h1`
  color: #fff;
  font-family: 'Gothic A1';
  font-size: 38px;
  font-weight: 600;
  margin: 48px 0;
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 0;
`;

export const Tab = styled.button<{ active?: boolean }>`
  width: 194px;
  height: 82px;
  border: none;
  background-color: ${(props) => (props.active ? '#fff' : '#CCC')};
  color: ${(props) => (props.active ? '#000' : '#464654')};
  border-radius: 20px 20px 0px 0px;
  cursor: pointer;
  text-align: center;
  font-family: 'Gothic A1';
  font-size: 20px;
  font-weight: 600;
`;

export const RouteListContainer = styled.div`
  background: white;
  background: white;
  width: 1550px; // 넓이 조정
  border-radius: 0px 20px 20px 20px;
  padding: 45px 72px;
  margin-top: -1px;
`;

export const ListHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

export const ListTitle = styled.h2`
  color: #000;
  font-family: 'Gothic A1';
  font-size: 30px;
  font-weight: 700;
`;

export const HeaderDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #464654;
  margin: 16px 0;
`;

export const ListActions = styled.div`
  display: flex;
  gap: 8px;
  color: #666;
  font-size: 14px;
  margin-left: 1250px;

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: inherit;
    padding: 0;

    &[disabled] {
      cursor: default;
      color: #666;
    }

    &:not([disabled]):hover {
      color: black;
    }
  }

  button[data-active='true'] {
    color: black;
  }
`;

export const RouteContent = styled.div`
  display: flex;
  align-items: center;
  width: 879px;
  height: 56px;
  flex: 1;
  background-color: #e9e2ff;
  padding: 16px;
  border-radius: 15px;
  margin-bottom: 55px;
  color: #000;
  text-align: center;
  font-family: 'Gothic A1';
  font-size: 20px;
  font-weight: 600;
  &:hover {
    background-color: #f0f0ff;
  }
`;

export const RouteItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const RadioButton = styled.div<{ checked: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid #7b66ff;
  border-radius: 50%;
  margin-right: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.checked ? '#7B66FF' : 'transparent')};

  &::after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: white;
    display: ${(props) => (props.checked ? 'block' : 'none')};
  }
`;

export const RouteTitle = styled.span`
  flex: 1;
  color: #333;
  font-size: 14px;
`;

export const StarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  margin-bottom: 55px;
`;

export const StarIcon = styled.img`
  margin-right: 64px;
`;

export const ViewButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  margin-top: 15px;
  margin-bottom: 15px;
  font-family: Gothic A1;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  text-align: center;
  color: #464654;
`;

export const Span = styled.img`
  color: #464654;
  font-size: 16px;
`;

export const LoadMoreButton = styled.button`
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  background-color: #f5f5f5;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;

export const LoadingIndicator = styled.div`
  text-align: center;
  padding: 1rem;
  color: #666;
`;

export const Divider = styled.span`
  color: #464654;
  margin: 0 8px;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
`;
