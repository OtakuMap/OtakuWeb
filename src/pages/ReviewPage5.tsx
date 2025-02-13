import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/reduxHooks';
import { openLoginModal } from '@/store/slices/modalSlice';
import { saveRoute } from '@/api/review/route';
import { getReviewDetail } from '@/api/review/review';
import defaultProfileImage from '../assets/profile.png';
import * as S from '../styles/review/ReviewPage.style';
import { ReviewDetail, ReviewType } from '@/types/review/review';
import { RouteData } from '@/types/review/route';
import { RouteSource } from '@/types/map/routeSource';
// import axios from 'axios';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const ReviewPage5 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const [isSaving, setIsSaving] = useState(false);
  const [reviewData, setReviewData] = useState<ReviewDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { reviewId } = useParams();
  const [searchParams] = useSearchParams();
  const type = (searchParams.get('type') as ReviewType) || 'PLACE';

  useEffect(() => {
    const fetchReviewDetail = async () => {
      if (!reviewId) return;

      try {
        setIsLoading(true);
        const response = await getReviewDetail(Number(reviewId), type);
        if (response.isSuccess) {
          setReviewData(response.result);
        } else {
          setError(response.message);
        }
      } catch (error) {
        console.error('Error fetching review:', error);
        setError('후기를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviewDetail();
  }, [reviewId, type]);

  const handleSaveRoute = async () => {
    if (!isLoggedIn) {
      dispatch(openLoginModal());
      return;
    }

    if (!reviewData) return;

    try {
      setIsSaving(true);
      // Convert API route items to RouteData format
      const routeData: RouteData[] = reviewData.route.routeItems.map((item) => ({
        id: item.placeId,
        order: item.itemOrder,
        name: item.name,
        description: '', // Add description if needed from your data
      }));

      const response = await saveRoute(reviewData.reviewId, routeData);

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
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!reviewData) return <div>후기를 찾을 수 없습니다.</div>;

  const sortedRouteItems = [...reviewData.route.routeItems].sort(
    (a, b) => a.itemOrder - b.itemOrder,
  );

  return (
    <S.Container>
      <S.BreadcrumbNav>
        후기 {'>'} {reviewData.animationName}
      </S.BreadcrumbNav>

      <S.WhiteContainer>
        <S.HeaderContainer>
          <S.PostTitle>{reviewData.title}</S.PostTitle>
          <S.MetaInfo>
            <S.Avatar>
              <img
                src={reviewData.profileImage?.fileUrl || defaultProfileImage}
                alt={`${reviewData.userName}의 프로필`}
              />
            </S.Avatar>
            <S.UserInfo>
              <S.Username>{reviewData.userName}</S.Username>
              <S.Date>{new Date(reviewData.createdAt).toLocaleDateString()}</S.Date>
            </S.UserInfo>
          </S.MetaInfo>
        </S.HeaderContainer>

        <S.ContentContainer>
          <S.MainContent>
            <S.ReviewContext>{reviewData.content}</S.ReviewContext>
            <S.MapContainer>
              {reviewData.reviewImages.map((image) => (
                <img key={image.id} src={image.fileUrl} alt={image.fileName} />
              ))}
            </S.MapContainer>
          </S.MainContent>

          <S.SideContent>
            <S.SaveRouteButton onClick={handleSaveRoute} disabled={isSaving}>
              {isSaving ? '저장 중...' : '루트 저장하기'}
            </S.SaveRouteButton>
            <S.RouteList>
              {sortedRouteItems.map((route) => (
                <S.RouteItem key={route.placeId}>
                  <S.RouteNumber>{route.itemOrder}</S.RouteNumber>
                  <S.RouteName>{route.name}</S.RouteName>
                </S.RouteItem>
              ))}
            </S.RouteList>
            <S.RouteButtonContainer>
              <S.Button
                onClick={() =>
                  navigate(`/route/${reviewData.route.routeId}`, {
                    state: {
                      routeSource: RouteSource.REVIEW,
                    },
                  })
                }
              >
                루트 지도에서 보기
              </S.Button>
              <S.SupportButton>후기 구매하기</S.SupportButton>
            </S.RouteButtonContainer>
          </S.SideContent>
        </S.ContentContainer>
      </S.WhiteContainer>
    </S.Container>
  );
};

export default ReviewPage5;
