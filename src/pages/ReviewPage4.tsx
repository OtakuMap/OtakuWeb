import { MapPin } from 'lucide-react';
import profile from '../assets/profile.png';
import StarFull from '../assets/StarFull.png';
import StarEm from '../assets/StarEm.png';
import BackPage from '../assets/BackPage.png';
import NextPage from '../assets/NextPage.png';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/reduxHooks';
import { openLoginModal } from '@/store/slices/modalSlice';
import * as S from '../styles/review/ReviewPage.style';
import { createShortReview, getShortReviewList, getPlaceDetail } from '@/api/review/short-review';
import { ShortReviewRequest, ShortReviewItem } from '@/types/review/short-review';
import { useNavigate, useParams } from 'react-router-dom';
import { savePlace } from '@/api/review/SavePlace';
import { SavePlaceRequest } from '@/types/review/SavePlace';

const ReviewPage4 = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { placeId } = useParams<{ placeId: string }>();
  const navigate = useNavigate();

  // 상태 변수들
  const [currentPage, setCurrentPage] = useState(1);
  const [reviews, setReviews] = useState<ShortReviewItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [placeName, setPlaceName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingPlace, setIsSavingPlace] = useState(false);

  // 리뷰 입력 상태
  const [reviewText, setReviewText] = useState('');
  const [inputRating, setInputRating] = useState(0);

  // 리뷰 목록 불러오기
  useEffect(() => {
    const fetchReviews = async () => {
      if (!placeId) {
        console.error('No placeId available');
        window.confirm('장소 정보를 찾을 수 없습니다.');
        navigate('/places');
        return;
      }

      try {
        // 장소 정보 불러오기
        const placeResponse = await getPlaceDetail(Number(placeId));
        if (placeResponse.isSuccess) {
          setPlaceName(placeResponse.result.name);
        }

        // 리뷰 목록 불러오기
        const reviewResponse = await getShortReviewList(Number(placeId), currentPage - 1);
        if (reviewResponse.isSuccess) {
          setReviews(reviewResponse.result.shortReviews);
          setTotalPages(reviewResponse.result.totalPages);
        }
      } catch (error) {
        console.error('Failed to load reviews:', error);
        window.confirm('리뷰를 불러오는 데 실패했습니다.');
      }
    };

    fetchReviews();
  }, [placeId, currentPage, navigate]);

  // 리뷰 추가 핸들러
  const handleReviewSubmit = async () => {
    if (!placeId || !isLoggedIn) return;

    setIsSubmitting(true);

    try {
      const requestData: ShortReviewRequest = {
        placeAnimationId: 2, // TODO: 실제 애니메이션 ID로 변경
        rating: inputRating,
        content: reviewText.trim(),
      };

      const result = await createShortReview(Number(placeId), requestData);

      if (result.isSuccess) {
        // 리뷰 목록 다시 불러오기
        const reviewResponse = await getShortReviewList(Number(placeId), 0);
        if (reviewResponse.isSuccess) {
          setReviews(reviewResponse.result.shortReviews);
          setTotalPages(reviewResponse.result.totalPages);
          setCurrentPage(1);
        }

        // 입력 필드 초기화
        setReviewText('');
        setInputRating(0);
        window.confirm('리뷰가 등록되었습니다!');
      }
    } catch (error) {
      console.error('Error:', error);
      window.confirm('리뷰 등록 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 페이지네이션 핸들러
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // 장소 저장 핸들러
  const handleSavePlace = async () => {
    if (!isLoggedIn) {
      dispatch(openLoginModal());
      return;
    }

    if (!placeId) {
      window.confirm('장소 정보를 찾을 수 없습니다.');
      return;
    }

    try {
      const saveData: SavePlaceRequest = {
        animationId: 2, // 현재 선택된 애니메이션 ID
      };

      const response = await savePlace(Number(placeId), saveData);

      if (response.isSuccess) {
        window.confirm('명소가 저장되었습니다!');
      }
    } catch (error) {
      console.error('Error saving place:', error);
      window.confirm('명소 저장에 실패했습니다.');
    } finally {
      setIsSavingPlace(false);
    }
  };

  return (
    <S.Container>
      <S.ContentWrapper>
        <S.LocationBar>
          <S.LocationInput>
            <MapPin size={20} color="#0c004b" />
            <S.LocationText value={placeName} readOnly />
          </S.LocationInput>
          <S.SaveLocationButton
            onClick={handleSavePlace}
            disabled={isSavingPlace}
            style={{
              opacity: isSavingPlace ? 0.5 : 1,
              cursor: isSavingPlace ? 'not-allowed' : 'pointer',
            }}
          >
            {isSavingPlace ? '저장 중...' : '명소 저장하기'}
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
              <S.ProfileImage src={profile} alt="프로필 이미지" />
              <S.ProfileInfo>
                <S.ProfileName>닉네임</S.ProfileName>

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
                onClick={() => !isLoggedIn && dispatch(openLoginModal())}
                readOnly={!isLoggedIn}
                style={{
                  backgroundColor: !isLoggedIn ? '#f5f5f5' : 'white',
                  cursor: !isLoggedIn ? 'pointer' : 'text',
                  color: !isLoggedIn ? '#666' : '#000',
                }}
              />
              <S.SubmitButton
                onClick={handleReviewSubmit}
                disabled={!isLoggedIn || isSubmitting || !reviewText.trim() || inputRating === 0}
                style={{
                  opacity:
                    !isLoggedIn || isSubmitting || !reviewText.trim() || inputRating === 0
                      ? 0.5
                      : 1,
                  cursor:
                    !isLoggedIn || isSubmitting || !reviewText.trim() || inputRating === 0
                      ? 'not-allowed'
                      : 'pointer',
                }}
              >
                {isSubmitting ? '등록 중...' : '등록하기'}
              </S.SubmitButton>
            </div>
          </S.FeedbackSection>

          <S.ReviewGrid4>
            {reviews.map((review) => (
              <S.ReviewItem4 key={review.id}>
                <S.ReviewProfileContainer>
                  <S.ReviewProfileImage
                    src={profile} // 기본 프로필 이미지로 고정
                    alt="프로필 이미지"
                  />
                  <S.ReviewProfileInfo>
                    <S.ReviewProfileName>{review.user.nickname}</S.ReviewProfileName>
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
                  </S.ReviewProfileInfo>
                </S.ReviewProfileContainer>

                <S.ReviewContent4>{review.content}</S.ReviewContent4>

                <S.FeedbackButtonsWrapper>
                  <S.FeedbackButton>
                    <S.IconContainer>
                      <ThumbsUp size={20} color="#0c004b" />
                      <span>{review.likes}</span>
                    </S.IconContainer>
                  </S.FeedbackButton>
                  <S.FeedbackButton>
                    <S.IconContainer>
                      <ThumbsDown size={20} color="#0c004b" />
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
