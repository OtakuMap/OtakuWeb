import styled from 'styled-components';

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
`;

export const Content = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
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
`;

export const EventHeaderInner = styled.div`
  position: relative;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  gap: 40px;
`;

export const EventImage = styled.img`
  width: 336px;
  height: 476px;
  object-fit: cover;
  margin-top: auto;
`;

export const EventInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 40px;
  margin-left: 10px;
  position: relative;
`;

// Navigation styles
export const TabWrapper = styled.div`
  width: 100vw;
  position: relative;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  border-bottom: 1px solid #ffffff;
  background-color: #0c004b;
`;

export const TabInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  gap: 120px;
  position: relative;
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

  span {
    color: #ffd700;
    font-size: 18px;
  }
`;

export const ReviewSection = styled.div`
  margin-top: 20px;
`;

export const ReviewInput = styled.div`
  background: #0c004b;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
`;

export const InputHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

export const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-left: 20px;
`;

export const Profileimg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

export const UserName = styled.div`
  font-weight: bold;
  color: black;
`;

export const ProfileName = styled.div`
  font-weight: bold;
  color: white;
`;

export const Rating = styled.div`
  color: #ffd700;
  font-size: 18px;
`;

export const InputSection = styled.div`
  position: relative;
  display: flex;
`;

export const TextArea = styled.textarea`
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
`;

export const ReviewButton = styled.button`
  position: absolute;
  right: 20px;
  bottom: 20px;
  background: white;
  color: black;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  z-index: 2;
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
`;

export const ReviewCard = styled.div`
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  background: white;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 950px;
  height: 152px;
`;

export const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  width: 100%;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-left: 20px;
`;

export const ReviewContent = styled.p`
  font-size: 18px;
  line-height: 1.5;
  color: black;
  white-space: pre-line;
  font-weight: '500';
  margin-left: 30px;
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
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
`;

export const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 30px;
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
`;

export const PostTitle = styled.h3`
  margin: 0;
  color: white;
  font-size: 16px;
  font-weight: normal;
`;

export const EventTitle = styled.h1`
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 600;
  font-size: 48px;
  line-height: 60px;

  color: #ffffff;
  margin-bottom: 5px;
`;

export const EventSubtitle = styled.h2`
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 40px;

  color: #ffffff;

  margin-bottom: 100px;
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
`;

export const EventInfoSection = styled.div`
  margin-top: 40px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Section = styled.div`
  margin-bottom: 20px;
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
`;

export const SectionText = styled.div`
  //   position: absolute;

  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 30px;
  color: #ffffff;
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
`;

export const ProductContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

export const ProductImage = styled.img`
  width: 1057px;
  height: 737px;
  margin-bottom: 30px;
`;

export const EditDeleteButtons = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  gap: 10px;
`;

export const ActionButton = styled.button`
  background: white;
  color: black;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
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
`;

export const divider = styled.div`
  width: 700px;
  margin-top: 10px;
  margin-bottom: 30px;
  border: 1px solid #605f5f;
`;
