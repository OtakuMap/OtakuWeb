import React from 'react';
import styled from 'styled-components';
import StarIcon from '../assets/star.png';
import SpaceIcon from '../assets/space.png';

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
  position: relative; /* 추가: 아이콘 위치 지정용 */
  margin-top: 250px;
`;

// 공통 Icon 스타일
const Icon = styled.img`
  position: absolute; /* 추가: 아이콘 위치 고정 */
`;

// 상단 왼쪽 아이콘
const TopLeftIcon = styled(Icon)`
  top: 265px;
  left: 88px;
`;

// 하단 오른쪽 아이콘
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
  font-family: 'Gothic A1';
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  color: black;
  margin-bottom: 10px;
  text-align: center;
  padding-bottom: 5px; /* 여백 추가 */
  border-bottom: 1px solid rgb(0, 0, 0);
`;

const InputField = styled.input`
  width: 288px;
  height: 34px;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 20px;
  background-color: #e8e8e8;
  font-size: 14px;
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
  display: block; /* 버튼을 block 요소로 변경 */
  margin: 0 auto; /* 버튼을 수평으로 가운데 정렬 */

  &:hover {
    background-color: #d1c1ff;
  }
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

  &:hover {
    background-color: #e03228;
  }
`;

// New styled components for horizontal layout
const FormRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const InputLabel = styled.label`
  font-size: 14px;
  color: black;
  margin-right: 10px;
  white-space: nowrap;
`;

const MyPage = () => {
  return (
    <Container>
      {/* Top Icon */}
      <TopLeftIcon src={StarIcon} alt="Star Icon" />
      {/* Profile section */}
      <ProfileContainer>
        <Avatar />
        <Nickname>닉네임</Nickname>
        <Email>conandaisuki@gmail.com</Email>
      </ProfileContainer>

      {/* Profile Edit section */}
      <Section>
        <SectionTitle>내 정보 수정</SectionTitle>
        이메일 수정 <InputField type="email" value="conandaisuki@gmail.com" /> <br></br>
        비밀번호 변경 <InputField type="password" value="xxxxxxxxxxxxxx" />
        <Button>저장하기</Button>
      </Section>
      {/* Review Management section */}
      <Section>
        <SectionTitle>내 후기 관리</SectionTitle>
        <p>내 후기 전체보기</p>
        <p>내 후기 전체 삭제하기</p>
        <p>후기 후원금 내역: 총 000000원</p>
      </Section>

      {/* Event Report section */}
      <Section>
        <SectionTitle>이벤트 제보하기</SectionTitle>
        <FormRow>
          <InputLabel>이벤트 이름</InputLabel>
          <InputField type="text" />
        </FormRow>
        <FormRow>
          <InputLabel>이벤트 애니명</InputLabel>
          <InputField type="text" />
        </FormRow>
        <FormRow>
          <InputLabel>추가사항</InputLabel>
          <InputField type="text" />
        </FormRow>
        <Button>저장하기</Button>
      </Section>

      {/* Notification Settings */}
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

      {/* Logout */}
      <LogoutButton>로그아웃</LogoutButton>

      {/* Bottom Icon */}
      <BottomRightIcon src={SpaceIcon} alt="Space Icon" />
    </Container>
  );
};

export default MyPage;
