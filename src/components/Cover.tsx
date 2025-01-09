import React from 'react';
import styled from 'styled-components';
import conanImage from '../assets/otakumap.png';
import laptopImage from '../assets/labtop.png';

// 스타일 정의
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
  width: 500px;
  height: auto;
  margin-top: 20px;
`;

const FooterSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LaptopImage = styled.img`
  width: 800px;
  height: auto;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
`;


const Cover: React.FC = () => {
  return (
    <Container>
      <TextSection>
        <Image src={conanImage} alt="Conan Image" />
        <Subtitle>애니메이션 팬들을 위한 맞춤형 여행플래너 서비스</Subtitle>
      </TextSection>
      <FooterSection>
        <LaptopImage src={laptopImage} alt="Otaku Map Laptop" />
      </FooterSection>
      
    </Container>

  );
};

export default Cover;
