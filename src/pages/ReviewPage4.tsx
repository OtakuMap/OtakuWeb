import styled from 'styled-components';
import { MapPin } from 'lucide-react';
import profile from '../assets/profile.png';
import profile2 from '../assets/profile2.png';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

const profileData = {
  profileImage: profile,
  name: 'Otkkk011',
  rating: 3,
  maxRating: 4,
};

const reviewData = [
  {
    id: 1,
    profileImage: profile2,
    username: 'Otkkk011',
    rating: 3,
    maxRating: 4,
    likes: 10,
    dislikes: 0,
    content: '고시엔의 향기...\n고시엔의 흙...\n세이도의 기운을 느끼고 싶다면 여기로...',
  },
  {
    id: 2,
    profileImage: profile2,
    username: 'Otkkk011',
    rating: 3,
    maxRating: 4,
    likes: 10,
    dislikes: 0,
    content: '고시엔의 향기...\n고시엔의 흙...\n세이도의 기운을 느끼고 싶다면 여기로...',
  },
  {
    id: 3,
    profileImage: profile2,
    username: 'Otkkk011',
    rating: 3,
    maxRating: 4,
    likes: 10,
    dislikes: 0,
    content: '고시엔의 향기...\n고시엔의 흙...\n세이도의 기운을 느끼고 싶다면 여기로...',
  },
  {
    id: 4,
    profileImage: profile2,
    username: 'Otkkk011',
    rating: 3,
    maxRating: 4,
    likes: 10,
    dislikes: 0,
    content: '고시엔의 향기...\n고시엔의 흙...\n세이도의 기운을 느끼고 싶다면 여기로...',
  },
  {
    id: 5,
    profileImage: profile2,
    username: 'Otkkk011',
    rating: 3,
    maxRating: 4,
    likes: 10,
    dislikes: 0,
    content: '고시엔의 향기...\n고시엔의 흙...\n세이도의 기운을 느끼고 싶다면 여기로...',
  },
  {
    id: 6,
    profileImage: profile2,
    username: 'Otkkk011',
    rating: 3,
    maxRating: 4,
    likes: 10,
    dislikes: 0,
    content: '고시엔의 향기...\n고시엔의 흙...\n세이도의 기운을 느끼고 싶다면 여기로...',
  },
];

const Container = styled.div`
  background-color: #0c004b;
  width: 100vw;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

const LocationBar = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 20px;
  height: 50px;
  margin-bottom: 10px;
  padding: 0 20px;
  width: 400px;
  position: relative;
`;

const LocationInput = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LocationText = styled.input`
  border: none;
  padding: 10px;
  width: 100%;
  font-size: 14px;
  outline: none;
`;

const SaveLocationButton = styled.button`
  background-color: #e6e0ff;
  color: #000;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  position: absolute;
  right: -130px;
  top: 50%;
  transform: translateY(-50%);
`;

const DropdownButton = styled.div`
  background-color: #0c004b;
  color: white;
  border: 1px solid white;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  display: inline-block;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Tag = styled.div`
  background-color: #e6e0ff;
  color: #000;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
`;

const WhiteContainer = styled.div`
  background-color: #0c004b;
  width: 100%;
  border-radius: 20px;
  padding: 30px;
  box-sizing: border-box;
  color: white;
`;

const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 60px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const ProfileContainer = styled.div`
  align-items: center;
  gap: 10px;
  margin-left: 20px;
`;

const ProfileImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: gray;
  margin-bottom: 10px;
  object-fit: cover;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProfileName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: white;
`;

const StarRating = styled.div`
  font-size: 14px;
  color: #ffd700; /* Gold color for stars */
`;

const ReviewProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-left: 20px;
`;

const ReviewProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: gray;
  margin-bottom: 0px;
  object-fit: cover;
`;

const ReviewProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ReviewProfileName = styled.div`
  font-size: 15px;
  margin-left: 5px;
  color: black; /* 이름 색을 검정색으로 설정 */
  text-align: left;
`;

const ReviewStarRating = styled.div`
  font-size: 20px;
  color: #ffd700; /* Gold color for stars */
`;

const FeedbackSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 100px;
`;

const FeedbackInput = styled.textarea`
  width: 800px;
  height: 150px;
  border-radius: 10px;
  border: none;
  padding: 10px;
  font-size: 14px;
  resize: none;
  box-sizing: border-box;
`;

const Header = styled.h1`
  margin-top: 50px;
  font-size: 18px;
  margin-bottom: 10px;
  color: white;
  position: relative;
  padding-bottom: 20px;
  padding-left: 10px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 95%;
    height: 0.5px;
    background-color: white;
  }
`;
const ReviewItem = styled.div`
  background-color: white;
  color: #000;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  font-size: 14px;
  width: 250px;
  height: 250px;
  position: relative;
`;

const FeedbackButton = styled.div`
  position: relative;
  bottom: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
  cursor: pointer;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const FeedbackButtonsWrapper = styled.div`
  display: flex;
  gap: 15px; /* 버튼들 사이의 간격 설정 */
  justify-content: center; /* 버튼들을 가운데 정렬 */
  margin-top: 20px; /* 버튼들과 콘텐츠 사이에 간격 추가 */
  bottom: 10px;
  right: 10px;
  justify-content: flex-end;
  position: absolute;
`;

const ReviewContent = styled.p`
  font-size: 18px; /* 글씨 크기 증가 */
  font-weight: bold; /* 글자 두껍게 */
  margin: 10px 0; /* 여백 추가 (필요에 따라 조정) */
  color: black; /* 글자 색상 */
  text-align: left;
  white-space: pre-line;
  margin-top: 20px;
`;

const ReviewPage4 = () => {
  return (
    <Container>
      <ContentWrapper>
        <LocationBar>
          <LocationInput>
            <MapPin size={20} color="#0c004b" />
            <LocationText value="Hanshin Koshien Stadium" readOnly />
          </LocationInput>
          <SaveLocationButton>명소 저장하기</SaveLocationButton>
        </LocationBar>

        <DropdownButton>다이아몬드 에이스 ▼</DropdownButton>
        <TagContainer>
          <Tag>#다이에이</Tag>
          <Tag>#고시엔</Tag>
          <Tag>#아구에니</Tag>
        </TagContainer>
        <Header>후기 &gt; 한줄 후기</Header>

        <WhiteContainer>
          <FeedbackSection>
            <ProfileContainer>
              <ProfileImage src={profileData.profileImage} alt="프로필 이미지" />
              <ProfileInfo>
                <ProfileName>{profileData.name}</ProfileName>
                <StarRating>
                  {'⭐'.repeat(profileData.rating)}
                  {'☆'.repeat(profileData.maxRating - profileData.rating)}
                </StarRating>
              </ProfileInfo>
            </ProfileContainer>
            <FeedbackInput placeholder="한 줄 후기를 남겨주세요 !" />
          </FeedbackSection>

          <ReviewGrid>
            {reviewData.map((review) => (
              <ReviewItem key={review.id}>
                <ReviewProfileContainer>
                  <ReviewProfileImage src={review.profileImage} alt="프로필 이미지" />
                  <ReviewProfileInfo>
                    <ReviewProfileName>{review.username}</ReviewProfileName>
                    <ReviewStarRating>
                      {'⭐'.repeat(review.rating)}
                      {'☆'.repeat(review.maxRating - review.rating)}
                    </ReviewStarRating>
                  </ReviewProfileInfo>
                </ReviewProfileContainer>

                <ReviewContent>{review.content}</ReviewContent>

                <FeedbackButtonsWrapper>
                  <FeedbackButton>
                    <IconContainer>
                      <ThumbsUp size={20} />
                      <span>{review.likes}</span>
                    </IconContainer>
                  </FeedbackButton>
                  <FeedbackButton>
                    <IconContainer>
                      <ThumbsDown size={20} />
                      <span>{review.dislikes}</span>
                    </IconContainer>
                  </FeedbackButton>
                </FeedbackButtonsWrapper>
              </ReviewItem>
            ))}
          </ReviewGrid>
        </WhiteContainer>
      </ContentWrapper>
    </Container>
  );
};

export default ReviewPage4;
