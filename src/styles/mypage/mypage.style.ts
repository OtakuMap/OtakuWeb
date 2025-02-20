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

export const BackButton = styled.button`
  position: absolute;
  top: 80px;
  left: 20px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
`;

export const BackIcon = styled.img``;
export const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-color: #d1c1ff;
  width: 100%;
  margin-top: 51px;
`;

export const Mypage = styled.h1`
  color: white;
  font-size: 25px;
  font-weight: bold;
  margin-top: 100px;
  text-align: center;
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
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;

export const Avatar = styled.div<{ $imageUrl?: string }>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-image: ${({ $imageUrl }) => ($imageUrl ? `url(${$imageUrl})` : 'none')};
  background-size: cover;
  background-position: center;
  background-color: ${({ $imageUrl }) => ($imageUrl ? 'transparent' : '#f0f0f0')};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export const Nickname = styled.h1`
  margin-top: 20px;
  margin-bottom: 10px;
  font-family: Gothic A1;
  font-size: 20px;
  font-weight: 600;
  line-height: 25px;
  text-align: center;
`;

export const Email = styled.p`
  color: #ffffff;
  margin-top: 18px;
  font-family: Gothic A1;
  font-size: 20px;
  font-weight: 600;
  line-height: 25px;
  text-align: center;
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
  text-align: center;
  padding-bottom: 16px;
  border-bottom: 1px solid rgb(0, 0, 0);
`;

export const FormRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 34px;
  position: relative;
  gap: 20px;
`;

export const Label = styled.span`
  color: black;
  font-weight: 600;
  width: 193px;
  text-align: left;
  font-family: Gothic A1;
  font-size: 20px;
  font-weight: 600;
  line-height: 25px;
`;

export const EventLabel = styled.span`
  color: black;
  font-weight: 600;
  width: 230px;
  margin-left: 125x;
  font-family: Gothic A1;
  font-size: 20px;
  font-weight: 600;
  line-height: 25px;
  text-align: center;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 250px; // 너비를 늘려 간격 확보
`;

export const InputField = styled.input`
  width: 100%;
  height: 34px;
  padding: 10px;
  border: none;
  border-radius: 20px;
  background-color: rgb(255, 255, 255);
  font-size: 14px;
`;

export const EventInputField = styled.input`
  width: 288px;
  height: 34px;
  padding: 10px;
  border: none;
  border-radius: 20px;
  background-color: #e8e8e8;
  font-size: 14px;
  margin-left: -40px;
`;
export const Text = styled.span`
  width: 100%;
  padding: 8px;
  text-align: left;
  padding-right: 30px; // 연필 아이콘을 위한 오른쪽 여백 추가
  background-color: rgb(255, 255, 255);
  border-radius: 20px;
  height: 34px;
  display: flex;
  align-items: center;
  font-family: Gothic A1;
  font-size: 20px;
  font-weight: 600;
  line-height: 25px;
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  position: absolute;
  right: 10px; // 오른쪽 여백 조정
  top: 50%;
  transform: translateY(-50%);
`;

// 이메일 수정 부분의 EditButton 스타일만 따로 정의
export const EmailEditButton = styled(EditButton)`
  left: 300px; // 오른쪽 위치 조정
  right: 20px;
`;

export const EditIcon = styled.img`
  width: 16px;
  height: 16px;
`;

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
  right: -104px;
  top: 50%;
  transform: translateY(-50%);
`;

export const Button = styled.button`
  width: 173px;
  height: 38px;
  padding: 10px;
  background-color: #d1c1ff;
  color: black;
  border: none;
  border-radius: 20px;
  font-family: Gothic A1;
  font-size: 18px;
  font-weight: 500;
  line-height: 22.5px;
  text-align: center;
  cursor: pointer;
  display: block;
  margin: 20px auto 0;
`;

export const ReviewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  height: 200px;
`;

export const ReviewButton = styled.button`
  width: 235px; // 버튼 너비 증가
  height: 35px;
  background-color: rgb(255, 255, 255);
  border: 1px solid #999797;
  border-radius: 20px;
  cursor: pointer;
  color: #333;
  transition: all 0.2s;
  margin-left: 473px;
  font-family: Gothic A1;
  font-size: 20px;
  font-weight: 600;
  line-height: 25px;
  padding: 0 20px; // 좌우 여백 추가

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const ReviewTitle = styled.span`
  font-size: 20px;
  font-weight: 600;
  width: 100%; // 너비를 100%로 설정
  margin-left: 195px;
`;

export const ReviewRow = styled.div`
  display: flex;
  flex-direction: column; // Change to column layout
  gap: 10px; // Adjust gap between buttons
  width: 100%;
  margin-bottom: 8px;
  margin-top: -55px;
`;

export const AmountTitle = styled.span`
  font-size: 20px;
  font-weight: 600;
  width: 100%; // 너비를 100%로 설정
  margin-top: 30px;
  margin-left: 175px;
`;

export const ReviewAmount = styled.p`
  width: 100%;
  margin-top: -48px;
  margin-left: 498px;
  font-family: Gothic A1;
  font-size: 20px;
  font-weight: 600;
  line-height: 25px;
`;

export const ToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  margin-left: 147px;
`;
export const ToggleLabel = styled.span`
  color: black;
  width: 262px;
  font-family: Gothic A1;
  font-size: 20px;
  font-weight: 600;
  line-height: 25px;
  text-align: center;
`;

export const ToggleSwitch = styled.input.attrs({ type: 'checkbox' })`
  width: 77px;
  height: 32px;
  margin-right: 180px;
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
  border-radius: 20px;
  font-family: Gothic A1;
  font-size: 25px;
  font-weight: 600;
  line-height: 31.25px;
  text-align: center;
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
  width: 422px;
  text-align: center;
`;

export const ModalText = styled.p`
  margin-bottom: 20px;
  color: black;
  padding-bottom: 20px;
  border-bottom: 1px solid rgb(0, 0, 0);
  font-family: Gothic A1;
  font-size: 24px;
  font-weight: 600;
  line-height: 40px;
  text-align: center;
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 100px;
`;

export const ModalButton = styled.button`
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: black;
  background-color: rgba(255, 255, 255, 0.5);
  font-family: Gothic A1;
  font-size: 24px;
  font-weight: 600;
  line-height: 40px;
  text-align: center;

  &:hover {
  }
`;
