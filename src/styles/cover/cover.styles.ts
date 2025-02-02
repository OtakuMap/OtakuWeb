import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #2a3f92;
  height: 100vh;
  width: 100vw;
`;

export const TextSection = styled.div`
  color: #fff;
  font-family: 'Arial', sans-serif;
  max-width: 40%;
`;

export const Image = styled.img`
  width: 600px;
  height: auto;
  margin-top: 20px;
  margin-left: 400px;
`;

export const FooterSection = styled.div`
  position: absolute; /* 절대 위치 설정 */
  bottom: 0; /* 컨테이너 하단 고정 */
  left: 700px; /* 원하는 위치로 고정 */
  display: flex;
  align-items: center;
`;

export const LaptopImage = styled.img`
  width: 900px;
  height: auto;
`;

export const Subtitle = styled.p`
  margin-bottom: 1.5rem;
  margin-top: 10px;
  margin-left: 500px;
  color: #fff;
  font-family: 'Pixelify Sans';
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 55px; /* 196.429% */
  width: 320px;
`;

export const SpaceIcon = styled.img`
  position: absolute;
  top: 100px; /* 화면 위쪽 여백 */
  right: 50px; /* 화면 오른쪽 여백 */
  height: auto;
`;

export const SparkleIcon = styled.img`
  position: absolute;
  bottom: 206px; /* 화면 아래쪽 여백 */
  left: 300px; /* 화면 왼쪽 여백 */
  height: auto;
`;
