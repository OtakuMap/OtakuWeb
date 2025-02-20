import { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, ExternalLink } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import MapContainer from '@/components/map/MapContainer';
import { saveEvent } from '@/api/event/SaveEvent';
import { EventReview } from '@/types/event/review';
import { getEventReviews } from '@/api/event/review';
import { EventShortReview } from '@/types/event/short-review';
import { getEventShortReviews } from '@/api/event/short-review';
import { useEventDetails, useReviews, useReviewSubmission } from '@/hooks/event/useEventPage';
import * as S from '../styles/event/EventPage2.styles';

// Assets
import dividerLine from '../assets/dividerLine.png';
import BackPage from '../assets/BackPage.png';
import NextPage from '../assets/NextPage.png';
import StarFull from '../assets/StarFull.png';
import StarEm from '../assets/StarEm.png';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/reduxHooks';
import { openLoginModal } from '@/store/slices/modalSlice';
// 상단에 import 추가
import { getUserProfile } from '@/api/review/user';
import { UserProfile } from '@/types/review/user';

const EventPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { eventId: urlEventId } = useParams<{ eventId: string }>();
  const eventId = Number(urlEventId) || 1;
  const [currentPage, setCurrentPage] = useState(1);
  const REVIEWS_PER_PAGE = 4;
  const [activeTab, setActiveTab] = useState('기본정보');
  const [isSaving, setIsSaving] = useState(false);
  const [eventReviews, setEventReviews] = useState<EventReview[]>([]);
  const [reviewsTotalPages, setReviewsTotalPages] = useState(1);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [shortReviews, setShortReviews] = useState<EventShortReview[]>([]);
  const [shortReviewsLoading, setShortReviewsLoading] = useState(false);
  const [shortReviewsError, setShortReviewsError] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // 사용자 프로필 정보 불러오기
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!isLoggedIn) return;

      try {
        const response = await getUserProfile();
        if (response.isSuccess) {
          setUserProfile(response.result);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [isLoggedIn]);

  // Custom hooks 사용
  const { eventDetails, loading, error } = useEventDetails(eventId);
  const {
    setReviews,
    editingId,
    editText,
    editRating,
    setEditText,
    setEditRating,
    handleEditStart,
    handleEditCancel,
    handleEditComplete,
    handleDelete,
    handleLike,
    handleDislike,
  } = useReviews([]);

  const {
    reviewText,
    setReviewText,
    inputRating,
    setInputRating,
    submitError,
    handleReviewSubmit: originalHandleReviewSubmit,
  } = useReviewSubmission(eventId, setReviews);

  // 후기 게시물 불러오는 useEffect 추가
  useEffect(() => {
    const fetchEventReviews = async () => {
      if (!eventId) return;

      setReviewsLoading(true);
      setReviewsError(null);

      try {
        const response = await getEventReviews(eventId, currentPage - 1); // API는 0부터 시작하므로 currentPage - 1

        if (response.isSuccess) {
          setEventReviews(response.result.eventReviews);
          setReviewsTotalPages(response.result.totalPages);
        } else {
          setReviewsError(response.message);
        }
      } catch (error) {
        console.error('Error fetching event reviews:', error);
        setReviewsError('후기 게시물을 불러오는데 실패했습니다.');
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchEventReviews();
  }, [eventId, currentPage]);

  //한줄후기 조회하는 API 추가
  useEffect(() => {
    const fetchShortReviews = async () => {
      if (!eventId) return;

      setShortReviewsLoading(true);
      setShortReviewsError(null);

      try {
        const response = await getEventShortReviews(eventId, currentPage - 1); // 첫 페이지로 고정

        if (response.isSuccess) {
          // 새로 등록된 리뷰를 포함하여 리스트 업데이트
          setShortReviews(response.result.eventShortReviewList);
        } else {
          setShortReviewsError(response.message);
        }
      } catch (error) {
        console.error('Error fetching short reviews:', error);
        setShortReviewsError('한줄 후기를 불러오는데 실패했습니다.');
      } finally {
        setShortReviewsLoading(false);
      }
    };

    fetchShortReviews();
  }, [eventId, currentPage]); // shortReviews.length 추가로 리뷰 등록 시 자동 새로고침

  const paginatedShortReviews = shortReviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE,
  );

  // Handle opening the official site
  const handleOpenOfficialSite = () => {
    if (eventDetails && eventDetails.site) {
      window.open(eventDetails.site, '_blank', 'noopener,noreferrer');
    }
  };

  const handleTextAreaClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      e.stopPropagation();
      dispatch(openLoginModal());
    }
  };

  const handleReviewButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      dispatch(openLoginModal());
      return;
    }
    handleReviewSubmit();
  };

  const handleReviewSubmit = async () => {
    try {
      const response = await originalHandleReviewSubmit();

      // 리뷰 제출 성공 시
      if (response && response.isSuccess) {
        // 새로 등록된 리뷰 객체 생성 (타입 단언 사용)
        const newReview: EventShortReview = {
          id: response.result.id,
          content: reviewText,
          rating: inputRating,
          username: userProfile?.nickname || '',
          profileImage: {
            fileUrl: userProfile?.profileImageUrl || '',
          },
          likes: 0,
          dislikes: 0,
          userVote: null,
        } as EventShortReview;

        // 기존 리뷰 목록 앞에 새 리뷰 추가
        setShortReviews((prevReviews: EventShortReview[]) => [newReview, ...prevReviews]);

        // 입력 필드 초기화
        setReviewText('');
        setInputRating(0);
      }
    } catch (error) {
      console.error('리뷰 제출 중 오류:', error);
    }
  };

  const handleSaveEvent = async () => {
    if (!isLoggedIn) {
      dispatch(openLoginModal());
      return;
    }

    if (isSaving) return;

    try {
      setIsSaving(true);
      const response = await saveEvent(eventId);
      if (response.isSuccess) {
        // You can add a success toast notification here if needed
        navigate('/saved-events');
      } else {
        // Handle error case
        console.error('Failed to save event:', response.message);
      }
    } catch (error) {
      console.error('Error saving event:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error || !eventDetails) {
    return <div>이벤트 정보를 불러올 수 없습니다.</div>;
  }

  // API 응답이 없을 경우 임시 데이터 사용
  const displayData = {
    title: eventDetails.title,
    titleJp: eventDetails.name,
    subtitle: eventDetails.animationName,
    image: eventDetails.thumbnailImage.fileUrl,
    backimage: eventDetails.backgroundImage.fileUrl,
    date: {
      start: eventDetails.startDate,
      end: eventDetails.endDate,
    },
    location: {
      id: eventDetails.eventLocation.id,
      name: eventDetails.eventLocation.name,
      coordinates: {
        lat: Number(eventDetails.eventLocation.latitude),
        lng: Number(eventDetails.eventLocation.longitude),
      },
      isSelected: false,
      animeName: eventDetails.animationName,
      address: eventDetails.eventLocation.name,
      hashtags: ['팝업스토어'],
    },
    productImage: eventDetails.goodsImage.fileUrl,
  };

  // 페이지네이션 핸들러 추가
  // const handlePrevPage = () => {
  //   setCurrentPage((prev) => Math.max(prev - 1, 1));
  // };

  // const handleNextPage = () => {
  //   setCurrentPage((prev) => Math.min(prev + 1, reviewsTotalPages));
  // };

  const totalPages = Math.max(
    Math.ceil(shortReviews.length / REVIEWS_PER_PAGE),
    Math.ceil(eventReviews.length / REVIEWS_PER_PAGE),
  );

  return (
    <S.Container>
      <S.Content>
        <S.EventHeader imageUrl={displayData.backimage}>
          <S.EventHeaderInner>
            <S.EventImage src={displayData.image} alt={displayData.title} />
            <S.EventInfo>
              <S.EventTitle>{displayData.title}</S.EventTitle>
              <S.EventSubtitle>{displayData.subtitle}</S.EventSubtitle>
              <S.SaveButton onClick={handleSaveEvent} disabled={isSaving}>
                {isSaving ? '저장 중...' : '이벤트 저장하기'}
              </S.SaveButton>
            </S.EventInfo>
          </S.EventHeaderInner>
        </S.EventHeader>

        <S.TabWrapper>
          <S.TabInner>
            {['기본정보', '후기', '공식 사이트'].map((tab) => (
              <S.Tab
                key={tab}
                isActive={activeTab === tab}
                onClick={() => {
                  if (tab === '공식 사이트') {
                    handleOpenOfficialSite();
                  } else {
                    setActiveTab(tab);
                  }
                }}
              >
                {tab}
                {tab === '공식 사이트' && eventDetails?.site && (
                  <ExternalLink size={16} style={{ marginLeft: '5px' }} color="#0c004b" />
                )}
              </S.Tab>
            ))}
          </S.TabInner>
        </S.TabWrapper>

        {activeTab === '기본정보' && (
          <S.EventInfoSection>
            <S.Section>
              <S.SectionTitle>이벤트 이름</S.SectionTitle>
              <S.SectionText>{displayData.titleJp}</S.SectionText>
            </S.Section>

            <S.Section>
              <S.SectionTitle>일자</S.SectionTitle>
              <S.SectionText>
                {displayData.date.start} - {displayData.date.end}
              </S.SectionText>
            </S.Section>

            <S.Section>
              <S.SectionTitle>위치</S.SectionTitle>
              <S.SectionText>{displayData.location.name}</S.SectionText>
              <S.MapWrapper>
                <MapContainer
                  apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                  center={displayData.location.coordinates}
                  zoom={17}
                  locations={[
                    {
                      id: displayData.location.id,
                      latitude: displayData.location.coordinates.lat,
                      longitude: displayData.location.coordinates.lng,
                      name: displayData.location.name,
                      isSelected: false,
                      animeName: displayData.location.animeName,
                      address: displayData.location.address,
                      hashtags: displayData.location.hashtags,
                    },
                  ]}
                />
              </S.MapWrapper>
            </S.Section>

            <S.Section>
              <S.SectionTitle>판매제품</S.SectionTitle>
              <S.ProductContainer>
                <S.ProductImage src={displayData.productImage} alt="판매제품 목록" />
              </S.ProductContainer>
            </S.Section>
          </S.EventInfoSection>
        )}

        {activeTab === '후기' && (
          <S.ReviewSection>
            <S.ReviewInput>
              <S.InputHeader>
                <S.ProfileSection>
                  <S.Profileimg src={userProfile?.profileImageUrl || ''} alt="프로필" />
                  <S.ProfileName>{userProfile?.nickname || ''}</S.ProfileName>
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
                </S.ProfileSection>
                <S.InputSection>
                  <S.TextArea
                    placeholder={isLoggedIn ? '한 줄 후기를 남겨주세요!' : '로그인이 필요합니다.'}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    onClick={handleTextAreaClick}
                    isNotLoggedIn={!isLoggedIn}
                  />
                  <S.ReviewButton onClick={handleReviewButtonClick} isNotLoggedIn={!isLoggedIn}>
                    등록하기
                  </S.ReviewButton>
                  {submitError && <S.ErrorMessage>{submitError}</S.ErrorMessage>}
                </S.InputSection>
              </S.InputHeader>
            </S.ReviewInput>
            <S.ReviewCount>
              한 줄 리뷰 ({shortReviews.length}){shortReviewsLoading && <span> 로딩중...</span>}
              {shortReviewsError && <span style={{ color: 'red' }}> {shortReviewsError}</span>}
              <span>
                평균 평점:{' '}
                {shortReviews.length > 0
                  ? (
                      shortReviews.reduce((acc, review) => acc + review.rating, 0) /
                      shortReviews.length
                    ).toFixed(1)
                  : '0.0'}
              </span>
            </S.ReviewCount>
            <S.ReviewList>
              {paginatedShortReviews.map((review) => (
                <S.ReviewCard
                  key={review.id}
                  $isMyReview={review.username === userProfile?.nickname} // $isMyReview prop은 필수이므로 기본값 제공
                >
                  <S.ReviewHeader>
                    <S.Avatar src={review.profileImage.fileUrl} alt="프로필" />
                    <S.UserInfo>
                      <S.UserName>{review.id}</S.UserName>
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
                    </S.UserInfo>
                  </S.ReviewHeader>

                  {editingId === review.id ? (
                    <S.InlineEditTextArea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      autoFocus
                    />
                  ) : (
                    <S.ReviewContent>{review.content}</S.ReviewContent>
                  )}

                  {review.username === userProfile?.nickname && (
                    <S.EditDeleteButtons>
                      {editingId === review.id ? (
                        <>
                          <S.ActionButton onClick={() => handleEditComplete(review.id)}>
                            완료
                          </S.ActionButton>
                          <img src={dividerLine} alt="divider" className="h-4 mx-1" />
                          <S.ActionButton onClick={handleEditCancel}>취소</S.ActionButton>
                        </>
                      ) : (
                        <>
                          <S.ActionButton onClick={() => handleEditStart(review)}>
                            수정
                          </S.ActionButton>
                          <img src={dividerLine} alt="divider" className="h-4 mx-1" />
                          <S.ActionButton onClick={() => handleDelete(review.id)}>
                            삭제
                          </S.ActionButton>
                        </>
                      )}
                    </S.EditDeleteButtons>
                  )}

                  <S.FeedbackButtons>
                    <S.IconButton onClick={() => handleLike(review.id)}>
                      <ThumbsUp
                        size={20}
                        color={review.userVote === 'like' ? '#ffd700' : '#0c004b'}
                      />
                      <span>{review.likes}</span>
                    </S.IconButton>
                    <S.IconButton onClick={() => handleDislike(review.id)}>
                      <ThumbsDown
                        size={20}
                        color={review.userVote === 'dislike' ? '#ffd700' : '#0c004b'}
                      />
                      <span>{review.dislikes}</span>
                    </S.IconButton>
                  </S.FeedbackButtons>
                </S.ReviewCard>
              ))}
            </S.ReviewList>
            <S.ReviewCount>
              후기 게시물 ({eventReviews.length}){reviewsLoading && <span> 로딩중...</span>}
              {reviewsError && <span style={{ color: 'red' }}> {reviewsError}</span>}
            </S.ReviewCount>
            <S.PostGrid>
              {eventReviews
                .slice((currentPage - 1) * REVIEWS_PER_PAGE, currentPage * REVIEWS_PER_PAGE)
                .map((review) => (
                  <S.PostCard
                    key={review.id}
                    onClick={() => navigate(`/review/${review.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <S.PostImage src={review.reviewPhotoUrl.fileUrl} alt={review.title} />
                    <S.PostTitle>{review.title}</S.PostTitle>
                  </S.PostCard>
                ))}
            </S.PostGrid>
            <S.Pagination>
              <S.PaginationButton
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <img src={BackPage} alt="이전 페이지" />
              </S.PaginationButton>
              {currentPage}/{totalPages}
              <S.PaginationButton
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <img src={NextPage} alt="다음 페이지" />
              </S.PaginationButton>
            </S.Pagination>
          </S.ReviewSection>
        )}
      </S.Content>
    </S.Container>
  );
};

export default EventPage;
