import styled from 'styled-components';

const IPHONE_15_BREAKPOINT = '430px';

interface EventHeaderProps {
  imageUrl: string;
}

export const Container = styled.div`
  background-color: #0c004b;
  color: white;
  font-family: 'Arial', sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 60px;
  overflow-x: hidden;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    margin-top: 30px;
  }
`;
export const ErrorMessage = styled.div`
  color: #ff0000;
  font-size: 14px;
  margin-top: 8px;
  text-align: center;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    font-size: 12px;
    margin-top: 6px;
  }
`;
export const Content = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    padding: 0 10px;
  }
`;

export const EventHeader = styled.div<EventHeaderProps>`
  position: relative;
  width: 100vw;
  height: 545px;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  margin-bottom: 30px;
  padding: 40px;
  overflow: hidden;
  background-image: linear-gradient(to bottom, #0c004b, transparent),
    url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    height: auto;
    padding: 20px;
    margin-bottom: 15px;
  }
`;

export const EventHeaderInner = styled.div`
  position: relative;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  gap: 40px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    flex-direction: column;
    gap: 20px;
    padding: 0 10px;
  }
`;

export const EventImage = styled.img`
  width: 336px;
  height: 476px;
  object-fit: cover;
  margin-top: auto;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 100%;
    height: 300px;
    margin-top: 0;
  }
`;

export const EventInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 40px;
  margin-left: 10px;
  position: relative;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    padding-bottom: 20px;
    margin-left: 0;
  }
`;

// Navigation styles
export const TabWrapper = styled.div`
  width: 100vw;
  position: relative;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  border-bottom: 1px solid #ffffff;
  background-color: #0c004b;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
`;

export const TabInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  gap: 120px;
  position: relative;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    gap: 40px;
    padding: 0 10px;
    min-width: min-content;
  }
`;

export const Tab = styled.button<{ isActive: boolean }>`
  color: #ffffff;
  background: none;
  border: none;
  padding: 0 0 10px 0;
  margin-bottom: 8px;
  cursor: pointer;
  position: relative;

  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;

  &:focus {
    outline: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -13px;
    left: 50%;
    transform: translateX(-50%);
    width: ${(props) => (props.isActive ? '130px' : '0')};
    height: ${(props) => (props.isActive ? '8px' : '2px')};
    background-color: ${(props) => (props.isActive ? '#B8EFFD' : 'transparent')};
    border: ${(props) => (props.isActive ? '1px solid #FFFFFF' : 'none')};
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
    z-index: 2;
  }

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    font-size: 18px;
    line-height: 24px;
    padding: 0 0 8px 0;
    margin-bottom: 6px;

    &::after {
      width: ${(props) => (props.isActive ? '100px' : '0')};
      height: ${(props) => (props.isActive ? '6px' : '2px')};
      bottom: -10px;
    }
  }
`;

// Review section styles
export const ReviewCount = styled.div`
  color: white;
  font-size: 20px;
  margin: 20px 0;
  display: flex;
  align-items: left;
  margin-left: 50px;
  gap: 10px;
  flex-direction: column;
  font-weight: '600';

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    font-size: 16px;
    margin-left: 15px;
    gap: 5px;
  }

  span {
    color: #ffd700;
    font-size: 18px;

    @media (max-width: ${IPHONE_15_BREAKPOINT}) {
      font-size: 14px;
    }
  }
`;

export const ReviewSection = styled.div`
  margin-top: 20px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    margin-top: 10px;
  }
`;

export const ReviewInput = styled.div`
  background: #0c004b;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    padding: 15px;
    margin-bottom: 20px;
  }
`;

export const InputHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    gap: 3px;
    margin-bottom: 10px;
  }
`;

export const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-left: 20px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 40px;
    height: 40px;
    margin-left: 10px;
  }
`;

export const Profileimg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 40px;
    height: 40px;
  }
`;

export const UserName = styled.div`
  font-weight: bold;
  color: black;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    font-size: 14px;
  }
`;

export const ProfileName = styled.div`
  font-weight: bold;
  color: white;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    font-size: 14px;
  }
`;

export const Rating = styled.div`
  color: #ffd700;
  font-size: 18px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    font-size: 14px;
  }
`;

export const InputSection = styled.div`
  position: relative;
  display: flex;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 100%;
  }
`;

export const TextArea = styled.textarea<{ isNotLoggedIn?: boolean }>`
  width: 857px;
  height: 230px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  padding-right: 100px;
  font-size: 16px;
  resize: none;

  &::placeholder {
    color: #999;
  }

  background-color: ${({ isNotLoggedIn }) => (isNotLoggedIn ? '#f5f5f5' : 'white')};
  cursor: ${({ isNotLoggedIn }) => (isNotLoggedIn ? 'pointer' : 'text')};
  color: ${({ isNotLoggedIn }) => (isNotLoggedIn ? '#666' : '#000')};

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 100%;
    height: 150px;
    font-size: 14px;
    padding-right: 15px;
  }
`;

export const ReviewButton = styled.button<{ isNotLoggedIn?: boolean }>`
  position: absolute;
  right: 20px;
  bottom: 20px;
  background: white;
  color: black;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: ${({ isNotLoggedIn }) => (isNotLoggedIn ? 'pointer' : 'pointer')};
  z-index: 2;
  opacity: ${({ isNotLoggedIn }) => (isNotLoggedIn ? '0.5' : '1')};

  &:focus {
    outline: none;
    border: none;
  }

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    right: 10px;
    bottom: 10px;
    padding: 6px 12px;
    font-size: 14px;
  }
`;

export const ReviewList = styled.div`
  background: #0c004b;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    padding: 10px;
    gap: 10px;
  }
`;

export const ReviewCard = styled.div<{ $isMyReview: boolean }>`
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  background: ${(props) => (props.$isMyReview ? '#FFF5D5' : 'white')};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 950px;
  height: 152px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 100%;
    height: auto;
    min-height: 120px;
    padding: 12px;
  }
`;

export const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  width: 100%;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    gap: 5px;
    margin-bottom: 10px;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-left: 20px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    margin-left: 10px;
  }
`;

export const ReviewContent = styled.p`
  font-size: 18px;
  line-height: 1.5;
  color: black;
  white-space: pre-line;
  font-weight: '500';
  margin-left: 30px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    font-size: 14px;
    margin-left: 15px;
    margin-bottom: 40px;
  }
`;

export const FeedbackButtons = styled.div`
  display: flex;
  gap: 10px;
  align-self: flex-end;
  margin-top: auto;
  position: absolute;
  bottom: 15px;
  right: 15px;
  cursor: pointer;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    bottom: 10px;
    right: 10px;
    gap: 8px;
  }

  &:focus {
    outline: none;
    border: none;
  }
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    gap: 3px;

    svg {
      width: 16px;
      height: 16px;
    }

    span {
      font-size: 12px;
    }
  }

  &:focus {
    outline: none;
    border: none;
  }
`;

export const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 30px;
  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    grid-template-columns: 1fr;
    gap: 15px;
    margin-top: 20px;
  }
`;

export const PostCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
`;

export const PostImage = styled.img`
  width: 70%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 100%;
    height: 180px;
  }
`;

export const PostTitle = styled.h3`
  margin: 0;
  color: white;
  font-size: 16px;
  font-weight: normal;
  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    font-size: 14px;
    text-align: center;
    padding: 0 10px;
  }
`;

export const EventTitle = styled.h1`
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 600;
  font-size: 48px;
  line-height: 60px;

  color: #ffffff;
  margin-bottom: 5px;
  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    font-size: 28px;
    line-height: 36px;
  }
`;

export const EventSubtitle = styled.h2`
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 40px;

  color: #ffffff;

  margin-bottom: 100px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 40px;
  }
`;

export const SaveButton = styled.button`
  padding: 12px 24px;
  width: 268px;
  height: 51px;
  background: #fff5d5;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 28px;
  color: #101148;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;

  &:hover {
    background: #fff0c0;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    position: static;
    width: 100%;
    height: 44px;
    font-size: 18px;
    margin-top: 20px;
  }
`;

export const EventInfoSection = styled.div`
  margin-top: 40px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    margin-top: 20px;
    padding: 0 10px;
    gap: 15px;
  }
`;

export const Section = styled.div`
  margin-bottom: 20px;
  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    margin-bottom: 15px;
  }
`;

export const SectionTitle = styled.div`
  //   position: absolute;
  margin-bottom: 10px;
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 35px;
  color: #ffffff;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    font-size: 20px;
    line-height: 26px;
  }
`;

export const SectionText = styled.div`
  //   position: absolute;

  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 30px;
  color: #ffffff;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    font-size: 16px;
    line-height: 22px;
  }
`;

export const MapWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 35px auto 30px auto;
  width: 1057px;
  height: 434px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 100%;
    height: 250px;
    margin: 20px auto;
  }
`;

export const ProductContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    margin: 10px 0 20px 0;
  }
`;

export const ProductImage = styled.img`
  width: 1057px;
  height: 737px;
  margin-bottom: 30px;
  object-fit: contain;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
  }
`;

export const EditDeleteButtons = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  gap: 10px;
  outline: none;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    top: 10px;
    right: 10px;
    gap: 5px;
  }
`;

export const ActionButton = styled.button`
  background: #fff5d5;
  color: black;
  border: none;
  border-radius: 4px;
  padding: 1px 1px;
  font-size: 18px;
  cursor: pointer;
  outline: none;
  color: '#464654';

  font-family: 'Gothic A1';
  font-weight: '500';
  word-wrap: 'break-word';
  &:focus {
    outline: none;
    border: none;
  }

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    font-size: 14px;
    padding: 4px 8px;
  }
`;

export const InlineEditTextArea = styled.textarea`
  width: 60%;
  height: 60px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px;
  font-size: 18px;
  line-height: 1.5;
  color: black;
  resize: none;
  margin-left: 20px;
  font-family: inherit;
  overflow-y: auto;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 90%;
    height: 50px;
    font-size: 14px;
    margin-left: 10px;
  }
`;

export const divider = styled.div`
  width: 700px;
  margin-top: 10px;
  margin-bottom: 30px;
  border: 1px solid #605f5f;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 100%;
    margin: 8px 0 20px 0;
  }
`;

export const StarRatingInput = styled.div`
  display: flex;
  gap: 4px;
  height: 32px;

  span {
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    height: 24px;

    img {
      width: 16px;
      height: 16px;
    }
  }
`;

export const ReviewStarRating = styled.div`
  display: flex;
  gap: 4px;
  height: 32px;

  span {
    display: flex;
    align-items: center;
  }

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    height: 24px;

    img {
      width: 16px;
      height: 16px;
    }
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
  color: white;
  margin-bottom: 20px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    gap: 15px;
    margin: 15px 0;
  }
`;

export const PaginationButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;

  &:disabled {
    cursor: not-allowed;
  }

  img {
    width: 8px;
    height: 15px;
  }
`;
