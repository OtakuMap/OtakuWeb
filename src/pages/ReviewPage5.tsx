import styled from 'styled-components';
import profileImage from '../assets/profile.png';
import mapImage from '../assets/map.png';

const Container = styled.div`
  background-color: #0c004b;
  width: 100vw;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BreadcrumbNav = styled.div`
  width: 90%;
  max-width: 1200px;
  color: white;
  font-size: 24px;
  margin-bottom: 20px;
`;

const WhiteContainer = styled.div`
  background-color: white;
  width: 90%;
  max-width: 1200px;
  border-radius: 20px;
  padding: 30px;
  margin: 20px auto;
  box-sizing: border-box;
`;

const HeaderContainer = styled.div`
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #252660;
`;

const PostTitle = styled.h1`
  font-size: 24px;
  color: #000;
  margin-bottom: 32px;
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f0f0f0;
  margin-right: 15px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.span`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Date = styled.span`
  color: #666;
  font-size: 14px;
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 32px;
`;

const MainContent = styled.div`
  flex: 1;
  max-width: 70%;
`;

const ReviewContent = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #333;
`;

const MapContainer = styled.div`
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const MapImage = styled.img`
  width: 80%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 10px;
`;

const LocationText = styled.p`
  color: #666;
  font-size: 14px;
  margin-top: 8px;
`;

const SideContent = styled.div`
  flex: 0.5;
  width: 250px;
  padding-left: 20px;
  border-left: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SaveRouteButton = styled.button`
  width: 50%;
  height: 60px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  color: black;
  background-color: #bdaee5;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
  font-weight: 700;
`;

const RouteList = styled.div`
  max-height: calc(30px * 5 + 30px * 5);
  overflow-y: auto;
  width: 100%;
  margin-top: 10px;
  padding-right: 16px;
  box-sizing: content-box;
`;

const RouteItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  gap: 10px;
`;

const RouteNumber = styled.div`
  width: 30px;
  height: 30px;
  background-color: #bdaee5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #252660;
`;

const RouteName = styled.div`
  background-color: #f5f5f5;
  padding: 8px 15px;
  border-radius: 15px;
  font-size: 14px;
  flex: 1;
`;

const RouteButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  background-color: #252660;
  color: white;
  border: none;
  font-weight: 700;
`;

const SupportButton = styled(Button)`
  background-color: #ffc50c;
  color: #252660;
`;

const ReviewPage5 = () => {
  const reviewData = {
    id: 1,
    title: '유명한이 지금까지 코난한테 맞은 마취총 개수 아는 사람',
    author: 'Otkkk011',
    date: '2025.01.12',
    profileImage: profileImage,
    content: `고교생 명탐정 쿠도 신이치는 소꿉친구 모리 란과 트로피컬 랜드로 놀러온 뒤 그 곳에서 일어난 사건을 해결한 뒤 저녁이 되어서 귀가하려다가 웬 수상한 거래 현장을 목격한다. 이후 같이 온 란을 먼저 가라고 등떠밀고 그들을 쫓아간 뒤 몰래 숨어서 현장을 지켜보는데, 거래 현장에 정신이 팔린 나머지 등 뒤에서 다가오는 진의 존재를 알아차리지 못하고 그가 휘두른 방망이에 머리를 맞고 쓰러진다. 이후 진은 의식을 잃어가는 신이치의 입안에 정체 모를 알약을 넣고는 사라져 버린다. 한참 후 놀이공원에 순찰을 다니던 경비원들에게 발견되어 깨어났는데, 그들이 고등학생인 자신을 '꼬마'라고 부르자 황당해했고, 이내 입고 있던 옷이 헐렁해지고 크게 보이는 걸 보고서는 더욱 당황한다. 일단 현장에서 도망친 뒤 본인의 동네에 도달한 후 어느 건물의 유리에 비친 자신의 모습을 보고 결국 자신이 고등학생의 의식을 가진 채 몸만 어린아이로 변했다는 걸 알게 됐고, 자신의 집에 가 해결책을 찾으려고 했지만, 키도 작아지고 어린애가 돼버린 탓에 문을 여는 일도 힘든 상황. 다급히 평소 친하게 지내던 옆집의 아가사 박사를 데려와 도움을 요청한다.`,
    location: 'Teramachi-202 Maehibocho, Konan, Aichi 483-8336 일본',
  };

  const routeData = [
    { id: 1, order: 1, name: '루트루트루트이룰이룰이룰', description: '첫 번째 장소' },
    { id: 2, order: 2, name: '루트루트이룰이룰이룰', description: '두 번째 장소' },
    { id: 3, order: 3, name: '루트루트이룰이룰이룰이룰', description: '세 번째 장소' },
    { id: 4, order: 4, name: '루트루트이룰이룰이룰이룰', description: '네 번째 장소' },
    { id: 5, order: 5, name: '루트루트루트', description: '마지막 장소' },
  ];

  const sortedRouteData = [...routeData].sort((a, b) => a.order - b.order);

  return (
    <Container>
      <BreadcrumbNav>후기 {'>'} 명탐정 코난</BreadcrumbNav>

      <WhiteContainer>
        <HeaderContainer>
          <PostTitle>{reviewData.title}</PostTitle>
          <MetaInfo>
            <Avatar>
              <img src={reviewData.profileImage} alt={`${reviewData.author}의 프로필`} />
            </Avatar>
            <UserInfo>
              <Username>{reviewData.author}</Username>
              <Date>{reviewData.date}</Date>
            </UserInfo>
          </MetaInfo>
        </HeaderContainer>

        <ContentContainer>
          <MainContent>
            <ReviewContent>{reviewData.content}</ReviewContent>
            <MapContainer>
              <MapImage src={mapImage} alt="위치 지도" />
              <LocationText>{reviewData.location}</LocationText>
            </MapContainer>
          </MainContent>

          <SideContent>
            <SaveRouteButton>루트 저장하기</SaveRouteButton>
            <RouteList>
              {sortedRouteData.map((route) => (
                <RouteItem key={route.id}>
                  <RouteNumber>{route.order}</RouteNumber>
                  <RouteName title={route.description}>{route.name}</RouteName>
                </RouteItem>
              ))}
            </RouteList>
            <RouteButtonContainer>
              <Button>루트 지도에서 보기</Button>
              <SupportButton>후기 후원하기</SupportButton>
            </RouteButtonContainer>
          </SideContent>
        </ContentContainer>
      </WhiteContainer>
    </Container>
  );
};

export default ReviewPage5;
