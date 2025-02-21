// ReviewPage6.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/reduxHooks';
import { openLoginModal } from '@/store/slices/modalSlice';
import { getUserProfile, getUserReviews } from '@/api/review/user';
import { UserProfile, UserReview } from '@/types/review/user';
import * as S from '../styles/review/ReviewPage.style';

// Assets
import vector from '../assets/Vector.png';
import diamondLeft from '../assets/3.png';
import diamondRight from '../assets/2.png';
import BackPage from '../assets/BackPage.png';
import NextPage from '../assets/NextPage.png';

const ReviewPage6 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<'createdAt' | 'views'>('createdAt');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        if (response.isSuccess) {
          setUserProfile(response.result);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('프로필 정보를 불러오는데 실패했습니다.');
      }
    };

    if (isLoggedIn) {
      fetchUserProfile();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchUserReviews = async () => {
      setLoading(true);
      try {
        const response = await getUserReviews(currentPage, sortOption);
        if (response.isSuccess) {
          setUserReviews(response.result.reviews);
          setTotalPages(response.result.totalPages);
        }
      } catch (error) {
        console.error('Error fetching user reviews:', error);
        setError('후기를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchUserReviews();
    }
  }, [currentPage, sortOption, isLoggedIn]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleSortChange = (newSort: 'createdAt' | 'views') => {
    setSortOption(newSort);
    setCurrentPage(1); // 정렬 변경 시 첫 페이지로 이동
  };

  const handleWriteReviewClick = () => {
    if (!isLoggedIn) {
      dispatch(openLoginModal());
      return;
    }
    navigate('/review7');
  };

  if (!isLoggedIn) {
    return <div>로그인이 필요합니다.</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <S.Container>
      <S.ProfileSection>
        <S.BackButton onClick={() => navigate('/')}>
          <img src={vector} alt="뒤로가기 아이콘" />
        </S.BackButton>
        <S.DiamondLeft src={diamondLeft} alt="Left Diamond" />
        <S.ProfileImage6>
          <img src={userProfile?.profileImageUrl} alt="프로필" />
        </S.ProfileImage6>
        <S.DiamondRight src={diamondRight} alt="Right Diamond" />
        <S.Username6>{userProfile?.nickname}</S.Username6>
        <S.WriteReviewButton onClick={handleWriteReviewClick}>후기 쓰기</S.WriteReviewButton>
      </S.ProfileSection>

      <S.WhiteContainer>
        <S.Header>
          <S.BTitle>내 후기</S.BTitle>
        </S.Header>
        <S.SortOptionsWrapper>
          <S.SortOptions>
            <span
              onClick={() => handleSortChange('createdAt')}
              style={{
                cursor: 'pointer',
                fontWeight: sortOption === 'createdAt' ? 'bold' : 'normal',
              }}
            >
              최신순
            </span>
            {' / '}
            <span
              onClick={() => handleSortChange('views')}
              style={{ cursor: 'pointer', fontWeight: sortOption === 'views' ? 'bold' : 'normal' }}
            >
              조회순
            </span>
          </S.SortOptions>
        </S.SortOptionsWrapper>

        <S.BSectionTitle>후기 전체 &gt;</S.BSectionTitle>
        {loading ? (
          <div>로딩 중...</div>
        ) : (
          <S.ReviewList>
            {userReviews.map((review) => (
              <S.ReviewItem
                key={review.reviewId}
                onClick={() => navigate(`/review/${review.reviewId}`)}
              >
                <S.ReviewContent>
                  <S.ReviewTitle>{review.title}</S.ReviewTitle>
                  <S.ReviewText>{review.content}</S.ReviewText>
                </S.ReviewContent>
                <S.ReviewImageWrapper>
                  <S.ReviewImage src={review.thumbnail} alt={review.title} />
                </S.ReviewImageWrapper>
              </S.ReviewItem>
            ))}
          </S.ReviewList>
        )}
      </S.WhiteContainer>

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
