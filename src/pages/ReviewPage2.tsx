import React from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
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
  align-items: center;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 20px; /* 둥근 검색창 */
  width: 80%;
  max-width: 600px;
  height: 50px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 약간의 그림자 추가 */
`;

const SearchInput = styled.input`
  border: none;
  padding: 10px;
  padding-left: 20px; /* 왼쪽 여백을 추가하여 placeholder 왼쪽으로 이동 */
  width: 100%;
  font-size: 14px;
  border-radius: 20px;
  outline: none; /* 포커스 시 외곽선 제거 */
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  padding: 10px;
  color: #0c004b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px; /* 오른쪽 여백 */
  font-size: 16px;

  &:hover {
    color: #6200ea; /* 호버 시 색상 변경 */
  }
`;

const WhiteContainer = styled.div`
  background-color: white;
  width: 90%;
  max-width: 1200px;
  border-radius: 20px;
  padding: 30px;
  margin: 20px auto;
  box-sizing: border-box; /* padding을 포함한 크기 계산 */
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 20px; /* 양쪽에 여백 추가 */
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  max-width: 100%;
  margin: 0 auto;
  box-sizing: border-box; /* padding을 포함한 크기 계산 */
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #000;
`;

const SortOptionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px; /* 검색 결과와 약간의 간격 추가 */
  padding: 0 20px;
`;

const SortOptions = styled.div`
  font-size: 14px;
  color: #888;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  color: #000;
  margin-bottom: 20px;
  padding-bottom: 10px;
  margin-top: 0px;
  padding-left: 20px; /* 오른쪽 여백 추가 */
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

const ReviewPage2: React.FC = () => {
  return (
    <Container>
      <SearchBar>
        <SearchInput type="text" value="다이아몬드 에이스" readOnly />
        <SearchButton>
          <FaSearch />
        </SearchButton>
      </SearchBar>

      <WhiteContainer>
        <Header>
          <Title>검색 결과</Title>
        </Header>
        <SortOptionsWrapper>
          <SortOptions>최신순 / 조회순</SortOptions>
        </SortOptionsWrapper>

        <SectionTitle>후기 전체 &gt;</SectionTitle>
        <ReviewList>
          {reviewData.map((review) => (
            <ReviewItem key={review.id}>
              <ReviewContent>
                <ReviewTitle>{review.title}</ReviewTitle>
                <ReviewText>{review.content}</ReviewText>
              </ReviewContent>
              <ReviewImageWrapper>
                <ReviewImage src={baseball} alt="" />
              </ReviewImageWrapper>
            </ReviewItem>
          ))}
        </ReviewList>
      </WhiteContainer>
    </Container>
  );
};

export default ReviewPage2;
