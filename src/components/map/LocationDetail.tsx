import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
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

const Tag: React.FC<{ tagName: string }> = ({ tagName }) => {
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tagRef.current) {
      const isOverflowed = tagRef.current.scrollWidth > tagRef.current.clientWidth;
      tagRef.current.setAttribute('data-overflow', String(isOverflowed));
    }
  }, [tagName]);

  return (
    <S.Tag ref={tagRef} data-full-text={`#${tagName}`}>
      #{tagName}
    </S.Tag>
  );
};

interface LocationDetailProps {
  location: LocationDetailType;
  placeDetails?: PlaceDetails;
  onClose?: () => void;
  placeLikeId?: number;
}

const LocationDetail: React.FC<LocationDetailProps> = ({
  location,
  placeDetails,
  onClose,
  placeLikeId,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { placeLikeDetail, isLoading, error, fetchPlaceLikeDetail } = usePlaceLikeDetail();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const addressRef = useRef<HTMLDivElement>(null);

  const MAX_TAGS = 3;
  const allPlaces = [location, ...(location.relatedPlaces || [])];
  const currentPlace = allPlaces[currentIndex];

  const displayData = useMemo(
    () => ({
      name: placeLikeDetail?.placeName || placeDetails?.name || currentPlace.name || '',
      animeName: placeLikeDetail?.animationName || currentPlace.animeName || '',
      address: placeDetails?.address || currentPlace.address || '',
      tags: placeLikeDetail?.hashtags || currentPlace.hashtags || [],
    }),
    [placeLikeDetail, placeDetails, currentPlace],
  );

  const imageSource = useMemo(() => {
    console.log('LocationDetail - Current placeDetails:', placeDetails);
    console.log('LocationDetail - Photo URL:', placeDetails?.photoUrl);

    if (imageLoadFailed) {
      console.log('LocationDetail - Image load failed, using fallback image');
      return logoRepeat;
    }
    return placeDetails?.photoUrl || logoRepeat;
  }, [placeDetails, imageLoadFailed]);

  useEffect(() => {
    // mounted 변수 제거하고 cleanup 함수만 사용
    const loadPlaceDetail = async () => {
      if (!placeLikeId) return;

      try {
        await fetchPlaceLikeDetail(placeLikeId);
      } catch (error) {
        console.error('Failed to fetch place detail:', error);
      }
    };

    loadPlaceDetail();

    return () => {
      // cleanup 필요한 경우에만 작성
    };
  }, [placeLikeId, fetchPlaceLikeDetail]);

  useEffect(() => {
    if (placeLikeDetail) {
      setIsFavorited(placeLikeDetail.isFavorite);
    }
  }, [placeLikeDetail]);

  useEffect(() => {
    const checkOverflow = (element: HTMLDivElement | null): boolean => {
      if (!element) return false;
      if (element.classList.contains('address')) {
        return element.scrollHeight > element.clientHeight;
      }
      return element.scrollWidth > element.clientWidth;
    };

    const elements = [{ ref: titleRef }, { ref: subtitleRef }, { ref: addressRef }];

    elements.forEach(({ ref }) => {
      if (ref.current) {
        const isOverflowed = checkOverflow(ref.current);
        ref.current.setAttribute('data-overflow', String(isOverflowed));
      }
    });
  }, [displayData]);

  const handleNextLocation = () => {
    setCurrentIndex((prev) => (prev === allPlaces.length - 1 ? 0 : prev + 1));
  };

  const handleReviewClick = () => {
    const placeId = placeLikeDetail?.placeLikeId || location.id;
    navigate(`/places/${placeId}/review`);
  };

  const handleFavClick = () => {
    if (!isLoggedIn) {
      dispatch(openLoginModal());
      return;
    }
    setIsFavorited(!isFavorited);
  };

  const handleImageError = useCallback(() => {
    console.log('LocationDetail - Image failed to load:', placeDetails?.photoUrl);
    setImageLoadFailed(true);
  }, [placeDetails?.photoUrl]);

  if (isLoading) return <S.Container>Loading...</S.Container>;
  if (error) return <S.Container>Error: {error.message}</S.Container>;

  return (
    <S.Container>
      {onClose && (
        <S.CloseButton onClick={onClose}>
          <X size={20} color="#FFFFFF" absoluteStrokeWidth />
        </S.CloseButton>
      )}

      <S.LocationImage
        src={imageSource}
        alt={displayData.name}
        onError={handleImageError}
        key={imageSource}
      />

      {allPlaces.length > 1 && (
        <S.PaginationButton onClick={handleNextLocation}>
          <img src={nextIcon} alt="next" />
        </S.PaginationButton>
      )}

      <S.Title ref={titleRef} title={displayData.name}>
        {displayData.name}
      </S.Title>

      <S.Subtitle ref={subtitleRef} title={displayData.animeName}>
        {displayData.animeName}
      </S.Subtitle>

      <S.Address ref={addressRef} title={displayData.address} className="address">
        {displayData.address}
      </S.Address>

      <S.TagContainer>
        {displayData.tags.slice(0, MAX_TAGS).map((tag, index) => {
          const tagName = typeof tag === 'string' ? tag : tag.name;
          return <Tag key={index} tagName={tagName} />;
        })}
      </S.TagContainer>

      <S.FavButton onClick={handleFavClick}>
        <img src={isFavorited ? favActiveIcon : favIcon} alt="favorite" />
      </S.FavButton>

      <S.ReviewButton onClick={handleReviewClick}>명소 후기</S.ReviewButton>
    </S.Container>
  );
};

export default LocationDetail;
