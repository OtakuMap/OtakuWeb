import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/reduxHooks';
import { openLoginModal } from '@/store/slices/modalSlice';
import { saveRoute } from '@/api/review/route';
// import { tokenStorage } from '@/utils/token'; // 토큰 스토리지 import
import profileImage from '../assets/profile.png';
import mapImage from '../assets/mapData.png';
import * as S from '../styles/review/ReviewPage.style';
import { RouteData } from '@/types/review/route';
// import axios from 'axios';

const ReviewPage5 = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const handleSaveRoute = () => {
    if (!isLoggedIn) {
      dispatch(openLoginModal());
      return;
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 토큰 스토리지로 로그인 상태 확인
  // const isLoggedIn = !!tokenStorage.getAccessToken();

  const handleSaveRoute = async () => {
    try {
      setIsSaving(true);
      const currentReviewId = reviewData.id;

      console.log('Attempting to save route:', {
        reviewId: currentReviewId,
        routeData,
      });

      const response = await saveRoute(currentReviewId, routeData);

      if (response.isSuccess) {
        alert('루트가 성공적으로 저장되었습니다.');
      } else {
        alert(response.message || '루트 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Full Error Object:', error);
      alert('루트 저장 중 예상치 못한 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
    // 루트 저장 로직
    console.log('루트 저장');
  };

  const reviewData = {
    id: 1,
    title: '유명한이 지금까지 코난한테 맞은 마취총 개수 아는 사람',
    author: 'Otkkk011',
    date: '2025.01.12',
    profileImage: profileImage,
    content: `고교생 명탐정 쿠도 신이치는 소꿉친구 모리 란과 트로피컬 랜드로 놀러온 뒤 그 곳에서 일어난 사건을 해결한 뒤 저녁이 되어서 귀가하려다가 웬 수상한 거래 현장을 목격한다. 이후 같이 온 란을 먼저 가라고 등떠밀고 그들을 쫓아간 뒤 몰래 숨어서 현장을 지켜보는데, 거래 현장에 정신이 팔린 나머지 등 뒤에서 다가오는 진의 존재를 알아차리지 못하고 그가 휘두른 방망이에 머리를 맞고 쓰러진다. 이후 진은 의식을 잃어가는 신이치의 입안에 정체 모를 알약을 넣고는 사라져 버린다. 한참 후 놀이공원에 순찰을 다니던 경비원들에게 발견되어 깨어났는데, 그들이 고등학생인 자신을 '꼬마'라고 부르자 황당해했고, 이내 입고 있던 옷이 헐렁해지고 크게 보이는 걸 보고서는 더욱 당황한다. 일단 현장에서 도망친 뒤 본인의 동네에 도달한 후 어느 건물의 유리에 비친 자신의 모습을 보고 결국 자신이 고등학생의 의식을 가진 채 몸만 어린아이로 변했다는 걸 알게 됐고, 자신의 집에 가 해결책을 찾으려고 했지만, 키도 작아지고 어린애가 돼버린 탓에 문을 여는 일도 힘든 상황. 다급히 평소 친하게 지내던 옆집의 아가사 박사를 데려와 도움을 요청한다.`,
    location: 'Teramachi-202 Maehibocho, Konan, Aichi 483-8336 일본',
  };

  const routeData: RouteData[] = [
    { id: 1, order: 1, name: '루트루트루트이룰이룰이룰', description: '첫 번째 장소' },
    { id: 2, order: 2, name: '루트루트이룰이룰이룰', description: '두 번째 장소' },
    { id: 3, order: 3, name: '루트루트이룰이룰이룰이룰', description: '세 번째 장소' },
    { id: 4, order: 4, name: '루트루트이룰이룰이룰이룰', description: '네 번째 장소' },
    { id: 5, order: 5, name: '루트루트루트', description: '마지막 장소' },
  ];

  const sortedRouteData = [...routeData].sort((a, b) => a.order - b.order);

  return (
    <S.Container>
      <S.BreadcrumbNav>후기 {'>'} 명탐정 코난</S.BreadcrumbNav>

      <S.WhiteContainer>
        <S.HeaderContainer>
          <S.PostTitle>{reviewData.title}</S.PostTitle>
          <S.MetaInfo>
            <S.Avatar>
              <img src={reviewData.profileImage} alt={`${reviewData.author}의 프로필`} />
            </S.Avatar>
            <S.UserInfo>
              <S.Username>{reviewData.author}</S.Username>
              <S.Date>{reviewData.date}</S.Date>
            </S.UserInfo>
          </S.MetaInfo>
        </S.HeaderContainer>

        <S.ContentContainer>
          <S.MainContent>
            <S.ReviewContext>{reviewData.content}</S.ReviewContext>
            <S.MapContainer>
              <S.MapImage src={mapImage} alt="위치 지도" />
              <S.LocText>{reviewData.location}</S.LocText>
            </S.MapContainer>
          </S.MainContent>

          <S.SideContent>
            <S.SaveRouteButton onClick={handleSaveRoute} disabled={isSaving}>
              {isSaving ? '저장 중...' : '루트 저장하기'}
            </S.SaveRouteButton>
            <S.RouteList>
              {sortedRouteData.map((route) => (
                <S.RouteItem key={route.id}>
                  <S.RouteNumber>{route.order}</S.RouteNumber>
                  <S.RouteName title={route.description}>{route.name}</S.RouteName>
                </S.RouteItem>
              ))}
            </S.RouteList>
            <S.RouteButtonContainer>
              <S.Button>루트 지도에서 보기</S.Button>
              <S.SupportButton>후기 후원하기</S.SupportButton>
            </S.RouteButtonContainer>
          </S.SideContent>
        </S.ContentContainer>
      </S.WhiteContainer>
    </S.Container>
  );
};

export default ReviewPage5;
