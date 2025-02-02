import React, { useState, useEffect } from 'react';
import { getSavedPlaces } from '../api/like/saved-places';
import type { SavedPlace } from '../types/like/saved-places';
import { deletePlaces } from '../api/like/delete-places';
import spaceIcon from '../assets/space-icon.png'; // 우주 아이콘 경로
import starIcon from '../assets/white-star.png'; // 별표 아이콘
import starFilledIcon from '../assets/star-filled.png'; // 꽉찬 별표 아이콘
import * as S from '../styles/like/places.styles';

const SavedPlaces: React.FC = () => {
  const [places, setPlaces] = useState<SavedPlace[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<number | null>(null);
  const [showOnlyStarred, setShowOnlyStarred] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastId, setLastId] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchSavedPlaces = async () => {
      try {
        setLoading(true);
        const response = await getSavedPlaces({ lastId: 0 });
        if (response.isSuccess) {
          setPlaces(response.result.placeLikes);
          setLastId(response.result.lastId);
          setHasMore(response.result.hasNext);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : '장소 로딩에 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedPlaces();
  }, []);

  const loadMore = async () => {
    if (!hasMore || loading) return;

    try {
      const response = await getSavedPlaces({ lastId });
      if (response.isSuccess) {
        setPlaces((prev) => [...prev, ...response.result.placeLikes]);
        setLastId(response.result.lastId);
        setHasMore(response.result.hasNext);
      }
    } catch (error) {
      console.error('추가 데이터 로딩 실패:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedPlace) {
      alert('삭제할 장소를 선택해주세요.');
      return;
    }

    try {
      // 토큰 확인
      const token = tokenStorage.getAccessToken();
      if (!token) {
        alert('로그인이 필요합니다.');
        window.location.href = '/';
        return;
      }

      const response = await deletePlaces([selectedPlace]);

      if (response.isSuccess) {
        setPlaces(places.filter((place) => place.id !== selectedPlace));
        setSelectedPlace(null);
        alert(response.result);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '장소 삭제에 실패했습니다.';
      alert(errorMessage);

      if (errorMessage.includes('인증이 필요합니다')) {
        window.location.href = '/';
      }
    }
  };

  const toggleStar = (id: number) => {
    setPlaces(
      places.map((place) =>
        place.id === id ? { ...place, isFavorite: !place.isFavorite } : place,
      ),
    );
  };

  const filteredPlaces = showOnlyStarred ? places.filter((place) => place.isFavorite) : places;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <S.Container>
      <S.IconContainer>
        <S.IconImage src={spaceIcon} alt="Space Icon" />
      </S.IconContainer>

      <S.ContentWrapper>
        <S.Title>나의 좋아요</S.Title>

        <S.TabContainer>
          <S.Tab>저장한 루트</S.Tab>
          <S.Tab active>저장한 장소</S.Tab>
          <S.Tab>저장한 이벤트</S.Tab>
        </S.TabContainer>

        <S.RouteListContainer>
          <S.ListHeader>
            <S.ListTitle>저장한 장소 ({filteredPlaces.length})</S.ListTitle>
            <S.HeaderDivider />
            <S.ListActions>
              <button onClick={handleDelete}>선택 삭제</button>
              <span>/</span>
              <button onClick={() => setShowOnlyStarred(!showOnlyStarred)}>
                {showOnlyStarred ? '전체보기' : '즐겨찾기'}
              </button>
            </S.ListActions>
          </S.ListHeader>

          {filteredPlaces.map((place) => (
            <S.RouteItem key={place.id}>
              <S.RouteDetails>
                <S.RadioButton
                  checked={selectedPlace === place.id}
                  onClick={() => setSelectedPlace(place.id)}
                />
                <S.RouteTitle>{place.name}</S.RouteTitle>
                <S.StarIcon
                  src={place.isFavorite ? starFilledIcon : starIcon}
                  alt={place.isFavorite ? 'Starred' : 'Not starred'}
                  onClick={() => toggleStar(place.id)}
                />
              </S.RouteDetails>
              <S.RouteAddress>{place.detail}</S.RouteAddress>
            </S.RouteItem>
          ))}

          {hasMore && (
            <S.LoadMoreButton onClick={loadMore} disabled={loading}>
              더 보기
            </S.LoadMoreButton>
          )}
        </S.RouteListContainer>
      </S.ContentWrapper>
    </S.Container>
  );
};

export default SavedPlaces;
