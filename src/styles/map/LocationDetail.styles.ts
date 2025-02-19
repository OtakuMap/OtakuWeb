import styled, { keyframes } from 'styled-components';

const IPHONE_15_BREAKPOINT = '430px';

export const Container = styled.div`
  position: absolute;
  width: 628px;
  height: 202px;
  left: 50%;
  bottom: 36px;
  transform: translateX(-50%);
  background: #252660;
  box-shadow: 0px 9px 7px 3px rgba(0, 0, 0, 0.25);
  border-radius: 23px;
  z-index: 1000;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 100%;
    height: auto;
    min-height: 80vh;
    left: 0;
    right: 0;
    bottom: 0;
    transform: none;
    border-radius: 20px 20px 0 0;
    display: flex;
    flex-direction: column;
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
    margin: 12px auto;
    cursor: grab;
  }
`;

export const ButtonContainer = styled.div`
  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    position: fixed; // 모바일에서는 하단에 고정
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: #252660;
    z-index: 1002;
  }
`;

export const PaginationButton = styled.button`
  position: absolute;
  top: 81px;
  right: 12px;
  width: 25px;
  height: 16px;
  background: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: 0;
  transition: transform 0.2s ease;

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

  @media (max-width: 768px) {
    top: 50%;
    transform: translateY(-50%);
    right: 8px;
  }
`;

export const LocationImage = styled.img`
  position: absolute;
  width: 143px;
  height: 158px;
  left: 25px;
  top: 22px;
  object-fit: cover;
  border-radius: 7px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    position: relative; // 모바일에서만 position 변경
    width: 100%;
    height: 200px;
    left: 0;
    top: 0;
    border-radius: 20px 20px 0 0;
  }
`;

export const ContentWrapper = styled.div`
  position: relative;
  height: 100%;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    display: flex;
    flex-direction: column;
    padding: 16px;
    gap: 12px;
  }
`;

export const ImageSection = styled.div`
  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 100%;
    height: 200px;
    margin-bottom: 16px;
  }
`;

export const InfoSection = styled.div`
  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

const BaseText = styled.div`
  position: relative;
  font-family: 'Gothic A1';
  color: #ffffff;
  margin: 0;
`;

export const Title = styled(BaseText)`
  position: absolute;
  left: 188px;
  top: 15px;
  font-weight: 600;
  font-size: 27px;
  line-height: 34px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 380px;

  &[data-overflow='true'] {
    position: relative;

    &::after {
      content: attr(title);
      position: fixed; // absolute 대신 fixed 사용
      left: 50%;
      transform: translateX(-50%);
      top: auto;
      bottom: 100%;
      margin-bottom: 8px;
      background: rgba(37, 38, 96, 0.95);
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 14px;
      white-space: normal;
      max-width: 300px;
      z-index: 1001;
      opacity: 0;
      visibility: hidden;
      transition:
        opacity 0.2s,
        visibility 0.2s;
      pointer-events: none;
    }

    &:hover::after {
      opacity: 1;
      visibility: visible;
    }
  }

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    position: relative;
    left: 0;
    top: 0;
    font-size: 24px;
    line-height: 30px;
    margin-bottom: 8px;
  }
`;

export const Subtitle = styled(BaseText)`
  position: absolute;
  left: 188px;
  top: 50px;
  font-weight: 600;
  font-size: 27px;
  line-height: 34px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 380px;

  &[data-overflow='true'] {
    position: relative;

    &::after {
      content: attr(title);
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      top: auto;
      bottom: 100%;
      margin-bottom: 8px;
      background: rgba(37, 38, 96, 0.95);
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 14px;
      white-space: normal;
      max-width: 300px;
      z-index: 1001;
      opacity: 0;
      visibility: hidden;
      transition:
        opacity 0.2s,
        visibility 0.2s;
      pointer-events: none;
    }

    &:hover::after {
      opacity: 1;
      visibility: visible;
    }
  }

  @media (max-width: 768px) {
    position: relative;
    left: 16px;
    top: 32px;
    max-width: calc(100% - 32px);
  }
`;

export const Address = styled(BaseText)`
  position: absolute;
  left: 188px;
  top: 85px;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  max-width: 405px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  &[data-overflow='true'] {
    position: relative;

    &::after {
      content: attr(title);
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      top: auto;
      bottom: 100%;
      margin-bottom: 8px;
      background: rgba(37, 38, 96, 0.95);
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 14px;
      white-space: normal;
      max-width: 300px;
      z-index: 1001;
      opacity: 0;
      visibility: hidden;
      transition:
        opacity 0.2s,
        visibility 0.2s;
      pointer-events: none;
    }

    &:hover::after {
      opacity: 1;
      visibility: visible;
    }
  }

  @media (max-width: 768px) {
    position: relative;
    left: 16px;
    top: 40px;
    max-width: calc(100% - 32px);
  }
`;

export const TagContainer = styled.div`
  position: absolute;
  left: 184px;
  bottom: 22px;
  display: flex;
  gap: 7px;
  max-width: 276px;
  overflow: hidden;

  @media (max-width: 768px) {
    position: relative;
    left: 16px;
    bottom: -48px;
    max-width: calc(100% - 180px);
  }
`;

export const Tag = styled.div`
  min-width: 78px;
  max-width: 87px;
  height: 23px;
  padding: 0 12px;
  background: #bdaee5;
  border-radius: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-family: 'Gothic A1';
  font-weight: 600;
  font-size: 11px;
  line-height: 14px;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &[data-overflow='true'] {
    position: relative;

    &::after {
      content: attr(data-full-text);
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      top: auto;
      bottom: 100%;
      margin-bottom: 8px;
      background: rgba(37, 38, 96, 0.95);
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
      white-space: nowrap;
      z-index: 1001;
      opacity: 0;
      visibility: hidden;
      transition:
        opacity 0.2s,
        visibility 0.2s;
      pointer-events: none;
    }

    &:hover::after {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const FavButton = styled.button`
  position: absolute;
  width: 28px;
  height: 25px;
  right: 144px;
  bottom: 22px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: transform 0.2s ease;

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

  @media (max-width: 768px) {
    right: 144px;
  }
`;

export const ReviewButton = styled.button`
  position: absolute;
  width: 112px;
  height: 38px;
  right: 22px;
  bottom: 22px;
  background: #fff5d5;
  border-radius: 23px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 27px;
  color: #101148;
  transition: all 0.2s ease;

  &:hover {
    background: #ffe9b3;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    right: 16px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 9px;
  right: 12px;
  padding: 4px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: transform 0.2s ease;

  svg {
    min-width: 18px;
    min-height: 18px;
    width: 18px;
    height: 18px;
    color: #ffffff;
    stroke: currentColor;
  }

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    top: 8px;
    right: 8px;
  }
`;

//스켈레톤 UI
const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const Skeleton = styled.div`
  background: linear-gradient(90deg, #303172 25%, #3a3c8c 50%, #303172 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

export const SkeletonImage = styled(Skeleton)`
  position: absolute;
  width: 143px;
  height: 158px;
  left: 25px;
  top: 22px;
  border-radius: 7px;

  @media (max-width: 768px) {
    position: relative;
    left: 16px;
    top: 16px;
    width: 120px;
    height: 120px;
  }
`;

export const SkeletonTitle = styled(Skeleton)`
  position: absolute;
  left: 188px;
  top: 15px;
  height: 34px;
  width: 250px;
  border-radius: 4px;

  @media (max-width: 768px) {
    position: relative;
    left: 16px;
    top: 24px;
    width: 200px;
  }
`;

export const SkeletonSubtitle = styled(Skeleton)`
  position: absolute;
  left: 188px;
  top: 50px;
  height: 34px;
  width: 200px;
  border-radius: 4px;

  @media (max-width: 768px) {
    position: relative;
    left: 16px;
    top: 32px;
    width: 180px;
  }
`;

export const SkeletonAddress = styled(Skeleton)`
  position: absolute;
  left: 188px;
  top: 85px;
  height: 54px;
  width: 350px;
  border-radius: 4px;

  @media (max-width: 768px) {
    position: relative;
    left: 16px;
    top: 40px;
    width: calc(100% - 32px);
  }
`;

export const SkeletonTags = styled.div`
  position: absolute;
  left: 184px;
  bottom: 22px;
  display: flex;
  gap: 7px;
`;

export const SkeletonTag = styled(Skeleton)`
  width: 78px;
  height: 23px;
  border-radius: 23px;
`;
