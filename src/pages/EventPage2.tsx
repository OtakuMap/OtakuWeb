import { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import MapContainer from '@/components/map/MapContainer';
import { getEventDetails } from '@/api/event/details';
import { EventDetails } from '@/types/event/details';
import { createShortReview } from '@/api/event/short-review';
import * as S from '../styles/event/EventPage2.styles';

// Assets
import dividerLine from '../assets/dividerLine.png';
import StarFull from '../assets/StarFull.png';
import StarEm from '../assets/StarEm.png';
import profile from '../assets/profile.png';
import profile3 from '../assets/profile3.png';
import review from '../assets/reviewData.png';
import backimage from '../assets/backimage.png';
import product from '../assets/product.png';
import eventImage from '../assets/eventImg.png'; // 이 줄 추가

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

// 임시 데이터는 API 연동 전까지 유지
const tempEventData = {
  title: '다이아몬드 에이스 ACT2 팝업스토어',
  titleJp: 'ダイヤのA act II」POP UP SHOP in AMNIBUS STORE',
  subtitle: '다이아몬드 에이스 ACT2',
  image: eventImage, // 추가
  backimage: backimage, // 추가
  date: {
    start: '2024년 11월 22일',
    end: '2024년 12월 8일',
  },
  location: {
    id: 1,
    name: 'Tokyo AMNIBUS STORE(MAGNET by SHIBUYA109 5F)',
    coordinates: {
      lat: 35.659384,
      lng: 139.70355,
    },
    isSelected: false,
    animeName: '다이아몬드 에이스 ACT2',
    address: 'Tokyo AMNIBUS STORE(MAGNET by SHIBUYA109 5F)',
    hashtags: ['팝업스토어', '다이아몬드에이스'],
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
      '굿즈 물량이 엄청 많지는 않은데 사고싶었던 세이도져지를\n구매하게 되어서 완전 만족입니다!!!!',
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
      '굿즈 물량이 엄청 많지는 않은데 사고싶었던 세이도져지를\n구매하게 되어서 완전 만족입니다!!!!',
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
      '굿즈 물량이 엄청 많지는 않은데 사고싶었던 세이도져지를\n구매하게 되어서 완전 만족입니다!!!!',
  },
  {
    id: 4,
    profileImage: profile3,
    username: 'Ot11',
    rating: 3,
    maxRating: 4,
    likes: 10,
    dislikes: 0,
    content:
      '굿즈 물량이 엄청 많지는 않은데 사고싶었던 세이도져지를\n구매하게 되어서 완전 만족입니다!!!!',
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

const EventPage = () => {
  const navigate = useNavigate();
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [inputRating, setInputRating] = useState(0);
  const [editRating, setEditRating] = useState(0);
  const [activeTab, setActiveTab] = useState('기본정보');
  const [reviews, setReviews] = useState<Review[]>(
    reviewData.map((review) => ({
      ...review,
      userVote: null,
    })),
  );
  const { eventId: urlEventId } = useParams<{ eventId: string }>();
  // URL에서 eventId를 받되, 없으면 기본값 1 사용
  const eventId = Number(urlEventId) || 1;

  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleReviewSubmit = async () => {
    if (reviewText.trim() === '') {
      window.confirm('후기를 등록해주세요!');
      return;
    }
    if (inputRating === 0) {
      window.confirm('별점을 등록해주세요!');
      return;
    }

    try {
      setSubmitError(null);
      const reviewData = {
        userId: 1, // 현재 로그인한 사용자 ID
        rating: inputRating,
        content: reviewText,
      };

      const response = await createShortReview(eventId, reviewData);

      if (response.isSuccess) {
        const newReview: Review = {
          id: reviews.length + 1,
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
      } else {
        setSubmitError('리뷰 등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('Failed to submit review:', error);
      setSubmitError('리뷰 등록 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!eventId) {
        console.log('No eventId provided, using temporary data');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await getEventDetails(Number(eventId));
        if (response.isSuccess) {
          setEventDetails(response.result);
        }
      } catch (err) {
        console.error('Failed to fetch event details:', err);
        setError('이벤트 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const calculateAverageRating = (reviews: Review[]) => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
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

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // API 응답이 없을 경우 임시 데이터 사용
  const displayData = eventDetails
    ? {
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
      }
    : tempEventData;

  return (
    <S.Container>
      <S.Content>
        <S.EventHeader imageUrl={displayData.backimage}>
          <S.EventHeaderInner>
            <S.EventImage src={displayData.image} alt={displayData.title} />
            <S.EventInfo>
              <S.EventTitle>{displayData.title}</S.EventTitle>
              <S.EventSubtitle>{displayData.subtitle}</S.EventSubtitle>
              <S.SaveButton onClick={() => navigate('/saved-events')}>이벤트 저장하기</S.SaveButton>
            </S.EventInfo>
          </S.EventHeaderInner>
        </S.EventHeader>

        <S.TabWrapper>
          <S.TabInner>
            {['기본정보', '후기', '공식 사이트'].map((tab) => (
              <S.Tab key={tab} isActive={activeTab === tab} onClick={() => setActiveTab(tab)}>
                {tab}
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
                  <S.Profileimg src={profileData.profileImage} alt="프로필" />
                  <S.ProfileName>{profileData.name}</S.ProfileName>
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
                    placeholder="한 줄 후기를 남겨주세요!"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  />
                  <S.ReviewButton onClick={handleReviewSubmit}>등록하기</S.ReviewButton>
                  {submitError && <S.ErrorMessage>{submitError}</S.ErrorMessage>}
                </S.InputSection>
              </S.InputHeader>
            </S.ReviewInput>

            <S.ReviewCount>
              한 줄 리뷰 ({reviews.length})<span>평균 평점: {calculateAverageRating(reviews)}</span>
            </S.ReviewCount>

            <S.ReviewList>
              {reviews.map((review) => (
                <S.ReviewCard key={review.id} $isMyReview={review.username === profileData.name}>
                  <S.ReviewHeader>
                    <S.Avatar src={review.profileImage} alt="프로필" />
                    <S.UserInfo>
                      <S.UserName>{review.username}</S.UserName>
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

                  {review.username === profileData.name && (
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
            <S.ReviewCount>후기 게시물 (10)</S.ReviewCount>
            <S.PostGrid>
              {postData.map((post) => (
                <S.PostCard key={post.id}>
                  <S.PostImage src={post.image} alt={post.title} />
                  <S.PostTitle>{post.title}</S.PostTitle>
                </S.PostCard>
              ))}
            </S.PostGrid>
          </S.ReviewSection>
        )}
      </S.Content>
    </S.Container>
  );
};

export default EventPage;
