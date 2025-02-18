import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LocationSelectMap from './LocationSelectMap';

interface MapSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (location: { lat: number; lng: number }) => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; // z-index 증가
  font-family: 'Gothic A1', sans-serif;
`;

const ModalContainer = styled.div`
  //   background: #101148;
  background: #ffffff;
  border-radius: 16px;
  width: 90%;
  max-width: 800px;
  height: 80vh;
  max-height: 800px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: black;
  margin: 0;
  font-family: 'Gothic A1', sans-serif;
`;

const CloseButton = styled.button`
  position: absolute;
  right: -27px;
  top: -10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: none;
  border: none;
  outline: none; // 클릭 시 border 제거
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: black;
  transition: all 0.2s;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: none;
  }
`;

const MapWrapper = styled.div`
  flex: 1;
  min-height: 0;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const InfoText = styled.p`
  text-align: center;
  color: black;
  margin: 0;
  font-size: 0.9rem;
  font-family: 'Gothic A1', sans-serif;
  opacity: 0.8;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 16px;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 12px 24px;
  border-radius: 25px;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Gothic A1', sans-serif;

  ${(props) =>
    props.primary
      ? `
    background: #424D96;
    color: white;
    
    &:hover {
      opacity: 0.9;
    }

    &:focus {
      outline: none;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `
      : `
    background: rgba(255, 255, 255, 0.1);
    color: white;
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  `}
`;

const MapSelectionModal: React.FC<MapSelectionModalProps> = ({
  isOpen,
  onClose,
  onLocationSelect,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
    placeName?: string;
    address?: string;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // 모달이 열릴 때 body 스크롤 막기
    }
    return () => {
      document.body.style.overflow = 'unset'; // 모달이 닫힐 때 body 스크롤 다시 허용
    };
  }, [isOpen]);

  const handleLocationSelect = (location: {
    latitude: number;
    longitude: number;
    placeName?: string;
    address?: string;
  }) => {
    setSelectedLocation(location);
  };

  const handleConfirm = () => {
    if (selectedLocation) {
      onLocationSelect({
        lat: selectedLocation.latitude,
        lng: selectedLocation.longitude,
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>위치 선택</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <InfoText>
          {selectedLocation
            ? `선택된 위치: ${selectedLocation.placeName || selectedLocation.address}`
            : '지도에서 위치를 선택해주세요'}
        </InfoText>
        <MapWrapper>
          <LocationSelectMap
            apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            onLocationSelect={handleLocationSelect}
          />
        </MapWrapper>
        <ButtonContainer>
          <Button primary onClick={handleConfirm} disabled={!selectedLocation}>
            선택 완료
          </Button>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default MapSelectionModal;
