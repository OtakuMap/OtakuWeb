import React, { useState } from 'react';
import styled from 'styled-components';
import StarIcon from '../assets/star.png';
import SpaceIcon from '../assets/space.png';
import PencilIcon from '../assets/pencil.png';

const Container = styled.div`
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

const Icon = styled.img`
  position: absolute;
`;

const TopLeftIcon = styled(Icon)`
  top: 265px;
  left: 88px;
`;

const BottomRightIcon = styled(Icon)`
  bottom: 130px;
  right: 91px;
`;

const ProfileContainer = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #ddd;
  margin-bottom: 10px;
`;

const Nickname = styled.h1`
  font-size: 18px;
  font-weight: bold;
`;

const Email = styled.p`
  font-size: 14px;
  color: #cccccc;
  margin-top: 5px;
`;

const Section = styled.div`
  background-color: rgb(255, 255, 255);
  width: 100%;
  max-width: 500px;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: black;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  color: black;
  margin-bottom: 10px;
  text-align: center;
  padding-bottom: 5px;
  border-bottom: 1px solid rgb(0, 0, 0);
`;

const FormRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const Label = styled.span`
  font-size: 14px;
  color: black;
  font-weight: 600;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InputField = styled.input`
  width: 288px;
  height: 34px;
  padding: 10px;
  border: none;
  border-radius: 20px;
  background-color: #e8e8e8;
  font-size: 14px;
`;

const Text = styled.span`
  font-size: 14px;
  width: 288px;
  padding: 8px;
  text-align: left;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`;

const EditIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const DuplicateCheckButton = styled.button`
  background-color: #d1c1ff;
  color: black;
  border: none;
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
`;

const Button = styled.button`
  width: 173px;
  height: 38px;
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

const ReviewSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  margin: 10px 0;
`;

const ReviewButton = styled.button`
  width: 140px;
  height: 30px;
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

const ReviewTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  margin-right: auto;
`;

const ReviewRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
`;

const ReviewAmount = styled.p`
  font-size: 14px;
  margin: 8px 0;
  text-align: left;
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const ToggleLabel = styled.span`
  font-size: 14px;
  color: black;
`;

const ToggleSwitch = styled.input.attrs({ type: 'checkbox' })`
  width: 40px;
  height: 20px;
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
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    background-color: white;
    border-radius: 50%;
    transition: left 0.2s;
  }

  &:checked:before {
    left: 22px;
  }
`;

const LogoutButton = styled.button`
  width: 215px;
  padding: 10px;
  background-color: #ff3b30;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  margin: 20px 0;

  &:hover {
    background-color: #e03228;
  }
`;

const MyPage = () => {
  const [isEditing, setIsEditing] = useState({
    nickname: false,
    email: false,
    password: false,
  });

  const [formData, setFormData] = useState({
    nickname: 'b1234otaku',
    email: 'conandaisuki@gmail.com',
    password: 'xxxxxxxxxxxxx',
  });

  const [showDuplicateCheck, setShowDuplicateCheck] = useState(false);

  const handleEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === 'nickname') {
      setShowDuplicateCheck(true);
    }
  };

  const checkDuplicate = () => {
    alert('닉네임 중복 확인이 완료되었습니다.');
    setShowDuplicateCheck(false);
  };

  return (
    <Container>
      <TopLeftIcon src={StarIcon} alt="Star Icon" />

      <ProfileContainer>
        <Avatar />
        <Nickname>닉네임</Nickname>
        <Email>conandaisuki@gmail.com</Email>
      </ProfileContainer>

      <Section>
        <SectionTitle>내 정보 수정</SectionTitle>

        <FormRow>
          <Label>닉네임 수정</Label>
          <InputContainer>
            {isEditing.nickname ? (
              <>
                <InputField
                  type="text"
                  value={formData.nickname}
                  onChange={(e) => handleChange('nickname', e.target.value)}
                />
                {showDuplicateCheck && (
                  <DuplicateCheckButton onClick={checkDuplicate}>중복확인</DuplicateCheckButton>
                )}
              </>
            ) : (
              <Text>{formData.nickname}</Text>
            )}
            <EditButton onClick={() => handleEdit('nickname')}>
              <EditIcon src={PencilIcon} alt="edit" />
            </EditButton>
          </InputContainer>
        </FormRow>

        <FormRow>
          <Label>이메일 수정</Label>
          <InputContainer>
            {isEditing.email ? (
              <InputField
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            ) : (
              <Text>{formData.email}</Text>
            )}
            <EditButton onClick={() => handleEdit('email')}>
              <EditIcon src={PencilIcon} alt="edit" />
            </EditButton>
          </InputContainer>
        </FormRow>

        <FormRow>
          <Label>비밀번호 변경</Label>
          <InputContainer>
            {isEditing.password ? (
              <InputField
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
              />
            ) : (
              <Text>{formData.password}</Text>
            )}
            <EditButton onClick={() => handleEdit('password')}>
              <EditIcon src={PencilIcon} alt="edit" />
            </EditButton>
          </InputContainer>
        </FormRow>

        <Button>저장하기</Button>
      </Section>

      <Section>
        <SectionTitle>내 후기 관리</SectionTitle>
        <ReviewSection>
          <ReviewRow>
            <ReviewTitle>후기 관리</ReviewTitle>
            <ReviewButton>내 후기 전체보기</ReviewButton>
          </ReviewRow>
          <ReviewRow>
            <ReviewButton>내 후기 전체 삭제하기</ReviewButton>
          </ReviewRow>
          <ReviewAmount>후기 후원금 내역: 총 000000원</ReviewAmount>
        </ReviewSection>
      </Section>

      <Section>
        <SectionTitle>이벤트 제보하기</SectionTitle>
        <FormRow>
          <Label>이벤트 이름</Label>
          <InputField type="text" placeholder="입력해주세요" />
        </FormRow>
        <FormRow>
          <Label>이벤트 애니명</Label>
          <InputField type="text" placeholder="입력해주세요" />
        </FormRow>
        <FormRow>
          <Label>추가사항</Label>
          <InputField type="text" placeholder="입력해주세요" />
        </FormRow>
        <Button>저장하기</Button>
      </Section>

      <Section>
        <SectionTitle>알림 설정</SectionTitle>
        <ToggleContainer>
          <ToggleLabel>커뮤니티 활동 알림</ToggleLabel>
          <ToggleSwitch />
        </ToggleContainer>
        <ToggleContainer>
          <ToggleLabel>이벤트 및 혜택 정보 알림</ToggleLabel>
          <ToggleSwitch />
        </ToggleContainer>
      </Section>

      <LogoutButton>로그아웃</LogoutButton>
      <BottomRightIcon src={SpaceIcon} alt="Space Icon" />
    </Container>
  );
};

export default MyPage;
