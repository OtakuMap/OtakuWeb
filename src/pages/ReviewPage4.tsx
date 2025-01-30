import { MapPin } from 'lucide-react';
import profile from '../assets/profile.png';
import profile2 from '../assets/profile2.png';
import StarFull from '../assets/StarFull.png';
import StarEm from '../assets/StarEm.png';
import BackPage from '../assets/BackPage.png';
import NextPage from '../assets/NextPage.png';
import dividerLine from '../assets/dividerLine.png';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import * as S from '../styles/review/ReviewPage.style';
import { ShortReviewRequest, PlaceData } from '../types/review/short-review';
import { createShortReview, getPlaceDetail, getShortReviewList } from '../api/review/short-review';
import { useParams, useNavigate } from 'react-router-dom';

interface Review {
  id: number;
  placeId: number;
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

const ReviewPage4 = () => {
  const { placeId } = useParams<{ placeId: string }>();
  const navigate = useNavigate();

  const [placeData, setPlaceData] = useState<PlaceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const reviewsPerPage = 6;

  const [reviews, setReviews] = useState<Review[]>([]);

  const [reviewText, setReviewText] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [inputRating, setInputRating] = useState(0);
  const [editRating, setEditRating] = useState(0);
  useEffect(() => {
    console.log('Current URL:', window.location.pathname);
    console.log('PlaceId from params:', placeId);
  }, [placeId]);
  // 장소 정보 가져오기
  useEffect(() => {
    const fetchPlaceData = async () => {
      if (!placeId || isNaN(parseInt(placeId))) {
        console.log('Invalid placeId:', placeId);
        setPlaceData(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        console.log('Fetching place data for ID:', placeId);
        const response = await getPlaceDetail(parseInt(placeId));
        console.log('Place data response:', response);
        if (response.isSuccess) {
          setPlaceData(response.result);
        } else {
          console.log('API returned false success status:', response);
          setPlaceData(null);
        }
      } catch (error) {
        console.error('Error fetching place data:', error);
        setPlaceData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaceData();
  }, [placeId]);

  // 한 줄 리뷰 목록 가져오기
  useEffect(() => {
    const fetchReviews = async () => {
      if (!placeId) return;

      try {
        const response = await getShortReviewList(parseInt(placeId), currentPage);
        if (response.isSuccess) {
          const reviewData = response.result.shortReviews.map((review) => ({
            id: review.id,
            placeId: response.result.placeId,
            profileImage: profile2,
            username: review.user.nickname,
            rating: review.rating,
            maxRating: 4,
            likes: review.likes,
            dislikes: review.dislikes,
            content: review.content,
            userVote: null,
          }));
          setReviews(reviewData);
          setTotalPages(response.result.totalPages);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [placeId, currentPage]);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const handleReviewSubmit = async () => {
    if (!placeData) {
      window.confirm('장소 정보를 불러오는 데 실패했습니다. 다시 시도해 주세요.');
      return;
    }

    if (reviewText.trim() === '') {
      window.confirm('후기를 등록해주세요!');
      return;
    }
    if (inputRating === 0) {
      window.confirm('별점을 등록해주세요!');
      return;
    }

    setIsSubmitting(true);
    try {
      const reviewData: ShortReviewRequest = {
        placeAnimationId: placeData.animationId,
        rating: inputRating,
        content: reviewText,
      };

      const response = await createShortReview(parseInt(placeId || '0'), reviewData);

      if (response.isSuccess) {
        const newReview: Review = {
          id: response.result.reviewId,
          placeId: response.result.placeId,
          profileImage: profileData.profileImage,
          username: profileData.name,
          rating: inputRating,
          maxRating: 4,
          likes: 0,
          dislikes: 0,
          content: reviewText,
          userVote: null,
        };

        setReviews([newReview, ...reviews]);
        setReviewText('');
        setInputRating(0);
        window.confirm('리뷰가 등록되었습니다!');
      } else {
        window.confirm('리뷰 등록에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error creating review:', error);
      window.confirm('리뷰 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleEditStart = (review: Review) => {
    setEditingId(review.id);
    setEditText(review.content);
    setEditRating(review.rating);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditText('');
    setEditRating(0);
  };

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!placeData) {
    return <div>Place not found</div>;
  }

  return (
    <S.Container>
      <S.ContentWrapper>
        <S.LocationBar>
          <S.LocationInput>
            <MapPin size={20} color="#0c004b" />
            <S.LocationText value={placeData.name} readOnly />
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
                placeholder="한 줄 후기를 남겨주세요 !"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <S.SubmitButton onClick={handleReviewSubmit} disabled={isSubmitting}>
                {isSubmitting ? '등록 중...' : '등록하기'}
              </S.SubmitButton>
            </div>
          </S.FeedbackSection>

          <S.ReviewGrid4>
            {currentReviews.map((review) => (
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
                        color={review.userVote === 'like' ? '#ffd700' : '#0c004b'}
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
            ))}
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
