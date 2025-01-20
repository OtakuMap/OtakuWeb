import styled from 'styled-components';
import profile from '../assets/profile.png';
import baseballImage from '../assets/baseball.png';
import vector from '../assets/Vector.png';
import diamondLeft from '../assets/3.png';
import diamondRight from '../assets/2.png';

const Container = styled.div`
  background-color: #0c004b;
  width: 100vw;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`;

const WhiteContainer = styled.div`
  background-color: white;
  width: 90%;
  max-width: 1200px;
  border-radius: 20px;
  padding: 30px;
  margin: 20px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  left: -570px;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0;
  position: relative;
`;

const DiamondLeft = styled.img`
  position: absolute;
  left: -100px;
  width: 100px;
  height: 100px;
  top: -30px;
  object-fit: contain;
`;

const DiamondRight = styled.img`
  position: absolute;
  right: -100px;
  width: 100px;
  height: 100px;
  top: 70px;
  object-fit: contain;
`;

const ProfileImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: white;
  margin-bottom: 10px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const Username = styled.div`
  color: white;
  font-size: 18px;
  margin-bottom: 25px;
`;

const WriteReviewButton = styled.button`
  background-color: #fff5d5;
  border: none;
  border-radius: 20px;
  padding: 8px 24px;
  font-size: 16px;
  cursor: pointer;
  width: 170px;
`;

const SectionTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
`;

const SortOptions = styled.div`
  font-size: 14px;
  color: #666;
`;

const ReviewCard = styled.div`
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  gap: 20px;
`;

const ReviewContent = styled.div`
  flex: 1;
`;

const ReviewTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  color: black;
`;

const ReviewText = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  line-height: 1.5;
`;

const ReviewImage = styled.img`
  width: 200px;
  height: 120px;
  border-radius: 10px;
  object-fit: cover;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
  color: #666;
`;

const PaginationButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;

const ReviewPage6 = () => {
  const profileData = {
    profileImage: profile,
    name: 'Otkkk011',
  };
  const reviewData = [
    {
      id: 1,
      title: '아니 그니까 지금 내가 KBO보다가 고시엔까지 왔다고',
      content:
        "대개의 교과이구구 만화는 천재급 주인공이 특별한 학교에서 어중이떠중이들과 굴러모여 강호를 '열파한다'는 패턴인데, 이 만화에서는 주인공이 예초부터 전통의 강호로 이름난 아구면문하교교에 '스카웃'되어 입학해 3류급 선수에서 후보, 주전급으로 차츰 성장해나가는 괜찮히 현실에 가까운 스토리를 취하고 있다.",
      image: baseballImage,
    },
    {
      id: 2,
      title:
        '키스톤 콤비가 아름다운 이유 다이에이 act2 32화, 거기 다 있다. 말 걸고 싶으면 그거 보고와라.',
      content:
        "대개의 교과이구구 만화는 천재급 주인공이 특별한 학교에서 어중이떠중이들과 굴러모여 강호를 '열파한다'는 패턴인데, 이 만화에서는 주인공이 예초부터 전통의 강호로 이름난 아구면문하교교에 '스카웃'되어 입학해 3류급 선수에서 후보, 주전급으로 차츰 성장해나가는 괜찮히 현실에 가까운 스토리를 취하고 있다.",
      image: baseballImage,
    },
    {
      id: 3,
      title: '2025년 드래프트 기아타이거즈 1차지명 하겠습니다. 세이도 고등학교 포수 미우키 카즈야.',
      content:
        "대개의 교과이구구 만화는 천재급 주인공이 특별한 학교에서 어중이떠중이들과 굴러모여 강호를 '열파한다'는 패턴인데, 이 만화에서는 주인공이 예초부터 전통의 강호로 이름난 아구면문하교교에 '스카웃'되어 입학해 3류급 선수에서 후보, 주전급으로 차츰 성장해나가는 괜찮히 현실에 가까운 스토리를 취하고 있다.",
      image: baseballImage,
    },
  ];
  console.log(diamondLeft, diamondRight); // 경로 출력 확인

  return (
    <Container>
      <ProfileSection>
        <BackButton>
          <img src={vector} alt="뒤로가기 아이콘" />
        </BackButton>
        <DiamondLeft src={diamondLeft} alt="Left Diamond" />
        <ProfileImage>
          <img src={profileData.profileImage} alt={`${profileData.name}의 프로필`} />
        </ProfileImage>
        <DiamondRight src={diamondRight} alt="Right Diamond" />
        <Username>{profileData.name}</Username>
        <WriteReviewButton>후기 쓰기</WriteReviewButton>
      </ProfileSection>

      <WhiteContainer>
        <SectionTitle>
          내 후기
          <SortOptions>최신순 / 조회순</SortOptions>
        </SectionTitle>

        {reviewData.map((review) => (
          <ReviewCard key={review.id}>
            <ReviewContent>
              <ReviewTitle>{review.title}</ReviewTitle>
              <ReviewText>{review.content}</ReviewText>
            </ReviewContent>
            <ReviewImage src={review.image} alt={review.title} />
          </ReviewCard>
        ))}

        <Pagination>
          <PaginationButton>←</PaginationButton>
          1/3
          <PaginationButton>→</PaginationButton>
        </Pagination>
      </WhiteContainer>
    </Container>
  );
};

export default ReviewPage6;
