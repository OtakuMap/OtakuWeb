import React from 'react';
import styled from 'styled-components';

const reviewData = {
  id: 1,
  title: '유명한이 지금까지 코난한테 맞은 마취총 개수 아는 사람',
  author: 'Otkkk011',
  date: '2025.01.12',
  content: `고교생 명탐정 쿠도 신이치는 소꿉친구 모리 란과 트로피컬 랜드로 놀러온 뒤 그 곳에서 일어난 사건을 해결한 뒤 저녁이 되어서 귀가하려다가 웬 수상한 거래 현장을 목격한다. 이후 같이 온 란을 먼저 가라고 등떠밀고 그들을 쫓아간 뒤 몰래 숨어서 현장을 지켜보는데, 거래 현장에 정신이 팔린 나머지 등 뒤에서 다가오는 진의 존재를 알아차리지 못하고 그가 휘두른 방망이에 머리를 맞고 쓰러진다. 이후 진은 의식을 잃어가는 신이치의 입안에 정체 모를 알약을 넣고는 사라져 버린다. 한참 후 놀이공원에 순찰을 다니던 경비원들에게 발견되어 깨어났는데, 그들이 고등학생인 자신을 '꼬마'라고 부르자 황당해했고, 이내 입고 있던 옷이 헐렁해지고 크게 보이는 걸 보고서는 더욱 당황한다. 일단 현장에서 도망친 뒤 본인의 동네에 도달한 후 어느 건물의 유리에 비친 자신의 모습을 보고 결국 자신이 고등학생의 의식을 가진 채 몸만 어린아이로 변했다는 걸 알게 됐고, 자신의 집에 가 해결책을 찾으려고 했지만, 키도 작아지고 어린애가 돼버린 탓에 문을 여는 일도 힘든 상황. 다급히 평소 친하게 지내던 옆집의 아가사 박사를 데려와 도움을 요청한다.`,
};

const routeData = [
  {
    id: 1,
    order: 1,
    name: '루트루트루트이룰이룰이룰',
    description: '첫 번째 장소',
  },
  {
    id: 2,
    order: 2,
    name: '루트루트이룰이룰이룰',
    description: '두 번째 장소',
  },
  {
    id: 3,
    order: 3,
    name: '루트루트이룰이룰이룰이룰',
    description: '세 번째 장소',
  },
  {
    id: 4,
    order: 4,
    name: '루트루트이룰이룰이룰이룰',
    description: '네 번째 장소',
  },
  {
    id: 5,
    order: 5,
    name: '루트루트루트',
    description: '마지막 장소',
  },
];

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

const PostTitle = styled.h1`
  font-size: 24px;
  color: #000;
  margin-bottom: 30px;
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f0f0f0;
  margin-right: 15px;
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

const ReviewContent = styled.div`
  font-size: 18px;
  line-height: 1.6;
  color: #333;
  padding: 30px 0;
  border-top: 1px solid #252660;
  border-bottom: 1px solid #252660;
`;

const RouteSection = styled.div`
  margin-top: 40px;
`;

const RouteTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const RouteFlow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-left: 30px;
`;

const RouteItem = styled.div`
  background-color: #bdaee5;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const RouteArrow = styled.span`
  color: #252660;
  font-size: 20px;
  margin: 0 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 40px;
  gap: 5px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;

  &.support {
    background-color: #252660;
    color: white;
    border: none;
  }

  &.view-map {
    background-color: #252660;
    color: white;
    border: none;
  }

  &.save-route {
    background-color: #fff5d5;
    border: 0px;
    color: #252660;
  }
`;
const SaveRouteButton = styled.div`
  display: inline-block;
  padding: 8px 16px;
  border-radius: 20px; /* border-radius 추가 */
  font-size: 14px;
  color: black; /* 글씨 색을 검정색으로 변경 */
  background-color: #fff5d5; /* 배경 색상 설정 */
  cursor: pointer;
  margin-top: 10px;
  text-align: right;
  bottom: 10px;
  right: 10px;
  position: absolute;

  &:hover {
    color: #252660;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
`;

const ReviewPage5 = () => {
  const sortedRouteData = [...routeData].sort((a, b) => a.order - b.order);

  return (
    <Container>
      <BreadcrumbNav>후기 {'>'} 명탐정 코난</BreadcrumbNav>

      <WhiteContainer>
        <PostTitle>{reviewData.title}</PostTitle>

        <MetaInfo>
          <Avatar />
          <UserInfo>
            <Username>{reviewData.author}</Username>
            <Date>{reviewData.date}</Date>
          </UserInfo>
        </MetaInfo>

        <ContentWrapper>
          <ReviewContent>
            {reviewData.content}
            <SaveRouteButton>루트 저장하기</SaveRouteButton>
          </ReviewContent>
        </ContentWrapper>

        <RouteSection>
          <RouteTitle>여행 루트</RouteTitle>
          <RouteFlow>
            {sortedRouteData.map((route, index) => (
              <React.Fragment key={route.id}>
                <RouteItem title={route.description}>{route.name}</RouteItem>
                {index < sortedRouteData.length - 1 && <RouteArrow>➜</RouteArrow>}
              </React.Fragment>
            ))}
          </RouteFlow>
        </RouteSection>

        <ButtonContainer>
          <div>
            <Button className="support">후원하기</Button>
          </div>
          <div>
            <Button className="view-map">루트 지도에서 보기</Button>
          </div>
        </ButtonContainer>
      </WhiteContainer>
    </Container>
  );
};

export default ReviewPage5;
