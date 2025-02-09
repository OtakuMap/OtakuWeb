import React, { useState, useMemo, useCallback, useEffect } from 'react';
import * as S from '../../styles/map/LocationDetail.styles';
import { LocationDetail as LocationDetailType, HashTag } from '../../types/map/route';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { PlaceDetails } from '../../utils/mapUtils';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/reduxHooks';
import { openLoginModal } from '@/store/slices/modalSlice';
import { usePlaceLikeDetail } from '@/hooks/map/usePlaceLikeDetail';
import nextIcon from '../../assets/next.png';
import logoRepeat from '../../assets/logorepeat.png';
import favIcon from '../../assets/fav.png';
import favActiveIcon from '../../assets/fav2.png';

interface LocationDetailProps {
  location: LocationDetailType;
  placeDetails?: PlaceDetails;
  onClose?: () => void;
  placeLikeId?: number;
}

// const DEFAULT_IMAGE = logoRepeat;

const LocationDetail: React.FC<LocationDetailProps> = ({
  location,
  placeDetails,
  onClose,
  placeLikeId,
}) => {
  const navigate = useNavigate();
  const allPlaces = [location, ...(location.relatedPlaces || [])];
  const dispatch = useDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageLoadFailed, setImageLoadFailed] = useState(false);
  const [placeDetailsData, setPlaceDetailsData] = useState<PlaceDetails | undefined>(placeDetails);
  const currentPlace = allPlaces[currentIndex];

  // placeLikeDetail hook 사용
  const { placeLikeDetail, isLoading, error, fetchPlaceLikeDetail } = usePlaceLikeDetail();

  const tags = placeLikeDetail?.hashtags || currentPlace.hashtags;
  const MAX_TAGS = 3; // 최대 3개 태그만 표시

  // placeLikeId가 있을 경우 상세 정보 조회
  useEffect(() => {
    if (placeLikeId) {
      fetchPlaceLikeDetail(placeLikeId);
    }
  }, [placeLikeId]);

  useEffect(() => {
    if (placeLikeDetail) {
      setIsFavorited(placeLikeDetail.isFavorite);
    }
  }, [placeLikeDetail]);

  const handleNextLocation = () => {
    setCurrentIndex((prev) => (prev === allPlaces.length - 1 ? 0 : prev + 1));
  };

  const handleReviewClick = () => {
    // placeLikeDetail이 있으면 placeLikeId를, 없으면 location의 id를 사용
    const placeId = placeLikeDetail?.placeLikeId || location.id;
    navigate(`/places/${placeId}/review`);
  };

  const handleFavClick = () => {
    if (!isLoggedIn) {
      dispatch(openLoginModal());
      return;
    }

    // 로그인된 상태일 때만 좋아요 기능 실행
    setIsFavorited(!isFavorited);
  };

  const imageSource = useMemo(() => {
    console.log('PlaceDetails in LocationDetail:', placeDetails);
    console.log('Current photoUrl:', placeDetails?.photoUrl);

    // 1. 이미지 로드 실패한 경우
    if (imageLoadFailed) {
      console.log('Image load failed, using default');
      return logoRepeat;
    }

    // 2. placeDetails가 있고 photoUrl이 있는 경우
    if (placeDetails?.photoUrl) {
      console.log('Using placeDetails photoUrl');
      return placeDetails.photoUrl;
    }

    console.log('No valid photo URL found, using default');
    // 3. 그 외의 경우 기본 이미지 사용
    return logoRepeat;
  }, [placeDetails?.photoUrl, imageLoadFailed]);

  const handleImageError = useCallback(() => {
    console.log('Image load failed, switching to default image');
    setImageLoadFailed(true);
  }, []);

  if (isLoading) {
    return <S.Container>Loading...</S.Container>;
  }

  if (error) {
    return <S.Container>Error: {error.message}</S.Container>;
  }

  // tags 처리 로직 수정
  const getTags = () => {
    if (placeLikeDetail?.hashtags) {
      return placeLikeDetail.hashtags;
    }
    if (currentPlace.hashtags) {
      return currentPlace.hashtags;
    }
    return [];
  };

  const renderTag = (tag: HashTag | string, index: number) => {
    const tagName = typeof tag === 'string' ? tag : tag.name;
    return (
      <S.Tag key={index} data-full-text={`#${tagName}`}>
        #{tagName}
      </S.Tag>
    );
  };

  return (
    <S.Container>
      {onClose && (
        <S.CloseButton onClick={onClose}>
          <X
            size={20}
            color="#FFFFFF"
            style={{ width: '20px', height: '20px' }}
            absoluteStrokeWidth
          />
        </S.CloseButton>
      )}
      <S.LocationImage
        src={imageSource}
        alt={placeLikeDetail ? placeLikeDetail.placeName : currentPlace.name}
        onError={handleImageError}
        key={imageSource}
      />
      {allPlaces.length > 1 && (
        <S.PaginationButton onClick={handleNextLocation}>
          <img src={nextIcon} alt="next" />
        </S.PaginationButton>
      )}
      <S.Title>
        {placeLikeDetail ? placeLikeDetail.placeName : placeDetails?.name || currentPlace.name}
      </S.Title>
      <S.Subtitle>
        {placeLikeDetail ? placeLikeDetail.animationName : currentPlace.animeName}
      </S.Subtitle>
      <S.Address>{placeDetails?.address || currentPlace.address}</S.Address>
      <S.TagContainer>
        {getTags()
          .slice(0, MAX_TAGS)
          .map((tag, index) => renderTag(tag, index))}
      </S.TagContainer>

      <S.FavButton onClick={handleFavClick}>
        <img src={isFavorited ? favActiveIcon : favIcon} alt="favorite" />
      </S.FavButton>

      <S.ReviewButton onClick={handleReviewClick}>명소 후기</S.ReviewButton>
    </S.Container>
  );
};

export default LocationDetail;
