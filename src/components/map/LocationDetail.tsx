import React, { useState, useMemo, useCallback } from 'react';
import * as S from '../../styles/map/LocationDetail.styles';
import { LocationDetail as LocationDetailType } from '../../types/map/route';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { PlaceDetails } from '../../utils/mapUtils';

// interface LocationDetailProps {
//   location: LocationDetailType;
//   onClose?: () => void;
// }
interface LocationDetailProps {
  location: LocationDetailType;
  placeDetails?: PlaceDetails;
  onClose?: () => void;
}

const LocationDetail: React.FC<LocationDetailProps> = ({ location, placeDetails, onClose }) => {
  const navigate = useNavigate();
  // 현재 장소와 관련 장소들을 하나의 배열로 합침
  const allPlaces = [location, ...(location.relatedPlaces || [])];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageLoadFailed, setImageLoadFailed] = useState(false);
  const currentPlace = allPlaces[currentIndex];

  // Street View 이미지 URL을 생성하는 함수
  const getStreetViewUrl = (lat: number, lng: number) => {
    return `/api/streetview?latitude=${lat}&longitude=${lng}`; // 프록시를 통해 요청
  };

  const handleNextLocation = () => {
    setCurrentIndex((prev) => (prev === allPlaces.length - 1 ? 0 : prev + 1));
  };

  const handleReviewClick = () => {
    navigate('/review3'); // review3 페이지로 이동
  };

  const handleFavClick = () => {
    setIsFavorited(!isFavorited);
    // Log the current location data
    console.log('Favorited Location Data:', {
      id: currentPlace.id,
      name: currentPlace.name,
      animeName: currentPlace.animeName,
      address: currentPlace.address,
      hashtags: currentPlace.hashtags,
    });
  };

  const imageSource = useMemo(() => {
    if (imageLoadFailed) {
      return getStreetViewUrl(currentPlace.latitude, currentPlace.longitude);
    }
    if (placeDetails?.photoUrl) {
      return placeDetails.photoUrl;
    }
    return getStreetViewUrl(currentPlace.latitude, currentPlace.longitude);
  }, [placeDetails?.photoUrl, currentPlace, imageLoadFailed]);

  const handleImageError = useCallback(() => {
    console.log('Image load failed, switching to Street View');
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
        key={imageSource} // URL이 변경될 때 이미지를 강제로 다시 로드
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
