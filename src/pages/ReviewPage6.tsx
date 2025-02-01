import { useState } from 'react';
import profile from '../assets/profile.png';
import baseballImage from '../assets/baseball.png';
import vector from '../assets/Vector.png';
import diamondLeft from '../assets/3.png';
import diamondRight from '../assets/2.png';
import { useNavigate } from 'react-router-dom';
import BackPage from '../assets/BackPage.png';
import NextPage from '../assets/NextPage.png';
import * as S from '../styles/review/ReviewPage.style';

const ReviewPage6 = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;
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
    {
      id: 4,
      title: '아니 그니까 지금 내가 KBO보다가 고시엔까지 왔다고',
      content:
        "대개의 교과이구구 만화는 천재급 주인공이 특별한 학교에서 어중이떠중이들과 굴러모여 강호를 '열파한다'는 패턴인데, 이 만화에서는 주인공이 예초부터 전통의 강호로 이름난 아구면문하교교에 '스카웃'되어 입학해 3류급 선수에서 후보, 주전급으로 차츰 성장해나가는 괜찮히 현실에 가까운 스토리를 취하고 있다.",
      image: baseballImage,
    },
    {
      id: 5,
      title:
        '키스톤 콤비가 아름다운 이유 다이에이 act2 32화, 거기 다 있다. 말 걸고 싶으면 그거 보고와라.',
      content:
        "대개의 교과이구구 만화는 천재급 주인공이 특별한 학교에서 어중이떠중이들과 굴러모여 강호를 '열파한다'는 패턴인데, 이 만화에서는 주인공이 예초부터 전통의 강호로 이름난 아구면문하교교에 '스카웃'되어 입학해 3류급 선수에서 후보, 주전급으로 차츰 성장해나가는 괜찮히 현실에 가까운 스토리를 취하고 있다.",
      image: baseballImage,
    },
    {
      id: 6,
      title: '2025년 드래프트 기아타이거즈 1차지명 하겠습니다. 세이도 고등학교 포수 미우키 카즈야.',
      content:
        "대개의 교과이구구 만화는 천재급 주인공이 특별한 학교에서 어중이떠중이들과 굴러모여 강호를 '열파한다'는 패턴인데, 이 만화에서는 주인공이 예초부터 전통의 강호로 이름난 아구면문하교교에 '스카웃'되어 입학해 3류급 선수에서 후보, 주전급으로 차츰 성장해나가는 괜찮히 현실에 가까운 스토리를 취하고 있다.",
      image: baseballImage,
    },
    {
      id: 7,
      title: '아니 그니까 지금 내가 KBO보다가 고시엔까지 왔다고',
      content:
        "대개의 교과이구구 만화는 천재급 주인공이 특별한 학교에서 어중이떠중이들과 굴러모여 강호를 '열파한다'는 패턴인데, 이 만화에서는 주인공이 예초부터 전통의 강호로 이름난 아구면문하교교에 '스카웃'되어 입학해 3류급 선수에서 후보, 주전급으로 차츰 성장해나가는 괜찮히 현실에 가까운 스토리를 취하고 있다.",
      image: baseballImage,
    },
    {
      id: 8,
      title:
        '키스톤 콤비가 아름다운 이유 다이에이 act2 32화, 거기 다 있다. 말 걸고 싶으면 그거 보고와라.',
      content:
        "대개의 교과이구구 만화는 천재급 주인공이 특별한 학교에서 어중이떠중이들과 굴러모여 강호를 '열파한다'는 패턴인데, 이 만화에서는 주인공이 예초부터 전통의 강호로 이름난 아구면문하교교에 '스카웃'되어 입학해 3류급 선수에서 후보, 주전급으로 차츰 성장해나가는 괜찮히 현실에 가까운 스토리를 취하고 있다.",
      image: baseballImage,
    },
    {
      id: 9,
      title: '2025년 드래프트 기아타이거즈 1차지명 하겠습니다. 세이도 고등학교 포수 미우키 카즈야.',
      content:
        "대개의 교과이구구 만화는 천재급 주인공이 특별한 학교에서 어중이떠중이들과 굴러모여 강호를 '열파한다'는 패턴인데, 이 만화에서는 주인공이 예초부터 전통의 강호로 이름난 아구면문하교교에 '스카웃'되어 입학해 3류급 선수에서 후보, 주전급으로 차츰 성장해나가는 괜찮히 현실에 가까운 스토리를 취하고 있다.",
      image: baseballImage,
    },
  ];
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviewData.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviewData.length / reviewsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <S.Container>
      <S.ProfileSection>
        <S.BackButton>
          <img src={vector} alt="뒤로가기 아이콘" />
        </S.BackButton>
        <S.DiamondLeft src={diamondLeft} alt="Left Diamond" />
        <S.ProfileImage6>
          <img src={profileData.profileImage} alt={`${profileData.name}의 프로필`} />
        </S.ProfileImage6>
        <S.DiamondRight src={diamondRight} alt="Right Diamond" />
        <S.Username6>{profileData.name}</S.Username6>
        <S.WriteReviewButton onClick={() => navigate('/review7')}>후기 쓰기</S.WriteReviewButton>
      </S.ProfileSection>

      <S.WhiteContainer6>
        <S.SectionTitle6>
          내 후기
          <S.SortOptions>최신순 / 조회순</S.SortOptions>
        </S.SectionTitle6>

        {currentReviews.map((review) => (
          <S.ReviewCard6 key={review.id}>
            <S.ReviewContent6>
              <S.ReviewTitle6>{review.title}</S.ReviewTitle6>
              <S.ReviewText6>{review.content}</S.ReviewText6>
            </S.ReviewContent6>
            <S.ReviewImage6 src={review.image} alt={review.title} />
          </S.ReviewCard6>
        ))}
      </S.WhiteContainer6>
      <S.Pagination>
        <S.PaginationButton onClick={handlePrevPage} disabled={currentPage === 1}>
          <img src={BackPage} alt="이전 페이지" />
        </S.PaginationButton>
        {currentPage}/{totalPages}
        <S.PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages}>
          <img src={NextPage} alt="다음 페이지" />
        </S.PaginationButton>
      </S.Pagination>
    </S.Container>
  );
};

export default ReviewPage6;
