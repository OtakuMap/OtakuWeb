import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import picture from '../assets/picture.png';
import mapIcon from '../assets/mapIcon.png';
import * as S from '../styles/review/ReviewPage.style';
import { useReviewPage } from '@/hooks/review/useReviewPage7';
import { useWriteReview } from '@/api/review/WriteReview';
import { WriteReviewRequest } from '@/types/review/WriteReview';
import { useImageUpload } from '@/api/review/image';
import { getUserProfile } from '@/api/review/user';
import { UserProfile } from '@/types/review/user';
import { searchAnimations, addAnimation } from '@/api/review/AddAnimation';
import { AnimationItem } from '@/types/review/AddAnimation';
import MapSelectionModal from '@/components/map/MapSelectionModal';
import { tokenStorage } from '@/utils/token';
import { AxiosError } from 'axios';

const ReviewPage7 = () => {
  const navigate = useNavigate();
  const { submitReview, isLoading } = useWriteReview();
  const { upload, isUploading } = useImageUpload();
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  // 애니메이션 관련 상태 추가
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<AnimationItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedAnimationId, setSelectedAnimationId] = useState<number | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        if (response.isSuccess) {
          setProfileData(response.result);
        } else {
          console.error('Failed to fetch profile:', response.message);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsProfileLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 애니메이션 검색 핸들러
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
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          alert('로그인이 필요한 서비스입니다.');
          navigate('/login');
        } else {
          console.error('애니메이션 검색 실패:', error.message);
          alert('검색에 실패했습니다. 다시 시도해주세요.');
        }
      } else {
        console.error('애니메이션 검색 실패:', error);
        alert('검색에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsSearching(false);
    }
  };
  // 새로운 애니메이션 추가 핸들러
  const handleAddAnimation = async (name: string) => {
    try {
      const token = tokenStorage.getAccessToken();
      if (!token) {
        alert('로그인이 필요한 서비스입니다.');
        navigate('/login');
        return;
      }

      const response = await addAnimation({ name });
      if (response.isSuccess) {
        setSelectedAnimationId(response.result.animationId);
        handleAnimationSelect(response.result.name);
        setSearchResults([]);
        setSearchKeyword('');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          alert('로그인이 필요한 서비스입니다.');
          navigate('/login');
        } else {
          console.error('애니메이션 추가 실패:', error.message);
          alert('애니메이션 추가에 실패했습니다. 다시 시도해주세요.');
        }
      } else {
        console.error('애니메이션 추가 실패:', error);
        alert('애니메이션 추가에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const {
    title,
    setTitle,
    content,
    setContent,
    selectedReviewType,
    selectedAnimation,
    selectedVisibility,
    isReviewTypeOpen,
    isAnimationOpen,
    isVisibilityOpen,
    locations,
    handleLocationSelect,
    handleLocationNameChange,
    deleteLocation,
    addLocation,
    toggleReviewType,
    handleReviewTypeSelect,
    toggleAnimation,
    handleAnimationSelect,
    toggleVisibility,
    handleVisibilitySelect,
    handleLocationDetailChange, // 새로 추가된 handler
  } = useReviewPage();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.[0]) return;
    setUploadedImage(event.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      // 필수 입력값 검증
      if (!title.trim()) {
        alert('제목을 입력해주세요.');
        return;
      }
      if (!content.trim()) {
        alert('내용을 입력해주세요.');
        return;
      }
      if (!selectedReviewType) {
        alert('리뷰 타입을 선택해주세요.');
        return;
      }
      if (!selectedAnimationId) {
        alert('애니메이션을 선택해주세요.');
        return;
      }
      if (locations.length === 0) {
        alert('최소 1개 이상의 루트 아이템이 필요합니다.');
        return;
      }

      const reviewData: WriteReviewRequest = {
        title,
        content,
        reviewType: selectedReviewType === '이벤트 후기' ? 'EVENT' : 'PLACE',
        animeId: selectedAnimationId,
        routeItems: locations
          .filter((location) => location.name.trim() !== '')
          .map((location, index) => ({
            name: location.name,
            lat: location.latitude,
            lng: location.longitude,
            detail: location.detail || '',
            order: index,
          })),
      };

      const response = await submitReview(reviewData, uploadedImage ? [uploadedImage] : undefined);

      if (response.isSuccess) {
        alert('리뷰가 성공적으로 등록되었습니다.');
        navigate('/reviews');
      }
    } catch (error) {
      console.error('리뷰 등록 실패:', error);
      alert('리뷰 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };
  if (isLoading || isUploading || isProfileLoading) {
    return <div>로딩 중...</div>;
  }

  if (!profileData) {
    return <div>프로필을 불러올 수 없습니다.</div>;
  }

  return (
    <S.Container>
      <S.BreadcrumbNav>후기 작성</S.BreadcrumbNav>

      <S.WhiteContainer>
        <S.HeaderContainer7>
          <S.TitleInput
            placeholder="후기 제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <S.MetaInfo>
            <S.Avatar>
              <img src={profileData.profileImageUrl} alt={`${profileData.nickname}의 프로필`} />
            </S.Avatar>
            <S.UserInfo>
              <S.Username>{profileData.nickname}</S.Username>
              <S.Date>
                {new Date()
                  .toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })
                  .split('.')
                  .map((part) => part.trim())
                  .filter(Boolean)
                  .join('.')}
              </S.Date>
            </S.UserInfo>
          </S.MetaInfo>
        </S.HeaderContainer7>

        <S.ContentContainer7>
          <S.ContentTextArea
            placeholder="후기 내용을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <S.ReviewFormContainer>
            <S.SelectBoxContainer>
              <S.SelectBox onClick={toggleReviewType}>
                <span>{selectedReviewType || '리뷰 타입 선택'}</span>
                <span>▼</span>
                {isReviewTypeOpen && (
                  <S.DropdownList>
                    <S.DropdownItem onClick={() => handleReviewTypeSelect('이벤트 후기')}>
                      이벤트 후기
                    </S.DropdownItem>
                    <S.DropdownItem onClick={() => handleReviewTypeSelect('명소 후기')}>
                      명소 후기
                    </S.DropdownItem>
                  </S.DropdownList>
                )}
              </S.SelectBox>

              <S.SelectBox onClick={toggleAnimation}>
                <span>{selectedAnimation || '애니메이션 선택'}</span>
                <span>▼</span>
                {isAnimationOpen && (
                  <S.DropdownList>
                    <S.SeInput
                      placeholder="애니메이션을 입력하고 Enter를 눌러 검색"
                      value={searchKeyword}
                      onChange={(e) => {
                        setSearchKeyword(e.target.value);
                      }}
                      onKeyDown={async (e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (searchKeyword.trim()) {
                            await handleAnimationSearch(searchKeyword);
                          }
                        }
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />

                    {isSearching ? (
                      <S.LoadingText>검색 중...</S.LoadingText>
                    ) : searchResults.length > 0 ? (
                      searchResults.map((animation) => (
                        <S.DropdownItem
                          key={animation.animationId}
                          onClick={() => {
                            setSelectedAnimationId(animation.animationId);
                            handleAnimationSelect(animation.name);
                          }}
                        >
                          {animation.name}
                        </S.DropdownItem>
                      ))
                    ) : searchKeyword ? (
                      <S.NoResult>
                        <div>검색 결과가 없습니다.</div>
                        <S.AddButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddAnimation(searchKeyword);
                          }}
                        >
                          "{searchKeyword}" 추가하기
                        </S.AddButton>
                      </S.NoResult>
                    ) : null}
                  </S.DropdownList>
                )}
              </S.SelectBox>

              <S.SelectBox onClick={toggleVisibility}>
                <span>{selectedVisibility || '열람 범위 선택'}</span>
                <span>▼</span>
                {isVisibilityOpen && (
                  <S.DropdownList>
                    <S.DropdownItem onClick={() => handleVisibilitySelect('전체 열람가능')}>
                      전체 열람가능
                    </S.DropdownItem>
                    <S.DropdownItem onClick={() => handleVisibilitySelect('구매자만 열람가능')}>
                      구매자만 열람가능
                    </S.DropdownItem>
                  </S.DropdownList>
                )}
              </S.SelectBox>
            </S.SelectBoxContainer>

            <S.RouteSection>
              {locations.map((location) => (
                <S.RouteItem7 key={location.order}>
                  <S.RouteNumber>{location.order}</S.RouteNumber>
                  <S.RouteInput
                    placeholder={`${location.order}번째 장소`}
                    value={location.name}
                    onChange={(e) => handleLocationNameChange(location.order, e.target.value)}
                  />
                  <S.DeleteButton7 onClick={() => deleteLocation(location.order)}>
                    ×
                  </S.DeleteButton7>
                </S.RouteItem7>
              ))}

              {locations.length < 10 && (
                <S.AddLocationButton onClick={addLocation}>+</S.AddLocationButton>
              )}
              <S.AddSection>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <S.AddPic
                    src={uploadedImage ? URL.createObjectURL(uploadedImage) : picture}
                    alt="사진 추가"
                    style={{ cursor: 'pointer' }}
                  />
                </label>
                <S.AddMap
                  src={mapIcon}
                  alt="지도 추가"
                  onClick={() => setIsMapModalOpen(true)}
                  style={{ cursor: 'pointer' }}
                />
              </S.AddSection>
              <S.Button7 onClick={handleSubmit} disabled={isLoading || isUploading}>
                {isLoading || isUploading ? '업로드 중...' : '업로드 하기'}
              </S.Button7>
            </S.RouteSection>
          </S.ReviewFormContainer>
        </S.ContentContainer7>
      </S.WhiteContainer>

      <MapSelectionModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        onLocationSelect={handleLocationSelect}
      />
    </S.Container>
  );
};

export default ReviewPage7;
