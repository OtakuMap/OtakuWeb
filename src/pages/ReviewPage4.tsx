// ReviewPage4.tsx
import { MapPin, ThumbsUp, ThumbsDown } from 'lucide-react';
import profile from '../assets/profile.png';
import StarFull from '../assets/StarFull.png';
import StarEm from '../assets/StarEm.png';
import BackPage from '../assets/BackPage.png';
import NextPage from '../assets/NextPage.png';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useAppSelector } from '@/hooks/reduxHooks';
import { openLoginModal } from '@/store/slices/modalSlice';
import * as S from '../styles/review/ReviewPage.style';
import { tokenStorage } from '@/utils/token';
import {
  createShortReview,
  getShortReviewList,
  getPlaceDetail,
  deleteShortReview,
  updateShortReview,
} from '@/api/review/short-review';
import { ShortReviewRequest, ShortReviewItem } from '@/types/review/short-review';
import { useParams, useLocation } from 'react-router-dom';
import { savePlace } from '@/api/review/SavePlace';
import { SavePlaceRequest } from '@/types/review/SavePlace';
import { addShortReviewReaction } from '@/api/review/short-review-reaction';

const ReviewPage4 = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  // const userId = useAppSelector((state) => state.auth.userId);
  const userId = useAppSelector((state) => {
    const id = state.auth.userId;
    return id && id !== 'undefined' ? id : null;
  });
  // 현재 사용자 프로필 정보 가져오기
  const userProfile = useAppSelector((state) => state.user.profile);
  const { placeId } = useParams<{ placeId: string }>();
  const selectedAnimation = location.state?.selectedAnimation;

  // 상태 변수들
  const [currentPage, setCurrentPage] = useState(1);
  const [reviews, setReviews] = useState<ShortReviewItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [placeName, setPlaceName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingPlace, setIsSavingPlace] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [inputRating, setInputRating] = useState(0);
  const [editText, setEditText] = useState('');
  const [editRating, setEditRating] = useState(0);

  // 데이터 로드 함수
  // const loadData = useCallback(async () => {
  //   if (!placeId) return;

  //   try {
  //     // 토큰 체크를 loadData 시작할 때가 아닌, API 호출 직전에 수행
  //     const placeResponse = await getPlaceDetail(Number(placeId));
  //     console.log('Place Response:', placeResponse);

  //     if (placeResponse.isSuccess) {
  //       setPlaceName(placeResponse.result.name);
  //     }

  //     // 토큰이 필요한 API 호출 전에 토큰 체크
  //     const token = tokenStorage.getAccessToken();
  //     if (!token && !isLoggedIn) {
  //       console.log('Token check failed');
  //       return; // 토큰이 없을 때는 리뷰 목록을 가져오지 않음
  //     }

  //     const reviewResponse = await getShortReviewList(Number(placeId), currentPage - 1);
  //     console.log('Review Response:', reviewResponse);

  //     if (reviewResponse.isSuccess) {
  //       setReviews(reviewResponse.result.shortReviews);
  //       setTotalPages(reviewResponse.result.totalPages);
  //     }
  //   } catch (error) {
  //     console.error('LoadData Error:', error);

  //     if (axios.isAxiosError(error)) {
  //       // 401 에러일 때 무조건 로그인 모달을 띄우지 않고,
  //       // 실제로 로그인이 되어있지 않을 때만 모달 표시
  //       if (error.response?.status === 401 && !isLoggedIn) {
  //         dispatch(openLoginModal());
  //       }
  //     }
  //   }
  // }, [placeId, currentPage, dispatch, isLoggedIn]);
  const loadData = useCallback(async () => {
    if (!placeId) return;

    try {
      // 직접 short-review API 호출
      const reviewResponse = await getShortReviewList(Number(placeId), currentPage - 1);

      if (reviewResponse.isSuccess) {
        setPlaceName(reviewResponse.result.placeName); // API 응답에서 장소 이름을 가져옴
        setReviews(reviewResponse.result.shortReviews);
        setTotalPages(reviewResponse.result.totalPages);
      }
    } catch (error) {
      console.error('LoadData Error:', error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          dispatch(openLoginModal());
        }
      }
    }
  }, [placeId, currentPage, dispatch]);

  // useEffect 수정
  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    console.log('Current user profile:', {
      userProfile,
      profileImageUrl: userProfile?.profileImageUrl,
      fallbackImage: profile,
    });
  }, [userProfile]);

  // 페이지네이션 핸들러
  const handlePrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  // 리뷰 수정/삭제 핸들러
  const handleEditClick = useCallback((review: ShortReviewItem) => {
    setEditingReviewId(review.id);
    setEditText(review.content);
    setEditRating(review.rating);
  }, []);

  const handleEditCancel = useCallback(() => {
    setEditingReviewId(null);
    setEditText('');
    setEditRating(0);
  }, []);

  const handleDeleteReview = useCallback(
    async (reviewId: number) => {
      if (!window.confirm('정말로 이 리뷰를 삭제하시겠습니까?')) return;

      const token = tokenStorage.getAccessToken();
      if (!token) {
        dispatch(openLoginModal());
        return;
      }

      try {
        const result = await deleteShortReview(reviewId);
        if (result.isSuccess) {
          await loadData();
          window.confirm('리뷰가 삭제되었습니다.');
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            dispatch(openLoginModal());
          } else {
            window.confirm('리뷰 삭제 중 오류가 발생했습니다.');
          }
        }
      }
    },
    [dispatch, loadData],
  );

  // 리뷰 수정 제출 핸들러
  const handleEditSubmit = useCallback(
    async (reviewId: number) => {
      const token = tokenStorage.getAccessToken();
      if (!token) {
        dispatch(openLoginModal());
        return;
      }

      try {
        const result = await updateShortReview(reviewId, {
          rating: editRating,
          content: editText.trim(),
        });

        if (result.isSuccess) {
          await loadData();
          setEditingReviewId(null);
          window.confirm('리뷰가 수정되었습니다!');
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            dispatch(openLoginModal());
          } else {
            window.confirm('리뷰 수정 중 오류가 발생했습니다.');
          }
        }
      }
    },
    [editRating, editText, dispatch, loadData],
  );

  // 장소 저장 핸들러
  const handleSavePlace = useCallback(async () => {
    if (!isLoggedIn || !placeId) {
      dispatch(openLoginModal());
      return;
    }

    const token = tokenStorage.getAccessToken();
    if (!token) {
      dispatch(openLoginModal());
      return;
    }

    setIsSavingPlace(true);

    try {
      const saveData: SavePlaceRequest = {
        animationId: selectedAnimation?.animationId || 1,
      };

      const response = await savePlace(Number(placeId), saveData);

      if (response.isSuccess) {
        window.confirm('명소가 저장되었습니다!');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          dispatch(openLoginModal());
        } else {
          window.confirm('명소 저장에 실패했습니다.');
        }
      }
    } finally {
      setIsSavingPlace(false);
    }
  }, [isLoggedIn, placeId, selectedAnimation, dispatch]);

  // 리뷰 제출 핸들러
  const handleReviewSubmit = useCallback(async () => {
    if (!placeId || !isLoggedIn) return;

    const token = tokenStorage.getAccessToken();
    if (!token) {
      dispatch(openLoginModal());
      return;
    }

    setIsSubmitting(true);

    try {
      const requestData: ShortReviewRequest = {
        placeAnimationId: selectedAnimation?.placeAnimationId || 1,
        rating: inputRating,
        content: reviewText.trim(),
      };

      const result = await createShortReview(Number(placeId), requestData);

      if (result.isSuccess) {
        await loadData();
        setReviewText('');
        setInputRating(0);
        setCurrentPage(1);
        window.confirm('리뷰가 등록되었습니다!');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          dispatch(openLoginModal());
        } else {
          window.confirm('리뷰 등록 중 오류가 발생했습니다.');
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [placeId, isLoggedIn, selectedAnimation, inputRating, reviewText, dispatch, loadData]);

  // 리액션 핸들러
  const handleReaction = useCallback(
    async (reviewId: number, reactionType: 0 | 1) => {
      if (!isLoggedIn || !placeId) {
        dispatch(openLoginModal());
        return;
      }

      const token = tokenStorage.getAccessToken();
      if (!token) {
        dispatch(openLoginModal());
        return;
      }

      try {
        const response = await addShortReviewReaction(Number(placeId), reviewId, reactionType);
        if (response.isSuccess) {
          await loadData();
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            dispatch(openLoginModal());
          } else {
            window.confirm('반응 등록 중 오류가 발생했습니다.');
          }
        }
      }
    },
    [isLoggedIn, placeId, dispatch, loadData],
  );

  // 리뷰 아이템 렌더링
  const renderReviewItem = useCallback(
    (review: ShortReviewItem) => {
      const isEditing = editingReviewId === review.id;
      // const isOwner = userId !== null && Number(userId) === review.user.id;
      // userId가 존재할 때만 Number로 변환하여 비교
      const isOwner = userId !== null && review.user.userId === Number(userId);

      // 프로필 이미지가 없는 경우 기본 이미지를 사용
      const profileImageSrc = review.user.profileImage || profile;

      console.log('Review ownership check:', {
        currentUserId: userId,
        reviewUserId: review.user.userId,
        isOwner,
        userIdType: typeof userId,
        review,
      });

      if (isEditing) {
        return (
          <S.ReviewItem4 key={review.id}>
            <S.ReviewProfileContainer>
              <S.ReviewProfileImage src={profileImageSrc} alt="프로필 이미지" />
              <S.ReviewProfileInfo>
                <S.ReviewProfileName>{review.user.nickname}</S.ReviewProfileName>
                <S.ReviewStarRating>
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
                </S.ReviewStarRating>
              </S.ReviewProfileInfo>
            </S.ReviewProfileContainer>
            <S.InlineEditTextArea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              placeholder="리뷰를 수정하세요"
            />
            <S.EditDeleteButtons>
              <S.ActionButton onClick={() => handleEditSubmit(review.id)}>
                수정 완료 |
              </S.ActionButton>
              <S.ActionButton onClick={handleEditCancel}> 취소</S.ActionButton>
            </S.EditDeleteButtons>
            <S.FeedbackButtonsWrapper>
              <S.FeedbackButton
                onClick={() => handleReaction(review.id, 1)}
                style={{
                  backgroundColor: review.isLiked ? '#e0e0e0' : 'transparent',
                }}
              >
                <S.IconContainer>
                  <ThumbsUp size={20} color="#0c004b" />
                  <span>{review.likes}</span>
                </S.IconContainer>
              </S.FeedbackButton>
              <S.FeedbackButton
                onClick={() => handleReaction(review.id, 0)}
                style={{
                  backgroundColor: review.isDisliked ? '#e0e0e0' : 'transparent',
                }}
              >
                <S.IconContainer>
                  <ThumbsDown size={20} color="#0c004b" />
                  <span>{review.dislikes}</span>
                </S.IconContainer>
              </S.FeedbackButton>
            </S.FeedbackButtonsWrapper>
          </S.ReviewItem4>
        );
      }

      return (
        <S.ReviewItem4 key={review.id}>
          <S.ReviewProfileContainer>
            <S.ReviewProfileImage
              src={review.user.profileImage || profile}
              alt="프로필 이미지"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.src = profile;
              }}
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
          {isOwner && (
            <S.EditDeleteButtons>
              <S.ActionButton onClick={() => handleEditClick(review)}>수정 |</S.ActionButton>
              <S.ActionButton onClick={() => handleDeleteReview(review.id)}> 삭제</S.ActionButton>
            </S.EditDeleteButtons>
          )}
          <S.FeedbackButtonsWrapper>
            <S.FeedbackButton
              onClick={() => handleReaction(review.id, 1)}
              style={{
                backgroundColor: review.isLiked ? '#e0e0e0' : 'transparent',
              }}
            >
              <S.IconContainer>
                <ThumbsUp size={20} color="#0c004b" />
                <span>{review.likes}</span>
              </S.IconContainer>
            </S.FeedbackButton>
            <S.FeedbackButton
              onClick={() => handleReaction(review.id, 0)}
              style={{
                backgroundColor: review.isDisliked ? '#e0e0e0' : 'transparent',
              }}
            >
              <S.IconContainer>
                <ThumbsDown size={20} color="#0c004b" />
                <span>{review.dislikes}</span>
              </S.IconContainer>
            </S.FeedbackButton>
          </S.FeedbackButtonsWrapper>
        </S.ReviewItem4>
      );
    },
    [
      editingReviewId,
      userId,
      editRating,
      editText,
      handleEditSubmit,
      handleEditCancel,
      handleReaction,
      handleEditClick,
      handleDeleteReview,
    ],
  );

  return (
    <S.Container>
      <S.ContentWrapper>
        <S.LocationBar>
          <S.LocationInput>
            <MapPin size={20} color="#0c004b" />
            <S.LocationText value={placeName} readOnly />
          </S.LocationInput>
          <S.SaveLocationButton onClick={handleSavePlace} disabled={isSavingPlace}>
            {isSavingPlace ? '저장 중...' : '명소 저장하기'}
          </S.SaveLocationButton>
        </S.LocationBar>

        <S.WhiteContainer4>
          <S.FeedbackSection>
            <S.ProfileContainer>
              <S.ProfileImage
                src={userProfile?.profileImageUrl ? userProfile.profileImageUrl : profile}
                alt="프로필 이미지"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  e.currentTarget.src = profile;
                }}
              />
              <S.ProfileInfo>
                <S.ProfileName>{userProfile?.nickname || '닉네임'}</S.ProfileName>
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

          {/* 리뷰 목록 */}
          <S.ReviewGrid4>{reviews.map(renderReviewItem)}</S.ReviewGrid4>
        </S.WhiteContainer4>

        {/* 페이지네이션 */}
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
