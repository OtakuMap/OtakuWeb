import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  width: 628px; // 698 * 0.9
  height: 202px; // 224 * 0.9
  left: 50%;
  bottom: 36px; // 40 * 0.9
  transform: translateX(-50%);
  background: #252660;
  box-shadow: 0px 9px 7px 3px rgba(0, 0, 0, 0.25); // 10 * 0.9, 8 * 0.9
  border-radius: 23px; // 25 * 0.9
  z-index: 1000;
`;

export const PaginationButton = styled.button`
  position: absolute;
  top: 81px; // 90 * 0.9
  right: 12px; // 13 * 0.9
  width: 25px; // 28 * 0.9
  height: 16px; // 18 * 0.9
  background: transparent;
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
  width: 143px; // 159 * 0.9
  height: 158px; // 175 * 0.9
  left: 25px; // 28 * 0.9
  top: 22px; // 24 * 0.9
  overflow: hidden;
  border-radius: 7px; // 8 * 0.9
`;

export const LocationImage = styled.img`
  position: absolute;
  width: 143px; // 159 * 0.9
  height: 158px; // 175 * 0.9
  left: 25px; // 28 * 0.9
  top: 22px; // 24 * 0.9
  object-fit: cover;
  border-radius: 7px; // 8 * 0.9
`;

export const Title = styled.h1`
  position: absolute;
  left: 188px; // 209 * 0.9
  top: 15px; // 17 * 0.9
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 600;
  font-size: 27px; // 30 * 0.9
  line-height: 34px; // 38 * 0.9
  color: #ffffff;
  margin: 0;
`;

export const Subtitle = styled.h2`
  position: absolute;
  left: 188px; // 209 * 0.9
  top: 50px; // 56 * 0.9
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 600;
  font-size: 27px; // 30 * 0.9
  line-height: 34px; // 38 * 0.9
  color: #ffffff;
  margin: 0;
`;

export const Address = styled.p`
  position: absolute;
  left: 188px; // 209 * 0.9
  top: 85px; // 94 * 0.9
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 400;
  font-size: 18px; // 20 * 0.9
  line-height: 27px; // 30 * 0.9
  color: #ffffff;
  margin: 0;
  max-width: 405px; // 450 * 0.9
`;

export const TagContainer = styled.div`
  position: absolute;
  left: 184px; // 204 * 0.9
  bottom: 22px; // 24 * 0.9
  display: flex;
  gap: 7px; // 8 * 0.9
`;

export const Tag = styled.div`
  width: 78px; // 87 * 0.9
  height: 23px; // 26 * 0.9
  background: #bdaee5;
  border-radius: 23px; // 25 * 0.9
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 600;
  font-size: 11px; // 12 * 0.9
  line-height: 14px; // 15 * 0.9
  color: #000000;
`;

export const FavButton = styled.button`
  position: absolute;
  width: 28px; // 31 * 0.9
  height: 25px; // 28 * 0.9
  right: 144px; // 160 * 0.9
  bottom: 22px; // 24 * 0.9
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
  width: 112px; // 124 * 0.9
  height: 38px; // 42 * 0.9
  right: 22px; // 24 * 0.9
  bottom: 22px; // 24 * 0.9
  background: #fff5d5;
  border-radius: 23px; // 25 * 0.9
  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 600;
  font-size: 14px; // 16 * 0.9
  line-height: 27px; // 30 * 0.9
  color: #101148;

  &:hover {
    background: #ffe9b3;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 9px; // 10 * 0.9
  right: 12px; // 13 * 0.9
  padding: 4px;
  width: 25px; // 28 * 0.9
  height: 25px; // 28 * 0.9
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
    min-width: 18px; // 20 * 0.9
    min-height: 18px; // 20 * 0.9
    width: 18px; // 20 * 0.9
    height: 18px; // 20 * 0.9
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
