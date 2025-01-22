import React from 'react';
import styled from 'styled-components';
import otakumap from '../assets/otakumap.png';
import laptopImage from '../assets/labtop.png';
import spaceCover from '../assets/space-cover.png'; // 우주 아이콘
import sparkleIcon from '../assets/sparkle-icon.png'; // 반짝이 아이콘

// 스타일 정의
const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #0c004b;
  height: 100vh;
  width: 100vw;
`;

const TextSection = styled.div`
  color: #fff;
  font-family: 'Arial', sans-serif;
  max-width: 40%;
`;

const Image = styled.img`
  width: 600px;
  height: auto;
  margin-top: 20px;
  margin-left: 400px;
`;

const FooterSection = styled.div`
  position: absolute; /* 절대 위치 설정 */
  bottom: 0; /* 컨테이너 하단 고정 */
  left: 700px; /* 원하는 위치로 고정 */
  display: flex;
  align-items: center;
`;

const LaptopImage = styled.img`
  width: 900px;
  height: auto;
`;

const Subtitle = styled.p`
  margin-bottom: 1.5rem;
  margin-top: 10px;
  margin-left: 500px;
  color: #fff;
  font-family: 'Pixelify Sans';
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 55px; /* 196.429% */
  width: 330px;
`;

// 아이콘 스타일 정의
const SpaceIcon = styled.img`
  position: absolute;
  top: 100px; /* 화면 위쪽 여백 */
  right: 50px; /* 화면 오른쪽 여백 */
  height: auto;
`;

const SparkleIcon = styled.img`
  position: absolute;
  bottom: 206px; /* 화면 아래쪽 여백 */
  left: 300px; /* 화면 왼쪽 여백 */
  height: auto;
`;

const Cover: React.FC = () => {
  return (
    <Container>
      <TextSection>
        <Image src={otakumap} alt="otakumap" />
        <Subtitle>애니메이션 팬들을 위한 맞춤형 여행플래너 서비스</Subtitle>
      </TextSection>
      <FooterSection>
        <LaptopImage src={laptopImage} alt="Otaku Map Laptop" />
      </FooterSection>
      {/* 우주 아이콘 */}
      <SpaceIcon src={spaceCover} alt="Space Icon" />
      {/* 반짝이 아이콘 */}
      <SparkleIcon src={sparkleIcon} alt="Sparkle Icon" />
    </Container>
  );
};

export default Cover;