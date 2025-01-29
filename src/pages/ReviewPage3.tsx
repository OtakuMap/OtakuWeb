import { MapPin } from 'lucide-react';
import baseball from '../assets/baseball.png';
import * as S from '../styles/review/ReviewPage.style';
import { useNavigate } from 'react-router-dom';

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

const ReviewPage3 = () => {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.NavigationWrapper>
        <S.LocationBar>
          <S.LocationInput>
            <MapPin size={20} color="#0c004b" />
            <S.LocationText value="Hanshin Koshien Stadium" readOnly />
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
          <div>한 줄 후기 &gt; ⭐️⭐️⭐️⭐️</div>
          <div>최신순 / 조회순</div>
        </S.BHeader>

        <S.ReviewList>
          {reviewData.map((review) => (
            <S.ReviewItem key={review.id}>
              <S.ReviewContent>
                <S.ReviewTitle>{review.title}</S.ReviewTitle>
                <S.ReviewText>{review.content}</S.ReviewText>
              </S.ReviewContent>
              <S.ReviewImageWrapper>
                <S.ReviewImage src={baseball} alt="Review" />
              </S.ReviewImageWrapper>
            </S.ReviewItem>
          ))}
        </S.ReviewList>
      </S.WhiteContainer>
    </S.Container>
  );
};

export default ReviewPage3;
