// ReviewPage3.tsx

import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
// import baseball from '../assets/baseball.png';
import * as S from '../styles/review/ReviewPage.style';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchReviews } from '../api/review/PlaceReview';
import { ReviewResponse, SortType, AnimationGroup } from '../types/review/PlaceReview';

const ReviewPage3 = () => {
  const navigate = useNavigate();
  const { placeId } = useParams<{ placeId: string }>();
  const [reviewData, setReviewData] = useState<ReviewResponse['result'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState<SortType>('latest');

  useEffect(() => {
    const loadReviews = async () => {
      if (!placeId) return;

      try {
        setLoading(true);
        const response = await fetchReviews(placeId, currentPage, 10, sort);
        if (response.isSuccess) {
          setReviewData(response.result);
          setError(null);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [placeId, currentPage, sort]);

  const handleShortReviewClick = () => {
    if (!placeId) {
      console.error('No placeId available');
      window.confirm('장소 정보를 찾을 수 없습니다.');
      return;
    }
    navigate(`/places/${placeId}/short-review`);
  };

  const handleSortChange = (newSort: SortType) => {
    setSort(newSort);
    setCurrentPage(0); // Reset to first page when sorting changes
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!reviewData) return <div>No data available</div>;

  return (
    <S.Container>
      <S.NavigationWrapper>
        <S.LocationBar>
          <S.LocationInput>
            <MapPin size={20} color="#0c004b" />
            <S.LocationText value={reviewData.placeName} readOnly />
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
      </S.NavigationWrapper>

      <S.WhiteContainer>
        <S.BHeader>
          <div>
            <S.ReviewTypeButton onClick={handleShortReviewClick}>한 줄 후기</S.ReviewTypeButton>
            &gt; ⭐️{'⭐️'.repeat(Math.round(reviewData.avgRating))}
          </div>
          <div>
            <span
              onClick={() => handleSortChange('latest')}
              style={{ cursor: 'pointer', fontWeight: sort === 'latest' ? 'bold' : 'normal' }}
            >
              최신순
            </span>
            {' / '}
            <span
              onClick={() => handleSortChange('views')}
              style={{ cursor: 'pointer', fontWeight: sort === 'views' ? 'bold' : 'normal' }}
            >
              조회순
            </span>
          </div>
        </S.BHeader>

        <S.ReviewList>
          {reviewData.animationGroups.map((group: AnimationGroup) => (
            <div key={group.animationId}>
              <h3>{group.animationName}</h3>
              {group.reviews.map((review) => (
                <S.ReviewItem key={review.reviewId}>
                  <S.ReviewContent>
                    <S.ReviewTitle>{review.title}</S.ReviewTitle>
                    <S.ReviewText>{review.content}</S.ReviewText>
                  </S.ReviewContent>
                  {review.reviewImage && (
                    <S.ReviewImageWrapper>
                      <S.ReviewImage
                        src={review.reviewImage.fileUrl}
                        alt={review.reviewImage.fileName}
                      />
                    </S.ReviewImageWrapper>
                  )}
                </S.ReviewItem>
              ))}
            </div>
          ))}
        </S.ReviewList>
      </S.WhiteContainer>
    </S.Container>
  );
};

export default ReviewPage3;
