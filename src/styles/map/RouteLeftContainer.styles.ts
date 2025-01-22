import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 320px; // 400px * 0.8
  height: 100vh;
  background: #101148;
  padding: 25px; // 31px * 0.8
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
`;

export const RouteItem = styled.div`
  position: relative;
  width: 100%;
  height: 38px;
  cursor: pointer;
  margin-bottom: 16px;

  &:active {
    cursor: grabbing;
  }

  /* 마지막 아이템의 margin도 유지 */
  &:last-child {
    margin-bottom: 16px;
  }
`;

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
`;

export const RadioButton = styled.input`
  position: absolute;
  width: 22px; // 28px * 0.8
  height: 22px; // 28px * 0.8
  right: 7px; // 9px * 0.8
  top: 8px; // 10px * 0.8
  appearance: none;
  border-radius: 50%;
  background: #101148;
  cursor: pointer;
  border: 2px solid #ffffff;

  &:checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 13px; // 16px * 0.8
    height: 13px; // 16px * 0.8
    background: #ffffff;
    border-radius: 50%;
  }
`;

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
`;
