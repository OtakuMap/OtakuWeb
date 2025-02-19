import { useState, useEffect } from 'react';
import { MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import * as S from '../styles/review/ReviewPage.style';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchReviews } from '../api/review/PlaceReview';
import { fetchPlaceAnimations } from '../api/review/animation';
import { searchAnimations, addAnimation } from '../api/review/AddAnimation';
import { ReviewResponse, SortType, AnimationGroup } from '../types/review/PlaceReview';
import { PlaceAnimation } from '../types/review/animation';
import { tokenStorage } from '@/utils/token';
import { savePlace } from '../api/review/SavePlace';

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

  // Custom animation states
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<{ animationId: number; name: string }[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isCustomAnimationMode, setIsCustomAnimationMode] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!placeId) return;

      try {
        setLoading(true);

        // Fetch place animations
        const animationResponse = await fetchPlaceAnimations(placeId);

        if (animationResponse.isSuccess && animationResponse.result) {
          setPlaceAnimations(animationResponse.result.placeAnimations);

          // Set default animation if available
          if (animationResponse.result.placeAnimations.length > 0) {
            setSelectedAnimation(animationResponse.result.placeAnimations[0]);
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
        console.error('Error loading data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [placeId, currentPage, sort]);

  const handleAnimationSearch = async (keyword: string) => {
    if (!keyword.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await searchAnimations(keyword);
      if (response.isSuccess) {
        setSearchResults(response.result.animations);
      } else {
        console.error('검색 실패:', response.message);
      }
    } catch (error) {
      console.error('애니메이션 검색 실패:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddAnimation = async () => {
    try {
      const token = tokenStorage.getAccessToken();
      if (!token) {
        alert('로그인이 필요한 서비스입니다.');
        navigate('/login');
        return;
      }

      const response = await addAnimation({ name: searchKeyword });
      if (response.isSuccess) {
        // 새로 추가된 애니메이션 선택
        const newAnimation: PlaceAnimation = {
          placeAnimationId: response.result.animationId,
          animationId: response.result.animationId,
          animationName: response.result.name,
        };

        setPlaceAnimations([...placeAnimations, newAnimation]);
        setSelectedAnimation(newAnimation);
        setIsAnimationDropdownOpen(false);
        setIsCustomAnimationMode(false);
        setSearchKeyword('');
        setSearchResults([]);
      }
    } catch (error) {
      console.error('애니메이션 추가 실패:', error);
      alert('애니메이션 추가에 실패했습니다.');
    }
  };
  const handleSavePlaceClick = async () => {
    if (!placeId || !selectedAnimation) {
      alert('장소와 애니메이션을 선택해주세요.');
      return;
    }

    try {
      const token = tokenStorage.getAccessToken();
      if (!token) {
        alert('로그인이 필요한 서비스입니다.');
        navigate('/login');
        return;
      }

      const data = {
        animationId: selectedAnimation.animationId,
      };

      const response = await savePlace(Number(placeId), data);

      if (response.isSuccess) {
        alert('장소가 저장되었습니다.');
      } else {
        alert('장소 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error saving place:', error);
      alert('장소 저장 중 오류가 발생했습니다.');
    }
  };

  const toggleAnimationDropdown = () => {
    setIsAnimationDropdownOpen(!isAnimationDropdownOpen);
    setIsCustomAnimationMode(false);
    setSearchKeyword('');
    setSearchResults([]);
  };

  const handleAnimationSelect = (animation: PlaceAnimation) => {
    setSelectedAnimation(animation);
    setIsAnimationDropdownOpen(false);
    setIsCustomAnimationMode(false);
  };

  const handleShortReviewClick = () => {
    if (!placeId) {
      console.error('No placeId available');
      window.confirm('장소 정보를 찾을 수 없습니다.');
      return;
    }
    navigate(`/places/${placeId}/short-review`, {
      state: {
        placeName: reviewData.placeName,
        selectedAnimation: selectedAnimation,
      },
    });
  };

  const handleSortChange = (newSort: SortType) => {
    setSort(newSort);
    setCurrentPage(1); // Reset to first page when sorting changes
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
          <S.SaveLocationButton onClick={handleSavePlaceClick}>명소 저장하기</S.SaveLocationButton>
        </S.LocationBar>

        {/* Animation Dropdown */}
        <S.DropdownContainer3>
          <S.DropdownButton3 onClick={toggleAnimationDropdown}>
            {selectedAnimation ? selectedAnimation.animationName : '애니메이션 선택'}
            {isAnimationDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </S.DropdownButton3>

          {isAnimationDropdownOpen && (
            <S.DropdownList3>
              {/* 직접 입력 모드 */}
              {isCustomAnimationMode ? (
                <>
                  <S.SeInput
                    placeholder="애니메이션을 입력하고 Enter를 눌러 검색"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onKeyDown={async (e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (searchKeyword.trim()) {
                          await handleAnimationSearch(searchKeyword);
                        }
                      }
                    }}
                  />

                  {isSearching ? (
                    <S.LoadingText>검색 중...</S.LoadingText>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((animation) => (
                      <S.DropdownItem3
                        key={animation.animationId}
                        onClick={() => {
                          const newAnimation: PlaceAnimation = {
                            placeAnimationId: animation.animationId,
                            animationId: animation.animationId,
                            animationName: animation.name,
                          };
                          handleAnimationSelect(newAnimation);
                        }}
                      >
                        {animation.name}
                      </S.DropdownItem3>
                    ))
                  ) : searchKeyword ? (
                    <S.NoResult>
                      <div>검색 결과가 없습니다.</div>
                      <S.AddButton onClick={handleAddAnimation}>
                        "{searchKeyword}" 추가하기
                      </S.AddButton>
                    </S.NoResult>
                  ) : null}
                </>
              ) : (
                <>
                  {/* 기존 애니메이션 목록 */}
                  {placeAnimations.map((animation) => (
                    <S.DropdownItem3
                      key={animation.placeAnimationId}
                      onClick={() => handleAnimationSelect(animation)}
                    >
                      {animation.animationName}
                    </S.DropdownItem3>
                  ))}

                  {/* 직접 입력하기 옵션 */}
                  <S.DropdownItem3
                    onClick={() => {
                      setIsCustomAnimationMode(true);
                      setSearchKeyword('');
                      setSearchResults([]);
                    }}
                  >
                    직접 입력하기
                  </S.DropdownItem3>
                </>
              )}
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
