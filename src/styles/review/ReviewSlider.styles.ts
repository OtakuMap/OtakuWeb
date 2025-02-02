import styled from 'styled-components';

export const OuterWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 0 100px;
`;

export const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const SliderContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const SliderContent = styled.div`
  position: relative;
  width: 100%;
  .slick-slider {
    margin-bottom: 30px;
  }

  .slick-track {
    display: flex;
  }

  .slick-slide {
    padding: 0 10px;
    > div {
      width: 100%;
    }
  }

  .slick-list {
    margin: 0 -10px;
  }

  .slick-dots {
    display: none !important;
  }
`;

export const SlideItem = styled.div`
  width: 100%;
  cursor: pointer;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 190px;
  border-radius: 15px;
  overflow: hidden;
`;

export const Image = styled.div<{ src: string }>`
  position: absolute;
  inset: 0;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
`;

export const Gradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #ffffff 0%, rgba(115, 115, 115, 0) 100%);
`;

export const Rank = styled.span`
  position: absolute;
  left: 20px;
  bottom: 0;
  font-family: 'Gothic A1';
  font-weight: 600;
  font-size: 85px;
  line-height: 106px;
  color: #101148;
`;

export const Title = styled.p`
  margin-top: 22px;
  text-align: center;
  font-family: 'Gothic A1';
  font-weight: 600;
  font-size: 22px;
  color: white;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 95px;
  transform: translateY(-50%);
  z-index: 10;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  outline: none;

  &:focus {
    outline: none;
  }
`;

export const PrevButton = styled(ArrowButton)`
  left: 19px;
`;

export const NextButton = styled(ArrowButton)`
  right: 19px;
`;
