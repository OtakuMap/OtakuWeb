// ReviewPage3.tsx
import { useState, useEffect } from 'react';
import { MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import * as S from '../styles/review/ReviewPage.style';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchReviews } from '../api/review/PlaceReview';
import { fetchPlaceAnimations } from '../api/review/animation';
import { ReviewResponse, SortType, AnimationGroup } from '../types/review/PlaceReview';
import { PlaceAnimation } from '../types/review/animation';

const ReviewPage3 = () => {
  const navigate = useNavigate();
  const { placeId } = useParams<{ placeId: string }>();

  // Review-related states
  const [reviewData, setReviewData] = useState<ReviewResponse['result'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState<SortType>('latest');

  // Animation-related states
  const [placeAnimations, setPlaceAnimations] = useState<PlaceAnimation[]>([]);
  const [selectedAnimation, setSelectedAnimation] = useState<PlaceAnimation | null>(null);
  const [isAnimationDropdownOpen, setIsAnimationDropdownOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!placeId) return;

      try {
        setLoading(true);

        // Fetch place animations
        const animationResponse = await fetchPlaceAnimations(placeId);
        console.log('Animation Response:', animationResponse);

        if (animationResponse.isSuccess && animationResponse.result) {
          // result 존재 여부 체크 추가
          console.log('Place Animations:', animationResponse.result.placeAnimations);
          setPlaceAnimations(animationResponse.result.placeAnimations);

          // Set default animation if available
          if (animationResponse.result.placeAnimations.length > 0) {
            setSelectedAnimation(animationResponse.result.placeAnimations[0]);
            console.log('Selected Animation:', animationResponse.result.placeAnimations[0]);
          }
        } else {
          console.error('Failed to load animations:', animationResponse.message);
        }

        // Fetch reviews
        const reviewResponse = await fetchReviews(placeId, currentPage, 10, sort);
        if (reviewResponse.isSuccess) {
          setReviewData(reviewResponse.result);
          setError(null);
        } else {
          setError(reviewResponse.message);
        }
      } catch (err) {
        console.error('Error loading animations:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
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
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  const toggleAnimationDropdown = () => {
    setIsAnimationDropdownOpen(!isAnimationDropdownOpen);
  };

  const handleAnimationSelect = (animation: PlaceAnimation) => {
    setSelectedAnimation(animation);
    setIsAnimationDropdownOpen(false);
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

        {/* Animation Dropdown */}
        <S.DropdownContainer3>
          <S.DropdownButton3 onClick={toggleAnimationDropdown}>
            {selectedAnimation ? selectedAnimation.animationName : '애니메이션 선택'}
            {isAnimationDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </S.DropdownButton3>
          {isAnimationDropdownOpen && (
            <S.DropdownList3>
              {placeAnimations.map((animation) => (
                <S.DropdownItem3
                  key={animation.placeAnimationId}
                  onClick={() => handleAnimationSelect(animation)}
                >
                  {animation.animationName}
                </S.DropdownItem3>
              ))}
            </S.DropdownList3>
          )}
        </S.DropdownContainer3>

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
