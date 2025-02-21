import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSavedPlaces } from '../api/like/saved-places';
import type { SavedPlace } from '../types/like/saved-places';
import { deletePlaces } from '../api/like/delete-places';
import { togglePlaceFavorite } from '../api/like/favorite-places';
import { getPlaceMapDetail } from '../api/like/place-map';
import spaceIcon from '../assets/space-icon.png';
import starIcon from '../assets/white-star.png';
import starFilledIcon from '../assets/star-filled.png';
import { tokenStorage } from '../utils/token';
import * as S from '../styles/like/places.styles';

const SavedPlaces: React.FC = () => {
  const navigate = useNavigate();
  const [places, setPlaces] = useState<SavedPlace[]>([]);
  const [selectedPlaces, setSelectedPlaces] = useState<number[]>([]);
  const [showOnlyStarred, setShowOnlyStarred] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastId, setLastId] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchSavedPlaces = async () => {
      try {
        setLoading(true);
        const response = await getSavedPlaces({ lastId: 0, isFavorite: showOnlyStarred });
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
  }, [showOnlyStarred]);

  const loadMore = async () => {
    if (!hasMore || loading || isDeleting) return;

    try {
      const response = await getSavedPlaces({
        lastId,
        isFavorite: showOnlyStarred,
      });

      if (response.isSuccess) {
        setPlaces((prev) => [...prev, ...response.result.placeLikes]);
        setLastId(response.result.lastId);
        setHasMore(response.result.hasNext);
      }
    } catch (error) {
      console.error('추가 데이터 로딩 실패:', error);
    }
  };

  const handleSelect = (id: number) => {
    setSelectedPlaces((prev) =>
      prev.includes(id) ? prev.filter((placeId) => placeId !== id) : [...prev, id],
    );
  };

  const handleDelete = async () => {
    if (selectedPlaces.length === 0) {
      alert('삭제할 장소를 선택해주세요.');
      return;
    }

    if (isDeleting) return;

    try {
      const token = tokenStorage.getAccessToken();
      if (!token) {
        alert('로그인이 필요합니다.');
        window.location.href = '/';
        return;
      }

      setIsDeleting(true);
      const response = await deletePlaces(selectedPlaces);

      if (response.isSuccess) {
        setPlaces((prev) => prev.filter((place) => !selectedPlaces.includes(place.id)));
        setSelectedPlaces([]);
        alert(response.result || '선택한 장소가 삭제되었습니다.');
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '장소 삭제에 실패했습니다.';
      alert(errorMessage);

      if (errorMessage.includes('인증이 필요합니다')) {
        window.location.href = '/';
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleStar = async (id: number, currentFavorite: boolean) => {
    if (isTogglingFavorite === id) return;

    try {
      setIsTogglingFavorite(id);
      const response = await togglePlaceFavorite(id, !currentFavorite);

      if (response.isSuccess) {
        setPlaces(
          places.map((place) =>
            place.id === id ? { ...place, isFavorite: !place.isFavorite } : place,
          ),
        );

        if (showOnlyStarred && currentFavorite) {
          setPlaces((prevPlaces) => prevPlaces.filter((place) => place.id !== id));
        }
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      alert('즐겨찾기 상태 변경에 실패했습니다.');
    } finally {
      setIsTogglingFavorite(null);
    }
  };

  const handleViewMap = async (placeLikeId: number) => {
    try {
      const response = await getPlaceMapDetail(placeLikeId);
      if (response.isSuccess) {
        navigate(`/map`, {
          state: {
            placeName: response.result.placeName,
            lat: response.result.lat,
            lng: response.result.lng,
            animation: response.result.animation,
            hashtags: response.result.hashtags,
          },
        });
      }
    } catch (error) {
      console.error('Failed to fetch place details:', error);
      alert('장소 정보를 불러오는데 실패했습니다.');
    }
  };

  const handleNavigateToRouteManagement = () => {
    navigate('/route-management');
  };

  const handleNavigateToSavedEvents = () => {
    navigate('/saved-events');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <S.Container>
      <S.Divider />
      <S.IconContainer>
        <S.IconImage src={spaceIcon} alt="Space Icon" />
      </S.IconContainer>

      <S.ContentWrapper>
        <S.Title>나의 좋아요</S.Title>

        <S.TabContainer>
          <S.Tab onClick={handleNavigateToRouteManagement}>저장한 루트</S.Tab>
          <S.Tab active>저장한 장소</S.Tab>
          <S.Tab onClick={handleNavigateToSavedEvents}>저장한 이벤트</S.Tab>
        </S.TabContainer>

        <S.RouteListContainer>
          <S.ListHeader>
            <S.ListTitle>저장한 장소 ({places.length})</S.ListTitle>
            <S.HeaderDivider />
            <S.ListActions>
              <button
                onClick={handleDelete}
                style={{
                  color: selectedPlaces.length > 0 ? '#7B66FF' : 'inherit',
                  cursor: selectedPlaces.length > 0 ? 'pointer' : 'default',
                  opacity: isDeleting ? 0.5 : 1,
                }}
                disabled={isDeleting}
              >
                {isDeleting ? '삭제중...' : '선택 삭제'}
              </button>
              <span>/</span>
              <button
                onClick={() => {
                  setShowOnlyStarred(!showOnlyStarred);
                  setSelectedPlaces([]);
                }}
                style={{
                  color: showOnlyStarred ? '#7B66FF' : 'inherit',
                }}
              >
                {showOnlyStarred ? '전체보기' : '즐겨찾기'}
              </button>
            </S.ListActions>
          </S.ListHeader>

          {places.map((place) => (
            <S.RouteItem key={place.id}>
              <S.RouteDetails>
                <S.RadioButton
                  checked={selectedPlaces.includes(place.id)}
                  onClick={() => handleSelect(place.id)}
                />
                <S.RouteTitle>{place.name}</S.RouteTitle>
                <S.StarIcon
                  src={place.isFavorite ? starFilledIcon : starIcon}
                  alt={place.isFavorite ? 'Starred' : 'Not starred'}
                  onClick={() => toggleStar(place.id, place.isFavorite)}
                  style={{
                    opacity: isTogglingFavorite === place.id ? 0.5 : 1,
                    cursor: isTogglingFavorite === place.id ? 'default' : 'pointer',
                  }}
                />
              </S.RouteDetails>
              <S.RouteAddress>{place.detail}</S.RouteAddress>
              <S.RouteFooter>
                <S.ViewMapButton onClick={() => handleViewMap(place.id)}>지도 보기</S.ViewMapButton>
              </S.RouteFooter>
            </S.RouteItem>
          ))}

          {hasMore && (
            <S.LoadMoreButton onClick={loadMore} disabled={loading || isDeleting}>
              더 보기
            </S.LoadMoreButton>
          )}
        </S.RouteListContainer>
      </S.ContentWrapper>
    </S.Container>
  );
};

export default SavedPlaces;
