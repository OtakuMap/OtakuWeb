import styled from 'styled-components';
import { MapPin } from 'lucide-react';
import baseball from '../assets/baseball.png';

const reviewData = [
  {
    id: 1,
    title: '아니 그니까 지금 내가 KBO보다가 고시엔까지 왔다고',
    content:
      "대개의 교과이구구 만화는 천재급 주인공이 특별한 학교에서 어중이떠중이들과 굴러모여 강호를 '열파한다'는 패턴인데, 이 만화에서는 주인공이 예초부터 전통의 강호로 이름난 아구면문하교교에 '스카웃'되어 입학해 3류급 선수에서 후보, 주전급으로 차츰 성장해나가는 괜찮히 현실에 가까운 스토리를 취하고 있다.",
  },
  {
    id: 2,
    title:
      '키스톤 콤비가 아름다운 이유 다이에이 act2 32화, 거기 다 있다. 말 걸고 싶으면 그거 보고와라.',
    content:
      "대개의 교과이구구 만화는 천재급 주인공이 특별한 학교에서 어중이떠중이들과 굴러모여 강호를 '열파한다'는 패턴인데, 이 만화에서는 주인공이 예초부터 전통의 강호로 이름난 아구면문하교교에 '스카웃'되어 입학해 3류급 선수에서 후보, 주전급으로 차츰 성장해나가는 괜찮히 현실에 가까운 스토리를 취하고 있다.",
  },
  {
    id: 3,
    title: '2025년 드래프트 기아타이거즈 1차지명 하겠습니다. 세이도 고등학교 포수 미우키 카즈야.',
    content:
      "대개의 교과이구구 만화는 천재급 주인공이 특별한 학교에서 어중이떠중이들과 굴러모여 강호를 '열파한다'는 패턴인데, 이 만화에서는 주인공이 예초부터 전통의 강호로 이름난 아구면문하교교에 '스카웃'되어 입학해 3류급 선수에서 후보, 주전급으로 차츰 성장해나가는 괜찮히 현실에 가까운 스토리를 취하고 있다.",
  },
  {
    id: 4,
    title: '2025년 드래프트 기아타이거즈 1차지명 하겠습니다. 세이도 고등학교 포수 미우키 카즈야.',
    content:
      "대개의 교과이구구 만화는 천재급 주인공이 특별한 학교에서 어중이떠중이들과 굴러모여 강호를 '열파한다'는 패턴인데, 이 만화에서는 주인공이 예초부터 전통의 강호로 이름난 아구면문하교교에 '스카웃'되어 입학해 3류급 선수에서 후보, 주전급으로 차츰 성장해나가는 괜찮히 현실에 가까운 스토리를 취하고 있다.",
  },
];

const Container = styled.div`
  background-color: #0c004b;
  width: 100vw;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  margin-top: 60px;
`;

const ContentWrapper = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

const LocationBar = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 20px;
  height: 50px;
  margin-bottom: 10px;
  padding: 0 20px;
  width: 400px; /* 길이 조정 */
  position: relative; /* 위치 설정을 위해 relative 추가 */
`;

const LocationInput = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LocationText = styled.input`
  border: none;
  padding: 10px;
  width: 100%;
  font-size: 14px;
  outline: none;
`;

const SaveLocationButton = styled.button`
  background-color: #e6e0ff;
  color: #000;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  position: absolute;
  right: -130px; /* 오른쪽 끝에 배치 */
  top: 50%; /* 세로 중앙 */
  transform: translateY(-50%); /* 정확히 중앙 정렬 */
`;

const DropdownButton = styled.div`
  background-color: #0c004b;
  color: white;
  border: 1px solid white;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  display: inline-block;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Tag = styled.div`
  background-color: #e6e0ff;
  color: #000;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
`;

const WhiteContainer = styled.div`
  background-color: white;
  width: 100%;
  border-radius: 20px;
  padding: 30px;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  color: black;
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ReviewItem = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const ReviewContent = styled.div`
  flex: 1;
`;

const ReviewTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-bottom: 10px;
`;

const ReviewText = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.5;
`;

const ReviewImageWrapper = styled.div`
  width: 200px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
`;

const ReviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ReviewPage3 = () => {
  return (
    <Container>
      <ContentWrapper>
        <LocationBar>
          <LocationInput>
            <MapPin size={20} color="#0c004b" />
            <LocationText value="Hanshin Koshien Stadium" readOnly />
          </LocationInput>
          <SaveLocationButton>명소 저장하기</SaveLocationButton>
        </LocationBar>

        <DropdownButton>다이아몬드 에이스 ▼</DropdownButton>
        <TagContainer>
          <Tag>#다이에이</Tag>
          <Tag>#고시엔</Tag>
          <Tag>#아구에니</Tag>
        </TagContainer>

        <WhiteContainer>
          <Header>
            <div>한 줄 후기 &gt; ⭐️⭐️⭐️⭐️</div>
            <div>최신순 / 조회순</div>
          </Header>

          <ReviewList>
            {reviewData.map((review) => (
              <ReviewItem key={review.id}>
                <ReviewContent>
                  <ReviewTitle>{review.title}</ReviewTitle>
                  <ReviewText>{review.content}</ReviewText>
                </ReviewContent>
                <ReviewImageWrapper>
                  <ReviewImage src={baseball} alt="Review" />
                </ReviewImageWrapper>
              </ReviewItem>
            ))}
          </ReviewList>
        </WhiteContainer>
      </ContentWrapper>
    </Container>
  );
};

export default ReviewPage3;
