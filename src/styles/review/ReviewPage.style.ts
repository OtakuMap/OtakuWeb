import styled from 'styled-components';

const IPHONE_15_BREAKPOINT = '430px';

// Common styles
export const Container = styled.div`
  background-color: #0c004b;
  color: white;
  font-family: 'Arial', sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 60px;
  overflow-x: hidden;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    margin-top: 30px;
  }
`;

export const NavigationWrapper = styled.div`
  width: calc(100% - 112px);
  margin: 0 56px;
  align-self: flex-start; // 추가: 부모의 중앙 정렬을 무시하고 왼쪽 정렬을 강제

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: calc(100% - 40px);
    margin: 0 20px;
  }
`;

export const WhiteContainer = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 30px;
  margin: 10px 56px 40px 56px;
  box-sizing: border-box;
  width: calc(100% - 112px);
  min-height: 1182px; // 최소 높이는 유지하면서
  height: auto; // 내용에 따라 높이 조절

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    padding: 20px;
    margin: 0px 20px 20px 20px;
    width: calc(100% - 40px);
    height: auto;
  }
`;
export const WhiteContainer6 = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 30px;
  margin: 0px 56px 40px 56px;
  box-sizing: border-box;
  width: calc(100% - 112px);
  height: 1050px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    padding: 20px;
    margin: 0px 20px 20px 20px;
    width: calc(100% - 40px);
    height: auto;
  }
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  max-width: 100%;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    padding: 0 15px;
    flex-direction: column;
    gap: 10px;
  }
`;

export const BHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  max-width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  color: black;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    padding: 0 15px;
    flex-direction: column;
    gap: 10px;
  }
`;

// ReviewPage1 specific styles
export const DeleteIcon = styled.img`
  width: 12px;
  height: 12px;
  cursor: pointer;
`;

export const ImageWrapper = styled.div<{ src: string }>`
  position: relative;
  display: inline-block;
  width: 100%;
  height: 200px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.7));
    border-radius: 8px;
  }
`;
export const SectionTitle6 = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin: 0px 0px 20px 53px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    font-size: 18px;
    margin: 0px 0px 15px 20px;
  }
`;
export const SectionTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  text-align: left;
  margin-left: 20px;
  display: flex;
  align-items: center;
  line-height: 1.5;
`;
export const BSectionTitle = styled.h2`
  margin-bottom: 20px;
  text-align: left;
  margin-left: 20px;
  display: flex;
  align-items: center;
  line-height: 1.5;
  color: black;
  font-family: Gothic A1;
  font-size: 24px;
  font-weight: 600;
  line-height: 30px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    font-size: 20px;
    line-height: 26px;
    margin-left: 15px;
    margin-bottom: 15px;
  }
`;

export const Image = styled.img`
  width: 25px;
  height: auto;
  margin-right: 15px;
  vertical-align: middle;
  display: inline-block;
  align-self: center;
`;

export const SearchWrapper = styled.div`
  width: 671px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 90%;
    margin-bottom: 15px;
  }
`;

export const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  margin-top: 20px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    margin-top: 10px;
  }
`;

export const ErrorMessage = styled.div`
  color: #ff6b6b;
  text-align: center;
  padding: 1rem;
  margin: 1rem 0;
  background-color: #fff5f5;
  border-radius: 4px;
  border: 1px solid #ffc9c9;
`;

export const ReviewTypeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #0c004b;
  font-weight: bold;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

export const SearchInput = styled.input`
  border: none;
  padding: 10px;
  padding-left: 20px;
  width: 100%;
  font-size: 14px;
  border-radius: 20px;
  outline: none;
  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    font-size: 13px;
    padding: 8px;
    padding-left: 15px;
  }
`;

export const SearchButton = styled.button`
  background: none;
  border: none;
  padding: 10px;
  color: #0c004b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  font-size: 16px;

  &:hover {
    color: #6200ea;
  }
`;

export const RecentSearch = styled.div`
  width: 671px;
  margin-top: 20px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 100%;
    margin-top: 15px;
  }
`;

export const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
  padding-bottom: 15px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.5);

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    font-size: 16px;
    padding-bottom: 10px;
  }
`;
export const BTitle = styled.h2`
  margin-bottom: 10px;
  padding-bottom: 15px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.5);
  color: black;
  font-family: Gothic A1;
  font-size: 30px;
  font-weight: 700;
  line-height: 37.5px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    font-size: 24px;
    line-height: 30px;
    padding-bottom: 10px;
  }
`;

export const SearchList = styled.ul`
  list-style: none;
  padding: 0;
  background-color: #0c004b;
`;

export const SearchItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  background-color: #0c004b;
  padding: 10px;
  border-radius: 4px;
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
`;

export const SearchText = styled.span`
  flex-grow: 1;
  margin-left: 10px;
`;

export const SearchDate = styled.span`
  font-size: 12px;
  color: white;
`;
export const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
`;

export const ReviewCard = styled.div`
  background-color: #0c004b;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
`;

export const TopReviews = styled.div`
  width: 1200px;
  margin-top: 10px;
  padding-left: 20px;
  padding-right: 20px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 100%;
    padding: 0 15px;
  }
`;
export const Rank = styled.div`
  position: absolute;
  left: 10px;
  bottom: 10px;
  font-size: 40px; /* 숫자 크기 키우기 */
  font-weight: bold;
  color: black;
  z-index: 10; /* 숫자가 그라데이션보다 위에 표시되도록 설정 */
`;

export const Description = styled.p`
  font-size: 18.5px;
  font-weight: bold; /* 글씨를 두껍게 */
  word-wrap: break-word;
  overflow-wrap: break-word;
  margin-top: 10px;
`;

// ReviewPage2 & 3 specific styles
export const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    gap: 15px;
  }
`;

export const ReviewItem = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    flex-direction: column;
    gap: 15px;
    padding: 15px;
  }
`;

export const ReviewContent = styled.div`
  flex: 1;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 100%;
  }
`;

export const ReviewTitle = styled.h3`
  font-size: 25px;
  font-weight: bold;
  color: #000;
  margin-bottom: 26px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    font-size: 20px;
    margin-bottom: 15px;
  }
`;

// export const ReviewText = styled.p`
//   font-size: 20px;
//   color: #605f5f;
//   line-height: 1.5;
//   width: 1000px;
//   height: 125px;
// `;

export const ReviewText = styled.p`
  font-size: 20px;
  color: #605f5f;
  line-height: 1.5;
  width: 1000px;
  height: 125px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 100%;
    font-size: 16px;
    height: auto;
    min-height: 80px;
  }
`;

export const ReviewImageWrapper = styled.div`
  width: 349px;
  height: 189px;
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 100%;
    height: 150px;
  }
`;

export const ReviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export const SortOptionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px; /* 검색 결과와 약간의 간격 추가 */
  padding: 0 20px;
`;

export const SortOptions = styled.div`
  font-size: 14px;
  color: #888;
`;
export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 20px; /* 둥근 검색창 */
  width: 80%;
  margin-top: 20px;
  max-width: 600px;
  height: 50px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 약간의 그림자 추가 */
`;
// ReviewPage3 specific styles
export const ContentWrapper = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 95%;
  }
`;

export const LocationBar = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 20px;
  height: 50px;
  margin-bottom: 10px;
  margin-top: 20px;
  padding: 0 20px;
  width: 400px;
  position: relative;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 100%;
    height: 40px;
    padding: 0 15px;
  }
`;

export const LocationInput = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const LocationText = styled.input`
  border: none;
  padding: 10px;
  width: 100%;
  font-size: 14px;
  outline: none;
`;

export const SaveLocationButton = styled.button`
  background-color: #e6e0ff;
  color: #000;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  position: absolute;
  right: -130px;
  top: 50%;
  transform: translateY(-50%);
`;

export const DropdownButton = styled.div`
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

export const TagContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

export const Tag = styled.div`
  background-color: #e6e0ff;
  color: #000;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
`;

// ReviewPage4 specific styles

export const WhiteContainer4 = styled.div`
  background-color: #0c004b;
  width: 100%;
  border-radius: 20px;
  padding: 30px;
  box-sizing: border-box;
  color: white;
`;

export const StarRatingInput = styled.div`
  display: flex;
  gap: 4px;
  height: 32px;

  span {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`;

export const ReviewStarRating = styled.div`
  display: flex;
  gap: 4px;
  height: 32px;

  span {
    display: flex;
    align-items: center;
  }
`;

export const FeedbackSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 100px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    flex-direction: column;
    gap: 20px;
    margin-bottom: 15px;
  }
`;

export const FeedbackInput = styled.textarea`
  width: 800px;
  height: 150px;
  border-radius: 10px;
  border: none;
  padding: 10px;
  font-size: 14px;
  resize: none;
  box-sizing: border-box;
  outline: none;
  color: black;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 100%;
    height: 120px;
    font-size: 13px;
  }
`;

export const ProfileContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 20px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    margin-left: 10px;
    gap: 5px;
  }
`;

export const ProfileImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: gray;
  margin-bottom: 10px;
  object-fit: cover;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 50px;
    height: 50px;
    margin-bottom: 5px;
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ProfileName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: white;
`;

export const ReviewProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-left: 20px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    gap: 15px;
    margin-left: 10px;
  }
`;

export const ReviewProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: gray;
  margin-bottom: 0px;
  object-fit: cover;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 40px;
    height: 40px;
  }
`;

export const ReviewProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ReviewProfileName = styled.div`
  font-size: 15px;
  margin-left: 5px;
  color: black;
  text-align: left;
`;

export const SubmitButton = styled.button`
  position: absolute;
  right: 20px;
  bottom: 20px;
  background: white;
  color: black;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  z-index: 2;

  &:focus {
    outline: none;
    border: none;
  }
`;

export const EditDeleteButtons = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: flex;
  gap: 0px;
  outline: none;
  margin-left: 5px;
`;

export const ActionButton = styled.button`
  background: white;
  color: black;
  border: none;
  border-radius: 4px;
  padding: 1px 1px;
  font-size: 12px;
  cursor: pointer;
  outline: none;
  color: #464654;
  font-family: 'Gothic A1';
  font-weight: 500;
  word-wrap: break-word;

  &:focus {
    outline: none;
    border: none;
  }

  &:hover {
    background: #f5f5f5;
  }
`;
export const ReviewGrid4 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 60px;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    grid-template-columns: repeat(1, 1fr);
    gap: 15px;
    margin-top: 30px;
  }
`;

export const ReviewContent4 = styled.p`
  font-size: 18px; /* 글씨 크기 증가 */
  font-weight: bold; /* 글자 두껍게 */
  margin: 10px 0; /* 여백 추가 (필요에 따라 조정) */
  color: black; /* 글자 색상 */
  text-align: left;
  white-space: pre-line;
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: 'Gothic A1';
  font-weight: '600';
  word-wrap: 'break-word';

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    font-size: 16px;
    margin: 15px 0;
  }
`;
export const ReviewItem4 = styled.div`
  background-color: white;
  color: #000;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  font-size: 14px;
  width: 250px;
  min-height: 250px;
  position: relative;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 100%;
    min-height: 200px;
    padding: 12px;
  }
`;

export const FeedbackButtonsWrapper = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

export const FeedbackButton = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  gap: 10px;
  &:hover {
    opacity: 0.8;
  }
  outline: none;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const ButtonDivider = styled.img`
  height: 17px;
  margin: 5px;
`;

export const InlineEditTextArea = styled.textarea`
  width: 100%;
  height: 120px;
  outline: none;
  border-radius: 8px;
  font-size: 18px;
  margin-top: 20px;
  line-height: 1.5;
  color: black;
  font-weight: bold;
  resize: none;
  margin: 10px 0;
  font-family: inherit;
  overflow-y: auto;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
  color: white;
  margin-bottom: 20px;
`;

export const PaginationButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;

  &:disabled {
    cursor: not-allowed;
  }

  img {
    width: 8px;
    height: 15px;
  }
`;

// ReviewPage5 specific styles

export const BreadcrumbNav = styled.div`
  width: 90%;
  max-width: 1200px;
  color: white;
  font-size: 24px;
  margin: 32px 0px 20px 56px; /* top right bottom left */
  text-align: left;
  align-self: flex-start;
`;

export const HeaderContainer = styled.div`
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #252660;
`;

export const PostTitle = styled.h1`
  font-size: 24px;
  color: #000;
  margin-bottom: 32px;
`;

export const MetaInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const Avatar = styled.div`
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

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Username = styled.span`
  font-weight: bold;
  margin-bottom: 5px;
  color: black;
`;
export const Username6 = styled.span`
  font-weight: bold;
  margin-bottom: 5px;
  color: white;
`;

export const Date = styled.span`
  color: #666;
  font-size: 14px;
`;

export const ContentContainer = styled.div`
  display: flex;
  gap: 32px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const MainContent = styled.div`
  flex: 1;
  max-width: 70%;
`;

export const MapContainer = styled.div`
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  img {
    width: 500px;
    height: 500px;
    object-fit: cover;
    border-radius: 8px;

    @media (max-width: ${IPHONE_15_BREAKPOINT}) {
      width: 100%;
      height: 300px;
    }
  }
`;

export const MapImage = styled.img`
  width: 80%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 10px;
`;

export const LocText = styled.p`
  color: #666;
  font-size: 14px;
  margin-top: 8px;
`;

export const SideContent = styled.div`
  flex: 0.5;
  width: 250px;
  padding-left: 20px;
  border-left: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 100%;
    padding-left: 0;
    border-left: none;
    border-top: 1px solid #e0e0e0;
    margin-top: 20px;
    padding-top: 20px;
  }
`;

export const SaveRouteButton = styled.button`
  width: 204px;
  height: 76px;
  padding: 8px 16px;
  border-radius: 20px;
  color: black;
  background-color: #bdaee5;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
  opacity: 0px;
  font-family: Gothic A1;
  font-size: 18px;
  font-weight: 700;
  line-height: 25px;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

export const RouteList = styled.div`
  max-height: calc(30px * 5 + 30px * 5);
  overflow-y: auto;
  width: 100%;
  margin-top: 10px;
  padding-right: 16px;
  box-sizing: content-box;
`;

export const RouteItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  gap: 10px;
`;

export const RouteNumber = styled.div`
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

export const RouteName = styled.div`
  background-color: #f5f5f5;
  padding: 8px 15px;
  border-radius: 15px;
  font-size: 14px;
  flex: 1;
  color: black;
`;

export const RouteButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
`;

export const Button = styled.button`
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

export const ReviewContext = styled.div`
  font-family: Gothic A1;
  font-size: 20px;
  font-weight: 500;
  line-height: 40px;
  letter-spacing: 0.03em;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #000000;
`;

export const SupportButton = styled(Button)`
  background-color: #ffc50c;
  color: #252660;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 30px 40px;
  border-radius: 20px;
  width: 606px;
  height: 152px;
  display: flex;
  flex-direction: column;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 90%;
    padding: 20px;
    height: auto;
    min-height: 120px;
  }
`;

export const ModalTitle = styled.div`
  color: black;
  font-size: 24px;
  padding-bottom: 15px;
  border-bottom: 1px solid #000;
  text-align: center;
  font-family: 'Gothic A1';
  font-weight: 600;
  word-wrap: break-word;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 150px;
  margin-top: 15px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    gap: 50px;
    margin-top: 10px;
  }
`;

export const ModalButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: black;
  padding: 10px;
  font-family: 'Gothic A1';
  font-weight: 600;
  word-wrap: break-word;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    font-size: 16px;
    padding: 8px;
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  left: -600px;
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0;
  position: relative;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    margin: 20px 0;
  }
`;

export const DiamondLeft = styled.img`
  position: absolute;
  left: -100px;
  width: 100px;
  height: 100px;
  top: -30px;
  object-fit: contain;
`;

export const DiamondRight = styled.img`
  position: absolute;
  right: -100px;
  width: 100px;
  height: 100px;
  top: 70px;
  object-fit: contain;
`;

export const WriteReviewButton = styled.button`
  background-color: #fff5d5;
  border: none;
  border-radius: 20px;
  padding: 8px 24px;
  font-size: 16px;
  cursor: pointer;
  width: 170px;
`;
export const ProfileImage6 = styled.div`
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

// ReviewPage7 specific styles
export const ContentContainer7 = styled.div`
  display: flex;
  gap: 32px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const HeaderContainer7 = styled.div`
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #252660;
`;

export const TitleInput = styled.input`
  width: 100%;
  font-size: 24px;
  padding: 10px;
  margin-bottom: 30px;
  border-radius: 8px;
  border: none;
  outline: none;

  &::placeholder {
    color: #999;
  }
`;

export const ContentTextArea = styled.textarea`
  width: 100%;
  height: 400px;
  padding: 15px;
  font-size: 16px;
  line-height: 1.6;
  border-radius: 8px;
  resize: vertical;
  border: none;
  outline: none;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    height: 250px;
    padding: 12px;
    font-size: 14px;
  }

  &::placeholder {
    color: #999;
  }
`;

export const RouteSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    gap: 10px;
    width: 100%;
  }
`;

export const RouteItem7 = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  padding-right: 40px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    padding-right: 30px;
    gap: 8px;
  }
`;

export const RouteInput = styled.input`
  flex: 1;
  padding: 8px 15px;
  border-radius: 15px;
  border: 1px solid #bdaee5;
  font-size: 14px;
`;

export const DeleteButton7 = styled.button`
  background: none;
  border: none;
  color: black;
  cursor: pointer;
  font-size: 18px;
  padding: 5px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

export const AddSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 20px;
  cursor: pointer;
  margin-top: 10px;
`;

export const AddPic = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

export const AddMap = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

export const UploadButton = styled.button`
  padding: 12px 24px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  max-width: 200px;
  background-color: #ffc50c;
  color: black;
  border: none;
  font-weight: 700;
  margin-top: 10px;
  align-self: center;
`;

export const Button7 = styled.button`
  padding: 12px 24px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  max-width: 200px;
  background-color: #ffc50c;
  color: black;
  border: none;
  font-weight: 700;
  margin-top: 10px;
  align-self: center;
`;

export const SelectText = styled.span`
  color: #0c004b;
`;

export const ArrowIcon = styled.span`
  color: #0c004b;
`;
export const SelectBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
  width: 100%;
  min-width: 350px;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    min-width: 100%;
    margin: 15px 0;
  }
`;

export const SelectBox = styled.div`
  position: relative;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  color: #0c004b;
  width: 100%;
`;

export const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  z-index: 1;
  width: 100%;
  min-width: 100%;
`;

export const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  color: #0c004b;
  &:hover {
    background: #f5f5f5;
  }
  width: 100%;
`;

export const SeInput = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-bottom: 1px solid #ddd;
  &:focus {
    outline: none;
  }
`;
export const ReviewFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px; /* SelectBoxContainer와 RouteSection 사이 간격 조절 */
`;
export const NoResults = styled.div`
  width: 100%;
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1rem;
`;
export const DropdownContainer3 = styled.div`
  position: relative;
  width: 200px;
  margin: 10px 0;
`;

export const DropdownButton3 = styled.button`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
`;

export const DropdownList3 = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ddd;
  border-top: none;
  border-radius: 0 0 4px 4px;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const DropdownItem3 = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
  color: black;
`;

// styles/review/ReviewPage.style.ts에 추가

export const LoadingText = styled.div`
  padding: 8px;
  text-align: center;
  color: #666;
`;

export const NoResult = styled.div`
  padding: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const AddButton = styled.button`
  background-color: #0066cc;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 4px;

  &:hover {
    background-color: #0052a3;
  }
`;

// styles/review/ReviewPage.style.ts
export const AddLocationButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #f0f0f0;
  border: 1px;
  border-radius: 8px;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
    color: #999;
  }

  &:hover:not(:disabled) {
    background-color: #e0e0e0;
  }
`;

export const ModalOverlay5 = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent5 = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
`;

export const PurchaseModal = styled(ModalContent)`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const BlurredContent = styled.div<{ $isBlurred: boolean }>`
  filter: ${(props) => (props.$isBlurred ? 'blur(10px)' : 'none')};
  pointer-events: ${(props) => (props.$isBlurred ? 'none' : 'auto')};
  position: relative;
`;

export const PurchaseOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 10;
`;
