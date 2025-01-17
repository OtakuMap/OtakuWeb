import { useState } from 'react';
import styled from 'styled-components';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import profile from '../assets/profile.png';
import profile3 from '../assets/profile3.png';
import eventImage from '../assets/event.png';
import review from '../assets/review.png';
import backimage from '../assets/backimage.png';
import mapImage from '../assets/map.png';
import product from '../assets/product.png';

const eventData = {
  title: '다이아몬드 에이스 ACT2 팝업스토어',
  titleJp: 'ダイヤのA act II」POP UP SHOP in AMNIBUS STORE',
  subtitle: '다이아몬드 에이스 ACT2',
  image: eventImage,
  backimage: backimage,
  date: {
    start: '2024년 11월 22일',
    end: '2024년 12월 8일',
  },
  location: {
    name: 'Tokyo AMNIBUS STORE(MAGNET by SHIBUYA109 5F)',
    mapImage: mapImage,
  },
  productImage: product,
};
const profileData = {
  profileImage: profile,
  name: 'Otkkk011',
  rating: 3,
  maxRating: 4,
};
const reviewData = [
  {
    id: 1,
    profileImage: profile3,
    username: 'Otkkk011',
    rating: 3,
    maxRating: 4,
    likes: 10,
    dislikes: 0,
    content:
      '구즈 물량이 엄청 맛있는 않은데 사고싶었던 세이도섯지차를\n구메하게 되어서 완전 만족입니다!!!!',
  },
  {
    id: 2,
    profileImage: profile3,
    username: 'Otkkk011',
    rating: 3,
    maxRating: 4,
    likes: 10,
    dislikes: 0,
    content:
      '구즈 물량이 엄청 맛있는 않은데 사고싶었던 세이도섯지차를\n구메하게 되어서 완전 만족입니다!!!!',
  },
  {
    id: 3,
    profileImage: profile3,
    username: 'Otkkk011',
    rating: 3,
    maxRating: 4,
    likes: 10,
    dislikes: 0,
    content:
      '구즈 물량이 엄청 맛있는 않은데 사고싶었던 세이도섯지차를\n구메하게 되어서 완전 만족입니다!!!!',
  },
  {
    id: 4,
    profileImage: profile3,
    username: 'Otkkk011',
    rating: 3,
    maxRating: 4,
    likes: 10,
    dislikes: 0,
    content:
      '구즈 물량이 엄청 맛있는 않은데 사고싶었던 세이도섯지차를\n구메하게 되어서 완전 만족입니다!!!!',
  },
];

const postData = [
  {
    id: 1,
    image: review,
    title: '아니 그니까 지금 내가 KBO보다가 고시엔까지 왔다고',
  },
  {
    id: 2,
    image: review,
    title: '아니 그니까 지금 내가 KBO보다가 고시엔까지 왔다고',
  },
  {
    id: 3,
    image: review,
    title: '아니 그니까 지금 내가 KBO보다가 고시엔까지 왔다고',
  },
  {
    id: 4,
    image: review,
    title: '아니 그니까 지금 내가 KBO보다가 고시엔까지 왔다고',
  },
];

const Container = styled.div`
  background-color: #0c004b; /* 일관된 배경색 설정 */
  color: white;
  font-family: 'Arial', sans-serif;
  padding: 20px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* 상단 정렬로 변경 */
  overflow-y: auto; /* 세로 스크롤 추가 */
`;

const Content = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
`;
interface EventHeaderProps {
  imageUrl: string; // eventData.backimage와 같은 이미지 URL을 받아올 prop
}

const EventHeader = styled.div<EventHeaderProps>`
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
const TabNav = styled.nav`
  display: flex;
  margin: 20px 0;
  border-bottom: 1px solid #252660;
  gap: 40px;
  padding: 0 20px;
`;

const Tab = styled.button<{ isActive: boolean }>`
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
const ReviewCount = styled.div`
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

const ReviewSection = styled.div`
  margin-top: 20px;
`;

const ReviewInput = styled.div`
  background: #0c004b;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
`;

const InputHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-left: 20px;
`;
const Profileimg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const UserName = styled.div`
  font-weight: bold;
  color: black;
`;

const ProfileName = styled.div`
  font-weight: bold;
  color: white;
`;

const Rating = styled.div`
  color: #ffd700;
  font-size: 18px;
`;

const InputSection = styled.div`
  position: relative;
  display: flex;
`;

const TextArea = styled.textarea`
  width: 857px;
  height: 230px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  padding-right: 100px; // 버튼을 위한 여백
  font-size: 16px;
  resize: none;

  &::placeholder {
    color: #999;
  }
`;

const ReviewButton = styled.button`
  position: absolute;
  right: 20px; // textarea 내부 우측 여백
  bottom: 20px; // textarea 내부 하단 여백
  background: white;
  color: black;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  z-index: 2;
`;

const ReviewList = styled.div`
  background: #0c004b;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex; /* Flexbox 활성화 */
  flex-direction: column; /* 세로 정렬 유지 */
  align-items: center; /* 가로 중앙 정렬 */
  gap: 15px; /* 카드 간의 간격 */
`;

const ReviewCard = styled.div`
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  background: white;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center; // 세로 중앙 정렬을 위해 추가
  width: 950px;
  height: 152px;
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  width: 100%;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 가로 기준 중앙 정렬 */
  text-align: center;
  margin-left: 20px;
`;

const ReviewContent = styled.p`
  font-size: 18px;
  line-height: 1.5;
  color: black;
  white-space: pre-line;
  font-weight: '500';
  margin-left: 30px;
`;

const FeedbackButtons = styled.div`
  display: flex;
  gap: 10px;
  align-self: flex-end;
  margin-top: auto;
  position: absolute;
  bottom: 15px;
  right: 15px;
  cursor: pointer;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
`;

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 30px;
`;

const PostCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
`;

const PostImage = styled.img`
  width: 70%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
`;

const PostTitle = styled.h3`
  margin: 0;
  color: white;
  font-size: 16px;
  font-weight: normal;
`;

const EventImage = styled.img`
  width: 250px;
  height: 350px;
  object-fit: cover;
  border-radius: 10px;
`;

const EventInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const EventTitle = styled.h1`
  font-size: 32px;
  margin-bottom: 5px;
`;

const EventSubtitle = styled.h2`
  font-size: 24px;
  color: #cccccc;
  margin-bottom: 20px;
`;

const SaveButton = styled.button`
  background-color: #fef3c7;
  position: absolute;
  bottom: 50px;
  right: 90px; /* 오른쪽 고정 */
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

const EventInfoSection = styled.div`
  margin-top: 40px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.div`
  font-size: 18px;
`;
const SectionText = styled.div`
  font-size: 18px;
`;
const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const MapImage = styled.img`
  width: 1057px;
  height: 434px;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 30px;
  margin-top: 20px;
`;

const ProductContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const ProductImage = styled.img`
  width: 1057px;
  height: 737px;
  margin-bottom: 30px;
`;

const EventPage = () => {
  const [activeTab, setActiveTab] = useState('후기');

  return (
    <Container>
      <Content>
        <EventHeader imageUrl={eventData.backimage}>
          <EventImage src={eventImage} alt={eventData.title} />
          <EventInfo>
            <EventTitle>{eventData.title}</EventTitle>
            <EventSubtitle>{eventData.subtitle}</EventSubtitle>
            <SaveButton>이벤트 저장하기</SaveButton>
          </EventInfo>
        </EventHeader>

        <TabNav>
          {['기본정보', '후기', '공식 사이트'].map((tab) => (
            <Tab key={tab} isActive={activeTab === tab} onClick={() => setActiveTab(tab)}>
              {tab}
            </Tab>
          ))}
        </TabNav>

        {activeTab === '기본정보' && (
          <EventInfoSection>
            <Section>
              <SectionTitle>이벤트 이름</SectionTitle>
              <SectionText>{eventData.titleJp}</SectionText>
            </Section>

            <Section>
              <SectionTitle>일자</SectionTitle>
              <SectionText>
                {eventData.date.start} - {eventData.date.end}
              </SectionText>
            </Section>

            <Section>
              <SectionTitle>위치</SectionTitle>
              <SectionText>{eventData.location.name}</SectionText>
              <MapContainer>
                <MapImage src={eventData.location.mapImage} alt="위치" />
              </MapContainer>
            </Section>

            <Section>
              <SectionTitle>판매제품</SectionTitle>
              <ProductContainer>
                <ProductImage src={eventData.productImage} alt="판매제품 목록" />
              </ProductContainer>
            </Section>
          </EventInfoSection>
        )}

        {activeTab === '후기' && (
          <ReviewSection>
            <ReviewInput>
              <InputHeader>
                <ProfileSection>
                  <Profileimg src={profileData.profileImage} alt="프로필" />

                  <ProfileName>{profileData.name}</ProfileName>
                  <Rating>
                    {'⭐'.repeat(profileData.rating)}
                    {'☆'.repeat(profileData.maxRating - profileData.rating)}
                  </Rating>
                </ProfileSection>
                <InputSection>
                  <TextArea placeholder="한 줄 후기를 남겨주세요!" />
                  <ReviewButton>등록하기</ReviewButton>
                </InputSection>
              </InputHeader>
            </ReviewInput>
            <ReviewCount>
              한 줄 리뷰 (19)
              <span>평균 평점: 4.5</span>
            </ReviewCount>
            <ReviewList>
              {reviewData.map((review) => (
                <ReviewCard key={review.id}>
                  <ReviewHeader>
                    <Avatar src={review.profileImage} alt="프로필" />
                    <UserInfo>
                      <UserName>{review.username}</UserName>
                      <Rating>
                        {'⭐'.repeat(review.rating)}
                        {'☆'.repeat(review.maxRating - review.rating)}
                      </Rating>
                    </UserInfo>
                    <ReviewContent>{review.content}</ReviewContent>
                  </ReviewHeader>

                  <FeedbackButtons>
                    <IconButton>
                      <ThumbsUp size={20} />
                      <span>{review.likes}</span>
                    </IconButton>
                    <IconButton>
                      <ThumbsDown size={20} />
                      <span>{review.dislikes}</span>
                    </IconButton>
                  </FeedbackButtons>
                </ReviewCard>
              ))}
            </ReviewList>

            <ReviewCount>후기 게시물 (10)</ReviewCount>
            <PostGrid>
              {postData.map((post) => (
                <PostCard key={post.id}>
                  <PostImage src={post.image} alt={post.title} />
                  <PostTitle>{post.title}</PostTitle>
                </PostCard>
              ))}
            </PostGrid>
          </ReviewSection>
        )}
      </Content>
    </Container>
  );
};

export default EventPage;
