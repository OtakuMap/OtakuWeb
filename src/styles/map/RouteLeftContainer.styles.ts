import styled from 'styled-components';

const IPHONE_15_BREAKPOINT = '430px';

export const Container = styled.div`
  position: relative;
  width: 320px; // 400px * 0.8
  height: 100vh;
  background: #101148;
  padding: 25px; // 31px * 0.8

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70vh;
    border-radius: 20px 20px 0 0;
    transform: translateY(calc(100% - 60px));
    transition: transform 0.3s ease-in-out;
    z-index: 1000;

    &.expanded {
      transform: translateY(0);
    }
  }
`;

export const DragHandle = styled.div`
  display: none;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    display: block;
    width: 40px;
    height: 4px;
    background: #d1c1ff;
    border-radius: 2px;
    margin: 8px auto;
    cursor: grab;
  }
`;

export const HandleBar = styled.div`
  display: none;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    display: block;
    width: 40px;
    height: 4px;
    background: #d1c1ff;
    border-radius: 2px;
    margin: 8px auto;
    cursor: grab;
  }
`;

export const Title = styled.h1`
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 600;
  font-size: 14px; // 18px * 0.8
  line-height: 18px; // 22.5px * 0.8
  color: #ffffff;
  margin-top: 24px; // 30px * 0.8
  width: 272px; // 340px * 0.8

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    margin-top: 16px;
    width: 100%;
  }
`;

export const Description = styled.div`
  position: relative;
  margin-top: 8px; // 10px * 0.8
  width: 272px; // 340px * 0.8
  display: flex;
  align-items: flex-end;
  gap: 6px; // 8px * 0.8

  p {
    font-family: 'Gothic A1';
    font-style: normal;
    font-weight: 600;
    font-size: 24px; // 30px * 0.8
    line-height: 30px; // 37.5px * 0.8
    color: #ffffff;
    margin: 0;
    word-break: keep-all;
  }
`;

export const ButtonContainer = styled.div`
  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px;
    background: #101148;
    display: flex;
    gap: 12px;
    z-index: 1001;
  }
`;

export const EditButton = styled.img`
  width: 16px; // 20px * 0.8
  height: 16px; // 20px * 0.8
  cursor: pointer;
  margin-bottom: 5px; // 6px * 0.8
`;

export const Divider = styled.hr`
  position: absolute;
  width: 272px; // 340px * 0.8
  height: 0px;
  left: 25px; // 31px * 0.8
  top: 182px; // 227px * 0.8
  border: 2px solid #d1c1ff;
  margin: 0;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    position: relative;
    width: calc(100% - 32px);
    left: 16px;
    top: 0;
    margin: 16px 0;
  }
`;

export const RouteList = styled.div`
  position: absolute;
  left: 25px;
  top: 216px;
  width: 285px;
  height: 254px;
  overflow-x: hidden;
  overflow-y: auto;
  padding-right: 10px;
  padding-bottom: 0;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(209, 193, 255, 0.2);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(209, 193, 255, 0.5);
    border-radius: 4px;

    &:hover {
      background: rgba(209, 193, 255, 0.8);
    }
  }

  /* 스크롤바 여백 */
  scrollbar-gutter: stable;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: calc(100% - 250px);
    padding: 16px;
    margin-top: 16px;
  }
`;

export const RouteItem = styled.div`
  position: relative;
  width: 100%;
  height: 38px;
  cursor: pointer;
  margin-bottom: 16px;
  touch-action: none; // 모바일 터치 동작 제어
  user-select: none; // 텍스트 선택 방지

  will-change: transform; // 성능 최적화
  transform: translateZ(0); // 하드웨어 가속
  -webkit-tap-highlight-color: transparent; // 터치 하이라이트 제거

  &:active {
    cursor: grabbing;
  }

  &[data-dragging='true'] {
    z-index: 1000;
  }

  /* 마지막 아이템의 margin도 유지 */
  &:last-child {
    margin-bottom: 16px;
  }

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    padding: 4px 0;
    touch-action: pan-x; // 수평 스크롤만 허용
  }
`;

// export const RouteItem = styled.div`
//   position: relative;
//   width: 100%;
//   height: 38px;
//   cursor: pointer;
//   margin-bottom: 16px;

//   &:active {
//     cursor: grabbing;
//   }

//   /* 마지막 아이템의 margin도 유지 */
//   &:last-child {
//     margin-bottom: 16px;
//   }

//   @media (max-width: ${IPHONE_15_BREAKPOINT}) {
//     width: calc(100% - 32px);
//     margin: 0 16px 16px 16px;
//   }
// `;

export const NumberBox = styled.div`
  position: absolute;
  width: 30px; // 38px * 0.8
  height: 30px; // 38px * 0.8
  left: 0px;
  top: 4px; // 5px * 0.8
  background: #d1c1ff;
  border-radius: 8px; // 10px * 0.8
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Gothic A1';
  font-weight: 800;
  font-size: 18px; // 23px * 0.8
  color: #252660;
`;

export const LocationBox = styled.div`
  position: absolute;
  width: 224px; // 280px * 0.8
  height: 38px; // 48px * 0.8
  left: 46px; // 57px * 0.8
  top: 0;
  background: #ffffff;
  border-radius: 12px; // 15px * 0.8
  display: flex;
  align-items: center;
  padding: 0 12px; // 15px * 0.8
  font-family: 'Gothic A1';
  font-weight: 600;
  font-size: 16px; // 20px * 0.8
  color: #000000;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: calc(100% - 80px); // NumberBox와 RadioButton의 공간을 고려한 너비
  }
`;

export const RadioButton = styled.input`
  position: absolute;
  width: 22px;
  height: 22px;
  right: 7px;
  top: 8px;
  appearance: none;
  border-radius: 50%;
  background: #101148;
  cursor: pointer;
  border: 2px solid #ffffff;
  transform: translateZ(0); // 하드웨어 가속
  transition: all 0.1s ease; // 트랜지션 시간 단축

  &:checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 13px;
    height: 13px;
    background: #ffffff;
    border-radius: 50%;
    transition: all 0.2s ease; // 애니메이션 효과 추가
  }

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    right: 0;
    width: 26px; // 터치 영역 확대
    height: 26px;
    padding: 8px; // 터치 영역 확대
  }
`;

// export const RadioButton = styled.input`
//   position: absolute;
//   width: 22px; // 28px * 0.8
//   height: 22px; // 28px * 0.8
//   right: 7px; // 9px * 0.8
//   top: 8px; // 10px * 0.8
//   appearance: none;
//   border-radius: 50%;
//   background: #101148;
//   cursor: pointer;
//   border: 2px solid #ffffff;

//   &:checked::after {
//     content: '';
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     width: 13px; // 16px * 0.8
//     height: 13px; // 16px * 0.8
//     background: #ffffff;
//     border-radius: 50%;
//   }
//   @media (max-width: ${IPHONE_15_BREAKPOINT}) {
//     right: 0;
//   }
// `;

export const SaveButton = styled.button`
  position: absolute;
  width: 258px; // 323px * 0.8
  height: 51px; // 64px * 0.8
  left: 50%;
  bottom: 24px; // 30px * 0.8
  transform: translateX(-50%);
  background: #fff5d5;
  border-radius: 24px; // 30px * 0.8
  font-family: 'Gothic A1';
  font-weight: 600;
  font-size: 19px; // 24px * 0.8
  color: #101148;
  border: none;
  cursor: pointer;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    position: relative;
    left: 0;
    bottom: 0;
    transform: none;
    flex: 2;
  }
`;

export const DeleteButton = styled.button`
  position: absolute;
  right: 17px;
  top: 470px; // 스크롤 영역을 고려하여 위치 조정
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #ffffff;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    position: relative;
    right: 0;
    top: 0;
    flex: 1;
    background: rgba(255, 255, 255, 0.1);
    padding: 12px;
    border-radius: 24px;
  }
`;
