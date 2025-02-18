// MapSelectionModal.styles.ts
import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: white;
  border-radius: 8px;
  width: 80%;
  max-width: 800px;
  height: 80vh;
  max-height: 800px;
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-shrink: 0;
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const ModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 4px 8px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-grow: 1;
  overflow: hidden;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: #0066ff;
  }
`;

export const MapContainer = styled.div`
  width: 100%;
  flex-grow: 1;
  min-height: 0;
  border-radius: 4px;
  overflow: hidden;
`;
