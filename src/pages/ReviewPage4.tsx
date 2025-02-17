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
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/reduxHooks';
import { openLoginModal } from '@/store/slices/modalSlice';
import * as S from '../styles/review/ReviewPage.style';
import { createShortReview } from '@/api/review/short-review';
import { ShortReviewRequest } from '@/types/review/short-review';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

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

const ReviewPage4 = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
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
  const { placeId } = useParams<{ placeId: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!placeId) {
      console.error('No placeId available');
      window.confirm('장소 정보를 찾을 수 없습니다.');
      navigate('/places'); // 또는 적절한 페이지로 이동
      return;
    }
  }, [placeId, navigate]);

  useEffect(() => {
    const savedReviews = localStorage.getItem(`reviews_${placeId}`);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    } else {
      setReviews(reviewData.map((review) => ({ ...review, userVote: null })));
    }
  }, [placeId]);

  useEffect(() => {
    if (placeId) {
      localStorage.setItem(`reviews_${placeId}`, JSON.stringify(reviews));
    }
  }, [reviews, placeId]);

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
  const handleReviewSubmit = async () => {
    try {
      const requestData: ShortReviewRequest = {
        placeAnimationId: 2,
        rating: inputRating,
        content: reviewText.trim(),
      };

      const result = await createShortReview(Number(placeId), requestData);

      if (result.isSuccess) {
        const newReview: Review = {
          id: result.result.reviewId,
          profileImage: profileData.profileImage,
          username: profileData.name,
          rating: inputRating,
          maxRating: 4,
          likes: 0,
          dislikes: 0,
          content: reviewText,
          userVote: null,
        };

        setReviews((prevReviews) => {
          const uniqueReviews = [newReview, ...prevReviews].filter(
            (review, index, self) => index === self.findIndex((r) => r.id === review.id),
          );
          return uniqueReviews;
        });

        setReviewText('');
        setInputRating(0);
        setCurrentPage(1);
        window.confirm('리뷰가 등록되었습니다!');
      }
    } catch (error) {
      console.error('Error:', error);
      window.confirm('리뷰 등록 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
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
    if (!isLoggedIn) {
      dispatch(openLoginModal());
      return;
    }

    setReviews(
      reviews.map((review) => {
        if (review.id === reviewId) {
          if (review.userVote === 'like') {
            return { ...review, likes: review.likes - 1, userVote: null };
          } else {
            const newLikes = review.likes + 1;
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
    if (!isLoggedIn) {
      dispatch(openLoginModal());
      return;
    }

    setReviews(
      reviews.map((review) => {
        if (review.id === reviewId) {
          if (review.userVote === 'dislike') {
            return { ...review, dislikes: review.dislikes - 1, userVote: null };
          } else {
            const newDislikes = review.dislikes + 1;
            const newLikes = review.userVote === 'like' ? review.likes - 1 : review.likes;
            return { ...review, likes: newLikes, dislikes: newDislikes, userVote: 'dislike' };
          }
        }
        return review;
      }),
    );
  };

  const handleTextAreaClick = () => {
    if (!isLoggedIn) {
      dispatch(openLoginModal());
    }
  };

  const handleSubmitButtonClick = () => {
    if (!isLoggedIn) {
      dispatch(openLoginModal());
      return;
    }
    handleReviewSubmit();
  };

  return (
    <S.Container>
      <S.ContentWrapper>
        <S.LocationBar>
          <S.LocationInput>
            <MapPin size={20} color="#0c004b" />
            <S.LocationText value="Hanshin Koshien Stadium" readOnly />
          </S.LocationInput>
          <S.SaveLocationButton onClick={() => navigate('/saved-places')}>
            명소 저장하기
          </S.SaveLocationButton>
        </S.LocationBar>

        <S.DropdownButton>다이아몬드 에이스 ▼</S.DropdownButton>
        <S.TagContainer>
          <S.Tag>#다이에이</S.Tag>
          <S.Tag>#고시엔</S.Tag>
          <S.Tag>#아구에니</S.Tag>
        </S.TagContainer>
        <S.Header>후기 &gt; 한줄 후기</S.Header>

        <S.WhiteContainer4>
          <S.FeedbackSection>
            <S.ProfileContainer>
              <S.ProfileImage src={profileData.profileImage} alt="프로필 이미지" />
              <S.ProfileInfo>
                <S.ProfileName>{profileData.name}</S.ProfileName>

                <div style={{ marginBottom: '10px' }}>
                  <S.StarRatingInput>
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
                  </S.StarRatingInput>
                </div>
              </S.ProfileInfo>
            </S.ProfileContainer>
            <div style={{ position: 'relative', width: '800px' }}>
              <S.FeedbackInput
                placeholder={isLoggedIn ? '한 줄 후기를 남겨주세요 !' : '로그인이 필요합니다.'}
                value={reviewText}
                onChange={(e) => isLoggedIn && setReviewText(e.target.value)}
                onClick={handleTextAreaClick}
                readOnly={!isLoggedIn}
                style={{
                  backgroundColor: !isLoggedIn ? '#f5f5f5' : 'white',
                  cursor: !isLoggedIn ? 'pointer' : 'text',
                  color: !isLoggedIn ? '#666' : '#000',
                }}
              />
              <S.SubmitButton
                onClick={handleSubmitButtonClick}
                disabled={!isLoggedIn || isSubmitting}
                style={{
                  opacity: !isLoggedIn || isSubmitting ? 0.5 : 1,
                  cursor: !isLoggedIn || isSubmitting ? 'not-allowed' : 'pointer',
                }}
              >
                {isSubmitting ? '등록 중...' : '등록하기'}
              </S.SubmitButton>
            </div>
          </S.FeedbackSection>

          <S.ReviewGrid4>
            {currentReviews.map(
              (
                review, // reviewData를 reviews로 변경
              ) => (
                <S.ReviewItem4 key={review.id}>
                  <S.ReviewProfileContainer>
                    <S.ReviewProfileImage src={review.profileImage} alt="프로필 이미지" />
                    <S.ReviewProfileInfo>
                      <S.ReviewProfileName>{review.username}</S.ReviewProfileName>
                      {editingId === review.id ? (
                        <S.StarRatingInput>
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
                        </S.StarRatingInput>
                      ) : (
                        <S.ReviewStarRating>
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
                        </S.ReviewStarRating>
                      )}
                    </S.ReviewProfileInfo>
                  </S.ReviewProfileContainer>

                  {editingId === review.id ? (
                    <S.InlineEditTextArea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      autoFocus
                    />
                  ) : (
                    <S.ReviewContent4>{review.content}</S.ReviewContent4>
                  )}

                  {review.username === profileData.name && (
                    <S.EditDeleteButtons>
                      {editingId === review.id ? (
                        <>
                          <S.ActionButton onClick={() => handleEditComplete(review.id)}>
                            완료
                          </S.ActionButton>
                          <S.ButtonDivider src={dividerLine} alt="divider" />
                          <S.ActionButton onClick={handleEditCancel}>취소</S.ActionButton>
                        </>
                      ) : (
                        <>
                          <S.ActionButton onClick={() => handleEditStart(review)}>
                            수정
                          </S.ActionButton>
                          <S.ButtonDivider src={dividerLine} alt="divider" />
                          <S.ActionButton onClick={() => handleDelete(review.id)}>
                            삭제
                          </S.ActionButton>
                        </>
                      )}
                    </S.EditDeleteButtons>
                  )}

                  <S.FeedbackButtonsWrapper>
                    <S.FeedbackButton onClick={() => handleLike(review.id)}>
                      <S.IconContainer>
                        <ThumbsUp
                          size={20}
                          color={review.userVote === 'like' ? '#ffd700' : '#0c004b'} // 활성화시 파란색, 기본은 회색
                        />
                        <span>{review.likes}</span>
                      </S.IconContainer>
                    </S.FeedbackButton>
                    <S.FeedbackButton onClick={() => handleDislike(review.id)}>
                      <S.IconContainer>
                        <ThumbsDown
                          size={20}
                          color={review.userVote === 'dislike' ? '#ffd700' : '#0c004b'}
                        />
                        <span>{review.dislikes}</span>
                      </S.IconContainer>
                    </S.FeedbackButton>
                  </S.FeedbackButtonsWrapper>
                </S.ReviewItem4>
              ),
            )}
          </S.ReviewGrid4>
        </S.WhiteContainer4>
        <S.Pagination>
          <S.PaginationButton onClick={handlePrevPage} disabled={currentPage === 1}>
            <img src={BackPage} alt="이전 페이지" />
          </S.PaginationButton>
          {currentPage}/{totalPages}
          <S.PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages}>
            <img src={NextPage} alt="다음 페이지" />
          </S.PaginationButton>
        </S.Pagination>
      </S.ContentWrapper>
    </S.Container>
  );
};

export default ReviewPage4;
