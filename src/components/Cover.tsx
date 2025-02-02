import React from 'react';
import * as S from '../styles/cover/cover.styles';
import otakumap from '../assets/otakumap.png';
import laptopImage from '../assets/labtop.png';
import spaceCover from '../assets/space-cover.png';
import sparkleIcon from '../assets/sparkle-icon.png';

const Cover: React.FC = () => {
  return (
    <S.Container>
      <S.TextSection>
        <S.Image src={otakumap} alt="otakumap" />
        <S.Subtitle>애니메이션 팬들을 위한 맞춤형 여행플래너 서비스</S.Subtitle>
      </S.TextSection>
      <S.FooterSection>
        <S.LaptopImage src={laptopImage} alt="Otaku Map Laptop" />
      </S.FooterSection>
      {/* 우주 아이콘 */}
      <S.SpaceIcon src={spaceCover} alt="Space Icon" />
      {/* 반짝이 아이콘 */}
      <S.SparkleIcon src={sparkleIcon} alt="Sparkle Icon" />
    </S.Container>
  );
};

export default Cover;
