import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import type { Settings } from 'react-slick';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Review {
  id?: string;
  title?: string;
  reviewImage?: {
    fileUrl: string;
  };
}

interface ReviewSliderProps {
  reviews?: Review[];
  onReviewClick: () => void;
}

const OuterWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 0 100px;
`;

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SliderContent = styled.div`
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

const SlideItem = styled.div`
  width: 100%;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 190px;
  border-radius: 15px;
  overflow: hidden;
`;

const Image = styled.div<{ src: string }>`
  position: absolute;
  inset: 0;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
`;

const Gradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #ffffff 0%, rgba(115, 115, 115, 0) 100%);
`;

const Rank = styled.span`
  position: absolute;
  left: 20px;
  bottom: 0;
  font-family: 'Gothic A1';
  font-weight: 600;
  font-size: 85px;
  line-height: 106px;
  color: #101148;
`;

const Title = styled.p`
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

const PrevButton = styled(ArrowButton)`
  left: 19px;
`;

const NextButton = styled(ArrowButton)`
  right: 19px;
`;

const ReviewSlider: React.FC<ReviewSliderProps> = ({ reviews = [], onReviewClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider | null>(null);

  const settings: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (_, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const showLeftArrow = currentSlide > 0;
  const showRightArrow = currentSlide < reviews.length - 4;

  return (
    <OuterWrapper>
      {showLeftArrow && (
        <PrevButton onClick={() => sliderRef.current?.slickPrev()} aria-label="Previous slide">
          <ChevronLeft size={64} color="white" strokeWidth={1} />
        </PrevButton>
      )}

      <SliderWrapper>
        <SliderContainer>
          <SliderContent>
            <Slider ref={sliderRef} {...settings}>
              {reviews.map((review, index) => (
                <SlideItem key={review?.id || index} onClick={onReviewClick}>
                  <ImageContainer>
                    <Image src={review?.reviewImage?.fileUrl || 'https://picsum.photos/200/300'} />
                    <Gradient />
                    <Rank>{index + 1}</Rank>
                  </ImageContainer>
                  <Title>{review?.title || '제목 없음'}</Title>
                </SlideItem>
              ))}
            </Slider>
          </SliderContent>
        </SliderContainer>
      </SliderWrapper>

      {showRightArrow && (
        <NextButton onClick={() => sliderRef.current?.slickNext()} aria-label="Next slide">
          <ChevronRight size={64} color="white" strokeWidth={1} />
        </NextButton>
      )}
    </OuterWrapper>
  );
};

export default ReviewSlider;
