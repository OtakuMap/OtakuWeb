import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import * as S from '../../styles/map/LocationDetail.styles';
import { RouteLocation, HashTag } from '@/types/map/route';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { PlaceDetails } from '../../utils/mapUtils';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useLike } from '@/hooks/map/useLike';
import { openLoginModal } from '@/store/slices/modalSlice';
import type { UseLikeProps } from '@/hooks/map/useLike';
import nextIcon from '../../assets/next.png';
import logoRepeat from '../../assets/logorepeat.png';
import favIcon from '../../assets/fav.png';
import favActiveIcon from '../../assets/fav2.png';

interface LocationItem {
  id: string;
  name: string;
  animeName?: string;
  type: 'place' | 'event';
  data: {
    placeId?: number;
    eventId?: number;
    name: string;
    latitude: number;
    longitude: number;
    animeName?: string;
    animationTitle?: string;
    isLiked: boolean;
    hashTags: HashTag[];
    selectedAnimation?: {
      animationId: number;
      animationName: string;
      isLiked: boolean;
      hashTags: HashTag[];
    };
  };
}

interface RouteDetailResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  isFavorite: boolean;
  isLiked: boolean;
  animationName: string;
  hashtags: HashTag[];
  // animationListDTO는 선택적으로 만들거나 제거
  animationListDTO?: {
    placeAnimations: Array<{
      placeAnimationId: number;
      animationId: number;
      animationName: string;
    }>;
    listSize: number;
  };
}

const Tag: React.FC<{ tag: { hashTagId?: number; name: string } | string }> = ({ tag }) => {
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
  isEvent?: boolean;
  eventId?: number;
  initialIsLiked?: boolean;
  routeAnimationId?: number;
  locationItems?: LocationItem[];
}

const LocationDetail: React.FC<LocationDetailProps> = ({
  location,
  locationItems: initialLocationItems,
  placeDetails,
  onClose,
  routeDetail,
  isLoading: isDetailLoading,
  originalName,
  isEvent,
  eventId,
  initialIsLiked = false,
  routeAnimationId,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const [currentIndex, setCurrentIndex] = useState(0); // 초기값은 0으로 설정

  const [localLocationItems, setLocalLocationItems] = useState<LocationItem[] | undefined>(
    initialLocationItems,
  );

  const [itemLikes, setItemLikes] = useState<Record<string, boolean>>({});
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  useEffect(() => {
    if (initialLocationItems) {
      // 선택된 아이템의 ID 찾기
      const targetId = isEvent ? `event-${location.id}` : `place-${location.id}`;

      // 먼저 선택된 아이템의 인덱스 찾기
      const selectedIndex = initialLocationItems.findIndex((item) => item.id === targetId);

      // 선택된 아이템이 첫번째로 오도록 재정렬
      const reorderedItems = [
        ...initialLocationItems.slice(selectedIndex, selectedIndex + 1),
        ...initialLocationItems.slice(0, selectedIndex),
        ...initialLocationItems.slice(selectedIndex + 1),
      ];

      setLocalLocationItems(reorderedItems);
      setCurrentIndex(0); // 항상 0번 인덱스가 선택된 아이템

      const initialLikes: Record<string, boolean> = {};
      reorderedItems.forEach((item) => {
        initialLikes[item.id] = item.data.isLiked;
      });
      setItemLikes(initialLikes);
    }
  }, [initialLocationItems, location.id, isEvent]);

  // useEffect(() => {
  //   console.log('Received locationItems:', initialLocationItems);
  //   if (initialLocationItems) {
  //     setLocalLocationItems(initialLocationItems);
  //     console.log('Setting localLocationItems:', initialLocationItems);
  //     const initialLikes: Record<string, boolean> = {};
  //     initialLocationItems.forEach((item) => {
  //       initialLikes[item.id] = item.data.isLiked;
  //     });
  //     setItemLikes(initialLikes);
  //   }
  // }, [initialLocationItems]);

  const currentItem = useMemo(() => {
    if (localLocationItems && localLocationItems.length > 0) {
      return localLocationItems[currentIndex];
    }
    return null;
  }, [localLocationItems, currentIndex]);

  const isCurrentEvent = useMemo(() => {
    if (currentItem) {
      return currentItem.type === 'event';
    }
    return isEvent;
  }, [currentItem, isEvent]);

  const likeProps: UseLikeProps = useMemo(() => {
    if (localLocationItems && localLocationItems.length > 0 && currentItem) {
      if (currentItem.type === 'event') {
        const eventId = currentItem.data.eventId;
        return {
          initialIsLiked: currentItem.data.isLiked,
          id: eventId || 0,
          type: 'event' as const,
        };
      } else {
        return {
          initialIsLiked: currentItem.data.isLiked,
          id: currentItem.data.placeId || 0,
          type: 'place' as const,
          animationId: currentItem.data.selectedAnimation?.animationId,
        };
      }
    }

    return {
      initialIsLiked: routeDetail?.isLiked ?? initialIsLiked,
      id: isEvent ? (eventId as number) : location.id,
      type: isEvent ? 'event' : 'place',
      animationId: !isEvent ? routeAnimationId : undefined,
    };
  }, [
    currentItem,
    localLocationItems,
    routeDetail?.isLiked,
    initialIsLiked,
    isEvent,
    eventId,
    location.id,
    routeAnimationId,
  ]);

  const { isLiked, toggleLike } = useLike(likeProps);

  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const addressRef = useRef<HTMLDivElement>(null);

  const MAX_TAGS = 3;
  const allPlaces = useMemo(() => {
    console.log('Calculating allPlaces:', {
      localLocationItems,
      length: localLocationItems?.length,
      location,
    });
    if (localLocationItems && localLocationItems.length > 0) {
      return localLocationItems;
    }
    return [location];
  }, [location, localLocationItems]);

  const displayData = useMemo(() => {
    if (localLocationItems && localLocationItems.length > 0) {
      const item = localLocationItems[currentIndex];
      console.log('Current item data:', item);
      console.log('Hashtags from item:', item.data.hashTags);
      console.log('Selected animation:', item.data.selectedAnimation);

      return {
        name: item.name,
        animeName: item.type === 'event' ? item.data.animationTitle : item.data.animeName,
        address: placeDetails?.address || '',
        tags:
          item.type === 'place'
            ? item.data.selectedAnimation?.hashTags || []
            : item.data.hashTags || [],
      };
    }

    return {
      name: originalName || routeDetail?.name || location?.name || '',
      animeName:
        routeDetail?.animationName ||
        routeDetail?.animationListDTO?.placeAnimations[0]?.animationName ||
        location?.animeName ||
        '',
      address: placeDetails?.address || '',
      tags: (routeDetail?.hashtags || location?.hashtags || []).map((tag) =>
        typeof tag === 'string' ? tag : tag.name,
      ),
    };
  }, [routeDetail, location, originalName, placeDetails, localLocationItems, currentIndex]);

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
    if (currentItem) {
      if (currentItem.type === 'event') {
        navigate(`/event/${currentItem.data.eventId}`);
      } else {
        navigate(`/places/${currentItem.data.placeId}/review`);
      }
      return;
    }

    if (isEvent && eventId) {
      navigate(`/event/${eventId}`);
    } else {
      navigate(`/places/${location.id}/review`);
    }
  };

  const handleFavClick = async () => {
    if (!isLoggedIn) {
      dispatch(openLoginModal());
      return;
    }

    try {
      await toggleLike();

      if (localLocationItems && localLocationItems.length > 0 && currentItem) {
        setLocalLocationItems((prevItems) => {
          if (!prevItems) return prevItems;
          const newItems = [...prevItems];
          newItems[currentIndex] = {
            ...newItems[currentIndex],
            data: {
              ...newItems[currentIndex].data,
              isLiked: !newItems[currentIndex].data.isLiked,
            },
          };
          return newItems;
        });

        setItemLikes((prev) => ({
          ...prev,
          [currentItem.id]: !prev[currentItem.id],
        }));
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
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
        {displayData.tags.slice(0, MAX_TAGS).map((tag) => (
          <Tag key={typeof tag === 'string' ? tag : tag.hashTagId} tag={tag} />
        ))}
      </S.TagContainer>
      <S.FavButton onClick={handleFavClick}>
        <img
          src={
            currentItem
              ? itemLikes[currentItem.id]
                ? favActiveIcon
                : favIcon
              : isLiked
                ? favActiveIcon
                : favIcon
          }
          alt="favorite"
        />
      </S.FavButton>
      <S.ReviewButton onClick={handleReviewClick}>
        {isCurrentEvent ? '이벤트 후기' : '명소 후기'}
      </S.ReviewButton>
    </S.Container>
  );
};

export default LocationDetail;
