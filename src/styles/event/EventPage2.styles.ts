import styled from 'styled-components';

interface EventHeaderProps {
  imageUrl: string;
}

export const Container = styled.div`
  background-color: #0c004b;
  color: white;
  font-family: 'Arial', sans-serif;
  padding: 20px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: auto;
  margin-top: 60px;
`;

export const Content = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
`;

export const EventHeader = styled.div<EventHeaderProps>`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  padding: 40px;
  position: relative;
  overflow: hidden;
  background-image: linear-gradient(to bottom, #0c004b, transparent),
    url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
`;

// Navigation styles
export const TabNav = styled.nav`
  display: flex;
  margin: 20px 0;
  border-bottom: 1px solid #252660;
  gap: 40px;
  padding: 0 20px;
`;

export const Tab = styled.button<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? '#fff' : '#666')};
  background: none;
  border: none;
  padding: 10px 0;
  font-size: 16px;
  cursor: pointer;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${(props) => (props.isActive ? '#B8EFFD' : 'transparent')};
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

export const EventImage = styled.img`
  width: 250px;
  height: 350px;
  object-fit: cover;
  border-radius: 10px;
`;

export const EventInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const EventTitle = styled.h1`
  font-size: 32px;
  margin-bottom: 5px;
`;

export const EventSubtitle = styled.h2`
  font-size: 24px;
  color: #cccccc;
  margin-bottom: 20px;
`;

export const SaveButton = styled.button`
  background-color: #fef3c7;
  position: absolute;
  bottom: 50px;
  right: 90px;
  color: #0a0a2e;
  padding: 12px 24px;
  border-radius: 20px;
  border: none;
  font-weight: bold;
  width: 268px;
  cursor: pointer;

  &:hover {
    background-color: #fde68a;
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
  font-size: 18px;
`;

export const SectionText = styled.div`
  font-size: 18px;
`;

export const MapWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto 30px auto;
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
