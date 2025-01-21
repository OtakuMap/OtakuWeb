import { useState } from 'react';
import styled from 'styled-components';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import MapContainer from '@/components/map/MapContainer';
import { RouteLocation } from '@/types/map/route';
import * as S from '../styles/event/EventPage2.styles';
import profile from '../assets/profile.png';
import profile3 from '../assets/profile3.png';
import eventImage from '../assets/eventImg.png';
import review from '../assets/reviewData.png';
import backimage from '../assets/backimage.png';
import product from '../assets/product.png';

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

// 기존의 eventData, profileData, postData는 그대로 유지
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
  const [reviewText, setReviewText] = useState('');

  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [activeTab, setActiveTab] = useState('후기');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [reviews, setReviews] = useState<Review[]>(reviewData);

  const calculateAverageRating = (reviews: Review[]) => {
    if (reviews.length === 0) return 0;

    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1); // 소수점 한 자리까지 표시
  };

  const handleReviewSubmit = () => {
    if (reviewText.trim() === '') return;

    if (editingReview) {
      // null 체크만으로 충분합니다
      setReviews(
        reviews.map((review) =>
          review.id === editingReview.id ? { ...review, content: reviewText } : review,
        ),
      );
      setEditingReview(null);
    } else {
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
    }
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
    <S.Container>
      <S.Content>
        <S.EventHeader imageUrl={eventData.backimage}>
          <S.EventImage src={eventImage} alt={eventData.title} />
          <S.EventInfo>
            <S.EventTitle>{eventData.title}</S.EventTitle>
            <S.EventSubtitle>{eventData.subtitle}</S.EventSubtitle>
            <S.SaveButton>이벤트 저장하기</S.SaveButton>
          </S.EventInfo>
        </S.EventHeader>

        <S.TabNav>
          {['기본정보', '후기', '공식 사이트'].map((tab) => (
            <S.Tab key={tab} isActive={activeTab === tab} onClick={() => setActiveTab(tab)}>
              {tab}
            </S.Tab>
          ))}
        </S.TabNav>

        {activeTab === '기본정보' && (
          <S.EventInfoSection>
            <S.Section>
              <S.SectionTitle>이벤트 이름</S.SectionTitle>
              <S.SectionText>{eventData.titleJp}</S.SectionText>
            </S.Section>

            <S.Section>
              <S.SectionTitle>일자</S.SectionTitle>
              <S.SectionText>
                {eventData.date.start} - {eventData.date.end}
              </S.SectionText>
            </S.Section>

            <S.Section>
              <S.SectionTitle>위치</S.SectionTitle>
              <S.SectionText>{eventData.location.name}</S.SectionText>
              <S.MapWrapper>
                <MapContainer
                  apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                  center={eventData.location.coordinates}
                  zoom={17}
                  locations={[
                    {
                      id: 1,
                      latitude: eventData.location.coordinates.lat,
                      longitude: eventData.location.coordinates.lng,
                      name: eventData.location.name,
                      isSelected: false,
                      animeName: '다이아몬드 에이스 ACT2',
                      address: 'Tokyo AMNIBUS STORE(MAGNET by SHIBUYA109 5F)',
                      hashtags: ['팝업스토어', '다이아몬드에이스'],
                    },
                  ]}
                />
              </S.MapWrapper>
            </S.Section>

            <S.Section>
              <S.SectionTitle>판매제품</S.SectionTitle>
              <S.ProductContainer>
                <S.ProductImage src={eventData.productImage} alt="판매제품 목록" />
              </S.ProductContainer>
            </S.Section>
          </S.EventInfoSection>
        )}

        {activeTab === '후기' && (
          <S.ReviewSection>
            <S.ReviewInput className="review-input">
              <S.InputHeader>
                <S.ProfileSection>
                  <S.Profileimg src={profileData.profileImage} alt="프로필" />
                  <S.ProfileName>{profileData.name}</S.ProfileName>
                  <S.Rating>
                    {'⭐'.repeat(profileData.rating)}
                    {'☆'.repeat(profileData.maxRating - profileData.rating)}
                  </S.Rating>
                </S.ProfileSection>
                <S.InputSection>
                  <S.TextArea
                    placeholder="한 줄 후기를 남겨주세요!"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  />
                  <S.ReviewButton onClick={handleReviewSubmit}>
                    {editingReview ? '수정하기' : '등록하기'}
                  </S.ReviewButton>
                </S.InputSection>
              </S.InputHeader>
            </S.ReviewInput>
            <S.ReviewCount>
              한 줄 리뷰 ({reviews.length})<span>평균 평점: {calculateAverageRating(reviews)}</span>
            </S.ReviewCount>
            <S.ReviewList>
              {reviews.map((review) => (
                <S.ReviewCard key={review.id}>
                  <S.ReviewHeader>
                    <S.Avatar src={review.profileImage} alt="프로필" />
                    <S.UserInfo>
                      <S.UserName>{review.username}</S.UserName>
                      <S.Rating>
                        {'⭐'.repeat(review.rating)}
                        {'☆'.repeat(review.maxRating - review.rating)}
                      </S.Rating>
                    </S.UserInfo>
                    {editingId === review.id ? (
                      <S.InlineEditTextArea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        autoFocus
                      />
                    ) : (
                      <S.ReviewContent>{review.content}</S.ReviewContent>
                    )}
                  </S.ReviewHeader>

                  {review.username === profileData.name && (
                    <S.EditDeleteButtons>
                      {editingId === review.id ? (
                        <>
                          <S.ActionButton onClick={() => handleEditComplete(review.id)}>
                            완료
                          </S.ActionButton>
                          <S.ActionButton onClick={handleEditCancel}>취소</S.ActionButton>
                        </>
                      ) : (
                        <>
                          <S.ActionButton onClick={() => handleEditStart(review)}>
                            수정
                          </S.ActionButton>
                          <S.ActionButton onClick={() => handleDelete(review.id)}>
                            삭제
                          </S.ActionButton>
                        </>
                      )}
                    </S.EditDeleteButtons>
                  )}

                  <S.FeedbackButtons>
                    <S.IconButton onClick={() => handleLike(review.id)}>
                      <ThumbsUp size={20} />
                      <span>{review.likes}</span>
                    </S.IconButton>
                    <S.IconButton onClick={() => handleDislike(review.id)}>
                      <ThumbsDown size={20} />
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
