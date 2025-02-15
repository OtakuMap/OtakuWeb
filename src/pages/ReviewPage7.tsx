import profile from '../assets/profile.png';
import picture from '../assets/picture.png';
import mapIcon from '../assets/mapIcon.png';
import * as S from '../styles/review/ReviewPage.style';
import { useReviewPage } from '@/hooks/review/useReviewPage7';
import MapSelectionModal from '@/components/map/MapSelectionModal';

const profileData = {
  profileImage: profile,
  name: 'Otkkk011',
  date: '2025.01.12',
};

const ReviewPage7 = () => {
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
    handleSubmit,

    locations,
    isMapModalOpen,
    setIsMapModalOpen,
    handleLocationSelect,
    handleLocationNameChange,
    deleteLocation,
  } = useReviewPage({ initialProfileData: profileData });

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
              <S.AddSection>
                <S.AddPic src={picture} alt="사진 추가" />
                <S.AddMap src={mapIcon} alt="지도 추가" onClick={() => setIsMapModalOpen(true)} />
              </S.AddSection>
              <S.Button7 onClick={handleSubmit}>업로드 하기</S.Button7>
            </S.RouteSection>

            {/* 모달 추가 */}
            <MapSelectionModal
              isOpen={isMapModalOpen}
              onClose={() => setIsMapModalOpen(false)}
              onLocationSelect={handleLocationSelect}
            />
            {/* <S.RouteSection>
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
                <S.AddPic src={picture} alt="사진 추가" />
                <S.AddMap src={mapIcon} alt="지도 추가" />
              </S.AddSection>
              <S.Button7 onClick={handleSubmit}>업로드 하기</S.Button7>
            </S.RouteSection> */}
          </S.ReviewFormContainer>
        </S.ContentContainer7>
      </S.WhiteContainer>
    </S.Container>
  );
};

export default ReviewPage7;
