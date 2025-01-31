import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #0c004b;
  min-height: 100vh;
  padding: 20px;
  color: #fff;
  width: 100vw;
  overflow-y: auto;
  position: relative;
`;

export const Icon = styled.img`
  position: absolute;
`;

export const TopLeftIcon = styled(Icon)`
  top: 165px;
  left: 114px;
`;

export const BottomRightIcon = styled(Icon)`
  bottom: 124px;
  right: 93px;
`;

export const ProfileContainer = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

export const Avatar = styled.div<{ imageUrl?: string }>`
  width: 116px;
  height: 116px;
  border-radius: 50%;
  background-color: #ddd;
  margin-bottom: 25px;
  background-image: ${(props) => (props.imageUrl ? `url(${props.imageUrl})` : 'none')};
  background-size: cover;
  background-position: center;
`;

export const Nickname = styled.h1`
  font-size: 33px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Email = styled.p`
  font-size: 18px;
  color: #cccccc;
  margin-top: 18px;
`;

export const Section = styled.div`
  background-color: rgb(255, 255, 255);
  width: 850px;
  border-radius: 16px;
  padding: 34px;
  margin-bottom: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: black;
`;

export const SectionTitle = styled.h2`
  font-size: 23px;
  color: black;
  margin-bottom: 34px;
  text-align: left;
  padding-bottom: 16px;
  border-bottom: 1px solid rgb(0, 0, 0);
`;

export const FormRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 34px;
  position: relative;
`;

export const Label = styled.span`
  font-size: 16px;
  color: black;
  font-weight: 600;
  width: 193px;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
`;

export const InputField = styled.input`
  width: 180px;
  height: 34px;
  padding: 10px;
  border: none;
  border-radius: 20px;
  background-color: #e8e8e8;
  font-size: 14px;
`;

export const Text = styled.span`
  font-size: 14px;
  width: 123px;
  padding: 8px;
  text-align: left;
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  position: absolute;
  right: 156px;
`;

export const EditIcon = styled.img``;

export const DuplicateCheckButton = styled.button`
  background-color: #d1c1ff;
  color: black;
  border: none;
  border-radius: 20px;
  width: 72px;
  height: 32px;
  font-size: 10px;
  cursor: pointer;
  position: absolute;
  right: 228px;
`;

export const Button = styled.button`
  width: 184px;
  height: 35px;
  padding: 10px;
  background-color: #d1c1ff;
  color: black;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  display: block;
  margin: 20px auto 0;
`;

export const ReviewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

export const ReviewButton = styled.button`
  width: 127px;
  height: 32px;
  background-color: #e8e8e8;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  margin-left: auto;

  &:hover {
    background-color: #d1d1d1;
  }
`;

export const ReviewTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  margin-right: auto;
`;

export const ReviewRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
`;

export const ReviewAmount = styled.p`
  font-size: 14px;
  margin: 74px 0;
  text-align: left;
`;

export const ToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

export const ToggleLabel = styled.span`
  font-size: 14px;
  color: black;
  width: 262px;
`;

export const ToggleSwitch = styled.input.attrs({ type: 'checkbox' })`
  width: 77px;
  height: 32px;
  appearance: none;
  background-color: #bbb;
  border-radius: 20px;
  position: relative;
  outline: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:checked {
    background-color: #ffc50c;
  }

  &:before {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 26px;
    height: 26px;
    background-color: white;
    border-radius: 50%;
    transition: left 0.2s;
  }

  &:checked:before {
    left: 48px;
  }
`;

export const LogoutButton = styled.button`
  width: 225px;
  height: 58px;
  background-color: #ff3b30;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  margin: 93px 0;

  &:hover {
    background-color: #e03228;
  }
`;

// mypage.style.ts에 추가
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

export const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
`;

export const ModalText = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
  color: black;
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const ModalButton = styled.button`
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: black;

  &:hover {
  }
`;
