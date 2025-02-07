import styled from 'styled-components';

interface ImageWrapperProps {
  src: string;
}

export const Container = styled.div`
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

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #0c004b;
  color: #333;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-top: 1rem;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: normal;
    margin-top: 0.5rem;
  }

  img {
    width: 1280px;
  }
`;

export const EventSection = styled.section`
  margin-bottom: 2rem;
`;

export const EventContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
`;

export const EventCardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const EventPosterContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const HeartButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

export const HeartImage = styled.img`
  width: 24px;
  height: 24px;
  transition: transform 0.2s;
`;

export const EventPoster = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 0.5rem;
`;

export const EventDetails = styled.div`
  text-align: center;
`;

export const EventName = styled.h4`
  font-weight: bold;
  margin-bottom: 0.2rem;
  color: #fff;
  font-family: 'Gothic A1';
  font-size: 18px;
  font-weight: 600;
`;

export const EventDates = styled.p`
  color: #fff;
  text-align: center;
  font-family: 'Gothic A1';
  font-size: 16px;
  font-weight: 600;
`;

export const DetailsSection = styled.section`
  margin-bottom: 2rem;
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
`;

export const TopReviews = styled.div`
  width: 1200px;
  margin-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
`;

export const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
`;

export const ReviewCard = styled.div`
  background-color: #0c004b;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
`;

export const Rank = styled.div`
  position: absolute;
  left: 10px;
  bottom: 10px;
  font-weight: bold;
  color: black;
  z-index: 10;
  font-family: 'Gothic A1';
  font-size: 85px;
  font-weight: 600;
`;

export const Description = styled.p`
  word-wrap: break-word;
  overflow-wrap: break-word;
  margin-top: 10px;
  color: #fff;
  text-align: center;
  font-family: 'Gothic A1';
  font-size: 22px;
  font-weight: 600;
`;

export const ImageWrapper = styled.div<ImageWrapperProps>`
  position: relative;
  display: inline-block;
  width: 100%;
  height: 200px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.7));
    border-radius: 8px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  text-align: left;
  margin-left: 20px;
  display: flex;
  align-items: center;
  line-height: 1.5;
  color: #fff;
  font-family: 'Gothic A1';
  font-size: 30px;
  font-weight: 800;
`;

export const Image = styled.img`
  width: 25px;
  height: auto;
  margin-right: 15px;
  vertical-align: middle;
  display: inline-block;
  align-self: center;
`;

export const Footer = styled.footer`
  color: #666;
  margin-top: 2rem;
  color: #fff;
  text-align: center;
  font-family: 'Gothic A1';
  font-size: 15px;
  font-weight: 300;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #464654;
  margin: 40px 0;
`;
