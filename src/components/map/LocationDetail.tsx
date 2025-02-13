import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import * as S from '../../styles/map/LocationDetail.styles';
import { RouteLocation, HashTag } from '@/types/map/route';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { PlaceDetails } from '../../utils/mapUtils';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/reduxHooks';
import { openLoginModal } from '@/store/slices/modalSlice';
import nextIcon from '../../assets/next.png';
import logoRepeat from '../../assets/logorepeat.png';
import favIcon from '../../assets/fav.png';
import favActiveIcon from '../../assets/fav2.png';

interface RouteDetailResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  isFavorite: boolean;
  isLiked: boolean;
  animationListDTO: {
    placeAnimations: Array<{
      placeAnimationId: number;
      animationId: number;
      animationName: string;
    }>;
    listSize: number;
  };
  hashtags: HashTag[];
}

const Tag: React.FC<{ tag: string | HashTag }> = ({ tag }) => {
  const tagRef = useRef<HTMLDivElement>(null);
  const tagText = typeof tag === 'string' ? tag : tag.name;

  useEffect(() => {
    if (tagRef.current) {
      const isOverflowed = tagRef.current.scrollWidth > tagRef.current.clientWidth;
      tagRef.current.setAttribute('data-overflow', String(isOverflowed));
    }
  }, [tagText]);

  return (
    <S.Tag ref={tagRef} data-full-text={`#${tagText}`}>
      #{tagText}
    </S.Tag>
  );
};

interface LocationDetailProps {
  location: RouteLocation;
  placeDetails?: PlaceDetails;
  onClose?: () => void;
  routeDetail?: RouteDetailResult | null;
  isLoading?: boolean;
  originalName?: string;
}

const LocationDetail: React.FC<LocationDetailProps> = ({
  location,
  placeDetails,
  onClose,
  routeDetail,
  isLoading: isDetailLoading,
  originalName,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(routeDetail?.isFavorite || false);
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const addressRef = useRef<HTMLDivElement>(null);

  const MAX_TAGS = 3;
  const allPlaces = [location];

  const displayData = useMemo(
    () => ({
      name: originalName || routeDetail?.name || location.name || '', // originalName 우선 사용
      animeName:
        routeDetail?.animationListDTO?.placeAnimations[0]?.animationName ||
        location.animeName ||
        '',
      address: placeDetails?.address || '',
      tags: routeDetail?.hashtags || location.hashtags || [],
    }),
    [routeDetail, location, originalName], // originalName 의존성 추가
  );

  const imageSource = useMemo(() => {
    if (imageLoadFailed) {
      return logoRepeat;
    }
    return placeDetails?.photoUrl || logoRepeat;
  }, [placeDetails, imageLoadFailed]);

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
    navigate(`/places/${location.id}/review`);
  };

  const handleFavClick = () => {
    if (!isLoggedIn) {
      dispatch(openLoginModal());
      return;
    }
    setIsFavorited(!isFavorited);
  };

  const handleImageError = useCallback(() => {
    setImageLoadFailed(true);
  }, []);

  if (isDetailLoading) return <S.Container>Loading...</S.Container>;

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
        {displayData.tags.slice(0, MAX_TAGS).map((tag, index) => (
          <Tag key={typeof tag === 'string' ? tag : tag.hashTagId} tag={tag} />
        ))}
      </S.TagContainer>

      <S.FavButton onClick={handleFavClick}>
        <img src={isFavorited ? favActiveIcon : favIcon} alt="favorite" />
      </S.FavButton>

      <S.ReviewButton onClick={handleReviewClick}>명소 후기</S.ReviewButton>
    </S.Container>
  );
};

export default LocationDetail;
