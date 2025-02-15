import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '../assets/profile.png';
import picture from '../assets/picture.png';
import mapIcon from '../assets/mapIcon.png';
import * as S from '../styles/review/ReviewPage.style';
import { useReviewPage } from '@/hooks/review/useReviewPage7';
import { useWriteReview } from '@/api/review/WriteReview';
import { WriteReviewRequest } from '@/types/review/WriteReview';
import { useImageUpload } from '@/api/review/image';

const profileData = {
  profileImage: profile,
  name: 'Otkkk011',
  date: '2025.01.12',
};

const ReviewPage7 = () => {
  const navigate = useNavigate();
  const { submitReview, isLoading } = useWriteReview();
  const { upload, isUploading } = useImageUpload();
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const {
    // Form State
    title,
    setTitle,
    content,
    setContent,
    selectedReviewType,
    selectedAnimation,
    selectedVisibility,

    // Dropdown States
    isReviewTypeOpen,
    isAnimationOpen,
    isVisibilityOpen,

    // Custom Animation States
    customAnimation,
    isTypingCustom,
    inputRef,

    // Routes
    routes,

    // Handlers
    toggleReviewType,
    handleReviewTypeSelect,
    toggleAnimation,
    handleAnimationSelect,
    handleCustomAnimationInput,
    handleCustomAnimationKeyDown,
    handleCustomAnimationBlur,
    handleInputClick,
    toggleVisibility,
    handleVisibilitySelect,
    handleRouteChange,
    deleteRoute,
  } = useReviewPage({ initialProfileData: profileData });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.[0]) return;

    try {
      const file = event.target.files[0];
      const response = await upload('review', file);

      if (response.isSuccess) {
        setUploadedImageUrl(response.result);
      }
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다.');
    }
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

      // reviewType 타입 체크
      if (selectedReviewType !== '이벤트 후기' && selectedReviewType !== '명소 후기') {
        alert('올바른 리뷰 타입을 선택해주세요.');
        return;
      }

      const reviewData: Omit<WriteReviewRequest, 'userId'> = {
        placeId: 1, // 실제 장소 ID로 변경 필요
        title,
        content,
        reviewType: selectedReviewType,
        animation: selectedAnimation === 'custom' ? customAnimation : selectedAnimation,
        visibility: selectedVisibility as '전체 열람가능' | '구매자만 열람가능',
        routes: routes.map((route) => ({
          id: route.id,
          value: route.value,
        })),
        imageUrl: uploadedImageUrl,
      };

      const response = await submitReview(reviewData);

      if (response.isSuccess) {
        alert('리뷰가 성공적으로 등록되었습니다.');
        navigate('/reviews');
      }
    } catch (error) {
      console.error('리뷰 등록 실패:', error);
      alert('리뷰 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  if (isLoading || isUploading) {
    return <div>업로드 중...</div>;
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
              <img src={profileData.profileImage} alt={`${profileData.name}의 프로필`} />
            </S.Avatar>
            <S.UserInfo>
              <S.Username>{profileData.name}</S.Username>
              <S.Date>{profileData.date}</S.Date>
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
                <span>{selectedReviewType}</span>
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
                <span>{selectedAnimation}</span>
                <span>▼</span>
                {isAnimationOpen && (
                  <S.DropdownList>
                    {isTypingCustom ? (
                      <S.SeInput
                        ref={inputRef}
                        value={customAnimation}
                        onChange={handleCustomAnimationInput}
                        onKeyDown={handleCustomAnimationKeyDown}
                        onBlur={handleCustomAnimationBlur}
                        onClick={handleInputClick}
                        autoFocus
                      />
                    ) : (
                      <S.DropdownItem
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAnimationSelect('custom');
                        }}
                      >
                        직접 입력하기
                      </S.DropdownItem>
                    )}

                    {/* 일반 애니메이션 목록 */}
                    <S.DropdownItem onClick={() => handleAnimationSelect('애니메이션 1')}>
                      애니메이션 1
                    </S.DropdownItem>
                    <S.DropdownItem onClick={() => handleAnimationSelect('애니메이션 2')}>
                      애니메이션 2
                    </S.DropdownItem>
                    <S.DropdownItem onClick={() => handleAnimationSelect('애니메이션 3')}>
                      애니메이션 3
                    </S.DropdownItem>
                  </S.DropdownList>
                )}
              </S.SelectBox>

              <S.SelectBox onClick={toggleVisibility}>
                <span>{selectedVisibility}</span>
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
              {routes.map((route) => (
                <S.RouteItem7 key={route.id}>
                  <S.RouteNumber>{route.id}</S.RouteNumber>
                  <S.RouteInput
                    placeholder={`${route.id}번째 장소`}
                    value={route.value}
                    onChange={(e) => handleRouteChange(route.id, e.target.value)}
                  />
                  <S.DeleteButton7 onClick={() => deleteRoute(route.id)}>×</S.DeleteButton7>
                </S.RouteItem7>
              ))}
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
                    src={uploadedImageUrl || picture}
                    alt="사진 추가"
                    style={{ cursor: 'pointer' }}
                  />
                </label>
                <S.AddMap src={mapIcon} alt="지도 추가" />
              </S.AddSection>
              <S.Button7 onClick={handleSubmit} disabled={isLoading || isUploading}>
                {isLoading || isUploading ? '업로드 중...' : '업로드 하기'}
              </S.Button7>
            </S.RouteSection>
          </S.ReviewFormContainer>
        </S.ContentContainer7>
      </S.WhiteContainer>
    </S.Container>
  );
};

export default ReviewPage7;
