import styled from 'styled-components';
import { MapPin } from 'lucide-react';
import profile from '../assets/profile.png';
import profile2 from '../assets/profile2.png';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useState } from 'react';

interface Review {
  id: number;
  profileImage: string;
  username: string;
  rating: number;
  maxRating: number;
  likes: number;
  dislikes: number;
  content: string;
}

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
  margin-top: 60px;
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
const SubmitButton = styled.button`
  background-color: white;
  color: #0c004b;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  position: absolute;
  right: 10px;
  bottom: 10px;

  &:hover {
    background-color: #f0f0f0;
  }
`;
const EditDeleteButtons = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
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

const ReviewItem = styled.div`
  background-color: white;
  color: #000;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  font-size: 14px;
  width: 250px;
  min-height: 250px;
  position: relative;
`;

// FeedbackButton 하나로 통합
const FeedbackButton = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  gap: 10px;
  &:hover {
    opacity: 0.8;
  }
`;

// InlineEditTextArea 추가
const InlineEditTextArea = styled.textarea`
  width: 85%;
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

const ReviewPage4 = () => {
  const [reviews, setReviews] = useState<Review[]>(reviewData);
  const [reviewText, setReviewText] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  // 리뷰 추가 핸들러
  const handleReviewSubmit = () => {
    if (reviewText.trim() === '') return;

    const newReview: Review = {
      id: reviews.length + 1,
      profileImage: profileData.profileImage,
      username: profileData.name,
      rating: profileData.rating,
      maxRating: profileData.maxRating,
      likes: 0,
      dislikes: 0,
      content: reviewText,
    };

    setReviews([newReview, ...reviews]);
    setReviewText('');
  };
  const handleEditStart = (review: Review) => {
    setEditingId(review.id);
    setEditText(review.content);
  };

  // 수정 취소
  const handleEditCancel = () => {
    setEditingId(null);
    setEditText('');
  };

  // 수정 완료
  const handleEditComplete = (reviewId: number) => {
    setReviews(
      reviews.map((review) => (review.id === reviewId ? { ...review, content: editText } : review)),
    );
    setEditingId(null);
    setEditText('');
  };

  const handleDelete = (reviewId: number) => {
    if (window.confirm('리뷰를 삭제하시겠습니까?')) {
      setReviews(reviews.filter((review) => review.id !== reviewId));
    }
  };

  const handleLike = (reviewId: number) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId ? { ...review, likes: review.likes + 1 } : review,
      ),
    );
  };

  const handleDislike = (reviewId: number) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId ? { ...review, dislikes: review.dislikes + 1 } : review,
      ),
    );
  };
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
            <div style={{ position: 'relative', width: '800px' }}>
              <FeedbackInput
                placeholder="한 줄 후기를 남겨주세요 !"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <SubmitButton onClick={handleReviewSubmit}>등록하기</SubmitButton>
            </div>
          </FeedbackSection>

          <ReviewGrid>
            {reviews.map(
              (
                review, // reviewData를 reviews로 변경
              ) => (
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

                  {editingId === review.id ? (
                    <InlineEditTextArea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      autoFocus
                    />
                  ) : (
                    <ReviewContent>{review.content}</ReviewContent>
                  )}

                  {review.username === profileData.name && (
                    <EditDeleteButtons>
                      {editingId === review.id ? (
                        <>
                          <ActionButton onClick={() => handleEditComplete(review.id)}>
                            완료
                          </ActionButton>
                          <ActionButton onClick={handleEditCancel}>취소</ActionButton>
                        </>
                      ) : (
                        <>
                          <ActionButton onClick={() => handleEditStart(review)}>수정</ActionButton>
                          <ActionButton onClick={() => handleDelete(review.id)}>삭제</ActionButton>
                        </>
                      )}
                    </EditDeleteButtons>
                  )}

                  <FeedbackButtonsWrapper>
                    <FeedbackButton onClick={() => handleLike(review.id)}>
                      <IconContainer>
                        <ThumbsUp size={20} />
                        <span>{review.likes}</span>
                      </IconContainer>
                    </FeedbackButton>
                    <FeedbackButton onClick={() => handleDislike(review.id)}>
                      <IconContainer>
                        <ThumbsDown size={20} />
                        <span>{review.dislikes}</span>
                      </IconContainer>
                    </FeedbackButton>
                  </FeedbackButtonsWrapper>
                </ReviewItem>
              ),
            )}
          </ReviewGrid>
        </WhiteContainer>
      </ContentWrapper>
    </Container>
  );
};

export default ReviewPage4;
