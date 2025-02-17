import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import type { Settings } from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as S from '../../styles/review/ReviewSlider.styles';

interface Review {
  id?: string;
  title?: string;
  reviewImage?: {
    fileUrl: string;
  };
}

interface ReviewSliderProps {
  reviews?: Review[];
  onReviewClick: (reviewId: string) => void; // 타입 변경
}

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
    <S.OuterWrapper>
      {showLeftArrow && (
        <S.PrevButton onClick={() => sliderRef.current?.slickPrev()} aria-label="Previous slide">
          <ChevronLeft size={64} color="white" strokeWidth={1} />
        </S.PrevButton>
      )}

      <S.SliderWrapper>
        <S.SliderContainer>
          <S.SliderContent>
            <Slider ref={sliderRef} {...settings}>
              {reviews.map((review, index) => (
                <S.SlideItem
                  key={review?.id || index}
                  onClick={() => review?.id && onReviewClick(review.id)} // 이 부분이 변경됨
                >
                  <S.ImageContainer>
                    <S.Image
                      src={review?.reviewImage?.fileUrl || 'https://picsum.photos/200/300'}
                    />
                    <S.Gradient />
                    <S.Rank>{index + 1}</S.Rank>
                  </S.ImageContainer>
                  <S.Title>{review?.title || '제목 없음'}</S.Title>
                </S.SlideItem>
              ))}
            </Slider>
          </S.SliderContent>
        </S.SliderContainer>
      </S.SliderWrapper>

      {showRightArrow && (
        <S.NextButton onClick={() => sliderRef.current?.slickNext()} aria-label="Next slide">
          <ChevronRight size={64} color="white" strokeWidth={1} />
        </S.NextButton>
      )}
    </S.OuterWrapper>
  );
};

export default ReviewSlider;
