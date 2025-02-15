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

// 장소와 이벤트의 공통 인터페이스는 RouteLocation을 확장
interface BaseLocationData extends RouteLocation {
  address?: string;
  isLiked?: boolean;
}

interface PlaceLocationData extends BaseLocationData {
  type: 'place';
  isFavorite: boolean;
  animationListDTO?: {
    placeAnimations: Array<{
      placeAnimationId: number;
      animationId: number;
      animationName: string;
    }>;
    listSize: number;
  };
}

interface EventLocationData extends BaseLocationData {
  type: 'event';
  animationTitle: string;
}

type LocationEventData = PlaceLocationData | EventLocationData;

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

interface LocationEventDetailProps {
  data: LocationEventData;
  placeDetails?: PlaceDetails;
  onClose?: () => void;
  isLoading?: boolean;
  originalName?: string;
}

const LocationEventDetail: React.FC<LocationEventDetailProps> = ({
  data,
  placeDetails,
  onClose,
  isLoading,
  originalName,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const [isFavorited, setIsFavorited] = useState(data.type === 'place' ? data.isFavorite : false);
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const addressRef = useRef<HTMLDivElement>(null);

  const MAX_TAGS = 3;

  const displayData = useMemo(
    () => ({
      name: originalName || data.name,
      animeName: data.type === 'place' ? data.animeName : data.animationTitle,
      address: data.address || placeDetails?.address || '',
      tags: data.hashtags || [],
    }),
    [data, originalName, placeDetails],
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

  const handleActionClick = () => {
    if (data.type === 'place') {
      navigate(`/places/${data.id}/review`);
    } else {
      navigate(`/events/${data.id}/details`);
    }
  };

  const handleFavClick = () => {
    if (!isLoggedIn) {
      dispatch(openLoginModal());
      return;
    }
    if (data.type === 'place') {
      setIsFavorited(!isFavorited);
      // Add API call for favorite toggle
    }
  };

  const handleImageError = useCallback(() => {
    setImageLoadFailed(true);
  }, []);

  if (isLoading) return <S.Container>Loading...</S.Container>;

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

      {data.type === 'place' && (
        <S.FavButton onClick={handleFavClick}>
          <img src={isFavorited ? favActiveIcon : favIcon} alt="favorite" />
        </S.FavButton>
      )}

      <S.ReviewButton onClick={handleActionClick}>
        {data.type === 'place' ? '명소 후기' : '이벤트 상세'}
      </S.ReviewButton>
    </S.Container>
  );
};

export default LocationEventDetail;
