import styled from 'styled-components';

interface ImageWrapperProps {
  src: string;
}

const IPHONE_15_BREAKPOINT = '430px';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #0c004b;
  min-height: 100vh;
  color: #fff;
  width: 100%;
  overflow-x: hidden;
  position: relative;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #0c004b;
  color: #333;
  width: 100%;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-top: 1rem;

    @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
      font-size: 1.8rem;
    }
  }

  h2 {
    font-size: 1.5rem;
    font-weight: normal;
    margin-top: 0.5rem;

    @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
      font-size: 1.2rem;
    }
  }

  img {
    width: 100%;
    height: 500px;
    // height: auto;
    object-fit: cover;
    object-position: center;

    @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
      height: 200px;
    }
  }
`;

export const EventSection = styled.section`
  margin-bottom: 2rem;
  width: 100%;
  padding: 0 20px;

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    padding: 0 10px;
  }
`;

export const EventContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  padding: 0 95px;

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 10px;
    grid-gap: 0.5rem;
  }
`;

export const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const EventPoster = styled.img`
  width: 199px;
  height: 208px;
  margin-bottom: 0.5rem;
  object-fit: cover;

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 150px;
    height: 160px;
  }
`;

export const EventDetails = styled.div`
  text-align: center;
`;

export const EventName = styled.h4`
  margin-bottom: 0.2rem;
  color: #fff;
  font-family: 'Gothic A1';
  font-size: 18px;
  font-weight: 600;

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    font-size: 14px;
  }
`;

export const EventDates = styled.p`
  color: #fff;
  text-align: center;
  font-family: 'Gothic A1';
  font-size: 16px;
  font-weight: 600;

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    font-size: 12px;
  }
`;

export const DetailsSection = styled.section`
  margin-bottom: 2rem;

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    margin-bottom: 1rem;
  }
`;

export const DetailsItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  span {
    font-size: 0.9rem;
    text-align: center;
  }

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    gap: 0.3rem;

    span {
      font-size: 0.8rem;
    }

    img {
      width: 40px;
      height: auto;
    }
  }
`;

export const DetailsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  position: relative;

  & > div:not(:last-child)::after {
    content: '';
    position: absolute;
    right: -1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 85px;
    background-color: #b8effd;
  }

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    gap: 1rem;

    & > div:not(:last-child)::after {
      right: -0.5rem;
      width: 2px;
      height: 60px;
    }
  }
`;

export const TopReviews = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    padding: 0 10px;
  }
`;

export const ReviewSlider = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 0px;

  .slick-slider {
    margin-bottom: 30px;
  }

  .slick-slide {
    padding-left: 57px;
  }

  .slick-dots {
    bottom: -30px;

    li {
      margin: 0 5px;

      button:before {
        color: #fff;
        opacity: 0.5;
        font-size: 10px;
      }

      &.slick-active button:before {
        color: #fff;
        opacity: 1;
      }
    }
  }

  .slick-prev,
  .slick-next {
    display: none !important;
  }

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    .slick-slide {
      padding-left: 20px;
    }
  }
`;

export const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  width: 100%;

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;

export const ReviewCard = styled.div`
  width: 288px;
  height: 268px;
  flex: none;
  position: relative;
  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 150px;
    height: 180px;
  }
`;

export const Rank = styled.div`
  position: absolute;
  left: 20px;
  bottom: -5px;
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 600;
  font-size: 85px;
  line-height: 106px;
  color: #101148;
  z-index: 2;

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    font-size: 50px;
    line-height: 60px;
    left: 10px;
    bottom: -3px;
  }
`;

export const Description = styled.p`
  width: 100%;
  margin-top: 22px;
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 28px;
  text-align: center;
  color: #ffffff;
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    margin-top: 12px;
    font-size: 16px;
    line-height: 20px;
  }
`;

export const ImageWrapper = styled.div<ImageWrapperProps>`
  position: relative;
  width: 100%;
  height: 190px;
  border-radius: 15px;
  overflow: hidden;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #ffffff 0%, rgba(115, 115, 115, 0) 100%);
    border-radius: 15px;
  }

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    height: 120px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 30px;
  margin-top: 20px;
  margin-bottom: 53px;
  margin-left: 70px;
  text-align: left;
  display: flex;
  align-items: center;
  line-height: 1.5;
  color: #fff;
  font-family: 'Gothic A1';
  font-weight: 800;
  width: 100%;

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    font-size: 20px;
    margin-left: 20px;
    margin-bottom: 30px;
  }
`;

export const Image = styled.img`
  width: 25px;
  height: auto;
  margin-right: 15px;
  vertical-align: middle;
  display: inline-block;
  align-self: center;

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 20px;
    margin-right: 10px;
  }
`;

export const Footer = styled.footer`
  position: relative;
  width: 100%;
  padding: 16px 115px;
  color: #ffffff;
  text-align: left;
  font-family: 'Gothic A1';

  p:first-child {
    font-size: 22px;
    font-weight: 600;
    line-height: 28px;
    margin-bottom: 10px;
  }

  p:not(:first-child) {
    font-size: 15px;
    font-weight: 300;
    line-height: 19px;
    margin: 5px 0;
  }

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    padding: 16px 20px;

    p:first-child {
      font-size: 18px;
      line-height: 24px;
    }

    p:not(:first-child) {
      font-size: 13px;
      line-height: 17px;
    }
  }
`;

export const Divider = styled.div`
  width: 90%;
  height: 1px;
  background-color: #464654;
  margin-top: 40px;

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 95%;
    margin-top: 20px;
  }
`;

export const HeartButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  z-index: 1;

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    top: 5px;
    right: 5px;
    padding: 3px;
  }
`;

export const HeartImage = styled.img`
  width: 24px;
  height: 24px;

  @media screen and (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 20px;
    height: 20px;
  }
`;
