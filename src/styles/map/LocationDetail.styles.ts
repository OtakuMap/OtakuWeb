import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  width: 698px;
  height: 224px;
  left: 50%;
  bottom: 40px;
  transform: translateX(-50%);
  background: #252660;
  box-shadow: 0px 10px 8px 3px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  z-index: 1000;
`;

export const PaginationButton = styled.button`
  position: absolute;
  top: 90px;
  right: 13px;
  width: 28px;
  height: 18px;
  background: transparent; // 배경색 제거
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }
`;

export const LocationImageWrapper = styled.div`
  position: relative;
  width: 159px;
  height: 175px;
  left: 28px;
  top: 24px;
  overflow: hidden;
  border-radius: 8px;
`;

export const LocationImage = styled.img`
  position: absolute;
  width: 159px;
  height: 175px;
  left: 28px;
  top: 24px;
  object-fit: cover;
  border-radius: 8px;
  // width: 100%;
  // height: 100%;
  // object-fit: cover;
  // transition: transform 0.3s ease;
`;

export const Title = styled.h1`
  position: absolute;
  left: 209px;
  top: 17px;
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 38px;
  color: #ffffff;
  margin: 0;
`;

export const Subtitle = styled.h2`
  position: absolute;
  left: 209px;
  top: 56px;
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 38px;
  color: #ffffff;
  margin: 0;
`;

export const Address = styled.p`
  position: absolute;
  left: 209px;
  top: 94px;
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  color: #ffffff;
  margin: 0;
  max-width: 450px;
`;

export const TagContainer = styled.div`
  position: absolute;
  left: 204px;
  bottom: 24px;
  display: flex;
  gap: 8px;
`;

export const Tag = styled.div`
  width: 87px;
  height: 26px;
  background: #bdaee5;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #000000;
`;

export const FavButton = styled.button`
  position: absolute;
  width: 31px;
  height: 28px;
  right: 160px; // ReviewButton보다 왼쪽에 위치
  bottom: 24px; // ReviewButton과 같은 높이
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export const ReviewButton = styled.button`
  position: absolute;
  width: 124px;
  height: 42px;
  right: 24px;
  bottom: 24px;
  background: #fff5d5;
  border-radius: 25px;
  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 30px;
  color: #101148;

  &:hover {
    background: #ffe9b3;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 13px;
  padding: 4px; // padding 추가
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;

  svg {
    min-width: 20px; // 최소 크기 지정
    min-height: 20px; // 최소 크기 지정
    width: 20px;
    height: 20px;
    color: #ffffff;
    stroke: currentColor;
  }

  &:hover {
    background: transparent;
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;
