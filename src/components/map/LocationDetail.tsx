import React, { useState, useMemo, useCallback } from 'react';
import * as S from '../../styles/map/LocationDetail.styles';
import { LocationDetail as LocationDetailType } from '../../types/map/route';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { PlaceDetails } from '../../utils/mapUtils';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/reduxHooks';
import { openLoginModal } from '@/store/slices/modalSlice';

interface LocationDetailProps {
  location: LocationDetailType;
  placeDetails?: PlaceDetails;
  onClose?: () => void;
}

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1581790064141-de9de7145e93?q=80&w=1000&auto=format&fit=crop';

const LocationDetail: React.FC<LocationDetailProps> = ({ location, placeDetails, onClose }) => {
  const navigate = useNavigate();
  const allPlaces = [location, ...(location.relatedPlaces || [])];
  const dispatch = useDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageLoadFailed, setImageLoadFailed] = useState(false);
  const currentPlace = allPlaces[currentIndex];

  const handleNextLocation = () => {
    setCurrentIndex((prev) => (prev === allPlaces.length - 1 ? 0 : prev + 1));
  };

  const handleReviewClick = () => {
    navigate('/review3');
  };

  const handleFavClick = () => {
    if (!isLoggedIn) {
      dispatch(openLoginModal());
      return;
    }

    // 로그인된 상태일 때만 좋아요 기능 실행
    setIsFavorited(!isFavorited);
    console.log('Favorited Location Data:', {
      id: currentPlace.id,
      name: currentPlace.name,
      animeName: currentPlace.animeName,
      address: currentPlace.address,
      hashtags: currentPlace.hashtags,
    });
  };

  const imageSource = useMemo(() => {
    if (imageLoadFailed || !placeDetails?.photoUrl) {
      return DEFAULT_IMAGE;
    }
    return placeDetails.photoUrl;
  }, [placeDetails?.photoUrl, imageLoadFailed]);

  const handleImageError = useCallback(() => {
    console.log('Image load failed, switching to default image');
    setImageLoadFailed(true);
  }, []);

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
        alt={currentPlace.name}
        onError={handleImageError}
        key={imageSource}
      />
      {allPlaces.length > 1 && (
        <>
          <S.PaginationButton onClick={handleNextLocation}>
            <img src="/src/assets/next.png" alt="next" />
          </S.PaginationButton>
        </>
      )}
      <S.Title>{placeDetails?.name || currentPlace.name}</S.Title>
      <S.Subtitle>{currentPlace.animeName}</S.Subtitle>
      <S.Address>{placeDetails?.address || currentPlace.address}</S.Address>

      <S.TagContainer>
        {currentPlace.hashtags.map((tag, index) => (
          <S.Tag key={index}>#{tag}</S.Tag>
        ))}
      </S.TagContainer>

      <S.FavButton onClick={handleFavClick}>
        <img src={isFavorited ? '/src/assets/fav2.png' : '/src/assets/fav.png'} alt="favorite" />
      </S.FavButton>

      <S.ReviewButton onClick={handleReviewClick}>명소 후기</S.ReviewButton>
    </S.Container>
  );
};

export default LocationDetail;
