import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 30px 40px;
  border-radius: 20px;
  width: 606px;
  height: 152px;
  display: flex;
  flex-direction: column;
`;

export const ModalTitle = styled.div`
  color: black;
  font-size: 24px;
  padding-bottom: 15px;
  border-bottom: 1px solid #000;
  text-align: center;
  font-family: 'Gothic A1';
  font-weight: 600;
  word-wrap: break-word;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 150px;
  margin-top: 15px;
`;

export const ModalButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: black;
  padding: 10px;
  font-family: 'Gothic A1';
  font-weight: 600;
  word-wrap: break-word;

  &:focus {
    outline: none;
  }
`;
