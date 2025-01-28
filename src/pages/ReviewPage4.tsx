import styled from 'styled-components';
import { MapPin } from 'lucide-react';
import profile from '../assets/profile.png';
import profile2 from '../assets/profile2.png';
import StarFull from '../assets/StarFull.png';
import StarEm from '../assets/StarEm.png';
import BackPage from '../assets/BackPage.png';
import NextPage from '../assets/NextPage.png';
import dividerLine from '../assets/dividerLine.png';
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
  userVote: 'like' | 'dislike' | null;
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
  {
    id: 7,
    profileImage: profile2,
    username: 'Otkkk011',
    rating: 3,
    maxRating: 4,
    likes: 10,
    dislikes: 0,
    content: '고시엔의 향기...\n고시엔의 흙...\n세이도의 기운을 느끼고 싶다면 여기로...',
  },
  {
    id: 8,
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
  justify-content: center;
  display: flex;
  flex-direction: column;
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
  align-items: center;
`;

const ProfileName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: white;
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
  outline: none;
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
  margin-bottom: 20px;
  font-family: 'Gothic A1';
  font-weight: '600';
  word-wrap: 'break-word';
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
  gap: 0px;
  outline: none;
  margin-left: 5px;
`;

const ActionButton = styled.button`
  background: white;
  color: black;
  border: none;
  border-radius: 4px;
  padding: 1px 1px;
  font-size: 12px;
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
  outline: none;
`;

// InlineEditTextArea 추가
const InlineEditTextArea = styled.textarea`
  width: 100%;
  height: 120px;
  outline: none;
  border-radius: 8px;
  font-size: 18px;
  margin-top: 20px;
  line-height: 1.5;
  color: black;
  font-weight: bold;
  resize: none;
  margin: 10px 0;
  font-family: inherit;
  overflow-y: auto;
`;
const StarRatingInput = styled.div`
  display: flex;
  gap: 4px;
  height: 32px;

  span {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`;

const ReviewStarRating = styled.div`
  display: flex;
  gap: 4px;
  height: 32px;

  span {
    display: flex;
    align-items: center;
  }
`;

const ButtonDivider = styled.img`
  height: 17px; // 필요한 높이로 조절
  margin: 5px;
`;
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
  color: white;
`;

const PaginationButton = styled.button`
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

const ReviewPage4 = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6;
  const [reviews, setReviews] = useState<Review[]>(
    reviewData.map((review) => ({
      ...review,
      userVote: null,
    })),
  );
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const [reviewText, setReviewText] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [inputRating, setInputRating] = useState(0);
  const [editRating, setEditRating] = useState(0);

  // 리뷰 추가 핸들러
  const handleReviewSubmit = () => {
    if (reviewText.trim() === '') {
      window.confirm('후기를 등록해주세요!');
      return;
    }
    if (inputRating === 0) {
      window.confirm('별점을 등록해주세요!');
      return;
    }
    const newReview: Review = {
      id: reviews.length + 1,
      profileImage: profileData.profileImage,
      username: profileData.name,
      rating: inputRating, // profileData.rating 대신 inputRating 사용
      maxRating: 4, // 최대 별점을 4로 고정
      likes: 0,
      dislikes: 0,
      content: reviewText,
      userVote: null,
    };

    setReviews([newReview, ...reviews]);
    setReviewText('');
    setInputRating(0); // 입력 후 별점 초기화
  };

  const handleEditStart = (review: Review) => {
    setEditingId(review.id);
    setEditText(review.content);
    setEditRating(review.rating);
  };

  // 수정 취소
  const handleEditCancel = () => {
    setEditingId(null);
    setEditText('');
    setEditRating(0);
  };

  // 수정 완료
  const handleEditComplete = (reviewId: number) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId ? { ...review, content: editText, rating: editRating } : review,
      ),
    );
    setEditingId(null);
    setEditText('');
    setEditRating(0);
  };

  const handleDelete = (reviewId: number) => {
    if (window.confirm('리뷰를 삭제하시겠습니까?')) {
      setReviews(reviews.filter((review) => review.id !== reviewId));
    }
  };

  const handleLike = (reviewId: number) => {
    setReviews(
      reviews.map((review) => {
        if (review.id === reviewId) {
          if (review.userVote === 'like') {
            // 이미 좋아요를 눌렀다면 취소
            return { ...review, likes: review.likes - 1, userVote: null };
          } else {
            // 처음 좋아요를 누르는 경우
            const newLikes = review.likes + 1;
            // 싫어요를 눌렀던 상태라면 싫어요도 취소
            const newDislikes =
              review.userVote === 'dislike' ? review.dislikes - 1 : review.dislikes;
            return { ...review, likes: newLikes, dislikes: newDislikes, userVote: 'like' };
          }
        }
        return review;
      }),
    );
  };

  const handleDislike = (reviewId: number) => {
    setReviews(
      reviews.map((review) => {
        if (review.id === reviewId) {
          if (review.userVote === 'dislike') {
            // 이미 싫어요를 눌렀다면 취소
            return { ...review, dislikes: review.dislikes - 1, userVote: null };
          } else {
            // 처음 싫어요를 누르는 경우
            const newDislikes = review.dislikes + 1;
            // 좋아요를 눌렀던 상태라면 좋아요도 취소
            const newLikes = review.userVote === 'like' ? review.likes - 1 : review.likes;
            return { ...review, likes: newLikes, dislikes: newDislikes, userVote: 'dislike' };
          }
        }
        return review;
      }),
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

                <div style={{ marginBottom: '10px' }}>
                  <StarRatingInput>
                    {[1, 2, 3, 4].map((star) => (
                      <span key={star} onClick={() => setInputRating(star)}>
                        <img
                          src={star <= inputRating ? StarFull : StarEm}
                          alt="star"
                          width="20"
                          height="20"
                        />
                      </span>
                    ))}
                  </StarRatingInput>
                </div>
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
            {currentReviews.map(
              (
                review, // reviewData를 reviews로 변경
              ) => (
                <ReviewItem key={review.id}>
                  <ReviewProfileContainer>
                    <ReviewProfileImage src={review.profileImage} alt="프로필 이미지" />
                    <ReviewProfileInfo>
                      <ReviewProfileName>{review.username}</ReviewProfileName>
                      {editingId === review.id ? (
                        <StarRatingInput>
                          {[1, 2, 3, 4].map((star) => (
                            <span key={star} onClick={() => setEditRating(star)}>
                              <img
                                src={star <= editRating ? StarFull : StarEm}
                                alt="star"
                                width="20"
                                height="20"
                              />
                            </span>
                          ))}
                        </StarRatingInput>
                      ) : (
                        <ReviewStarRating>
                          {[1, 2, 3, 4].map((star) => (
                            <span key={star}>
                              <img
                                src={star <= review.rating ? StarFull : StarEm}
                                alt="star"
                                width="20"
                                height="20"
                              />
                            </span>
                          ))}
                        </ReviewStarRating>
                      )}
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
                          <ButtonDivider src={dividerLine} alt="divider" />
                          <ActionButton onClick={handleEditCancel}>취소</ActionButton>
                        </>
                      ) : (
                        <>
                          <ActionButton onClick={() => handleEditStart(review)}>수정</ActionButton>
                          <ButtonDivider src={dividerLine} alt="divider" />
                          <ActionButton onClick={() => handleDelete(review.id)}>삭제</ActionButton>
                        </>
                      )}
                    </EditDeleteButtons>
                  )}

                  <FeedbackButtonsWrapper>
                    <FeedbackButton onClick={() => handleLike(review.id)}>
                      <IconContainer>
                        <ThumbsUp
                          size={20}
                          color={review.userVote === 'like' ? '#ffd700' : '#0c004b'} // 활성화시 파란색, 기본은 회색
                        />
                        <span>{review.likes}</span>
                      </IconContainer>
                    </FeedbackButton>
                    <FeedbackButton onClick={() => handleDislike(review.id)}>
                      <IconContainer>
                        <ThumbsDown
                          size={20}
                          color={review.userVote === 'dislike' ? '#ffd700' : '#0c004b'}
                        />
                        <span>{review.dislikes}</span>
                      </IconContainer>
                    </FeedbackButton>
                  </FeedbackButtonsWrapper>
                </ReviewItem>
              ),
            )}
          </ReviewGrid>
        </WhiteContainer>
        <Pagination>
          <PaginationButton onClick={handlePrevPage} disabled={currentPage === 1}>
            <img src={BackPage} alt="이전 페이지" />
          </PaginationButton>
          {currentPage}/{totalPages}
          <PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages}>
            <img src={NextPage} alt="다음 페이지" />
          </PaginationButton>
        </Pagination>
      </ContentWrapper>
    </Container>
  );
};

export default ReviewPage4;
