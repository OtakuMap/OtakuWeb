import React, { useState } from 'react';
import * as S from '../../styles/map/LocationDetail.styles';
import { LocationDetail as LocationDetailType } from '../../types/map/route';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

interface LocationDetailProps {
  location: LocationDetailType;
  onClose?: () => void;
}

const LocationDetail: React.FC<LocationDetailProps> = ({ location, onClose }) => {
  const navigate = useNavigate();
  // 현재 장소와 관련 장소들을 하나의 배열로 합침
  const allPlaces = [location, ...(location.relatedPlaces || [])];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const currentPlace = allPlaces[currentIndex];

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

  return (
    <S.Container>
      {onClose && (
        <S.CloseButton onClick={onClose}>
          <X
            size={20} // 32에서 20으로 줄임
            color="#FFFFFF"
            style={{ width: '20px', height: '20px' }} // 32px에서 20px로 줄임
            absoluteStrokeWidth
          />
        </S.CloseButton>
      )}
      <S.LocationImage
        src={`/src/assets/locations/${currentPlace.id}.jpg`}
        alt={currentPlace.name}
      />
      {allPlaces.length > 1 && (
        <>
          <S.PaginationButton onClick={handleNextLocation}>
            <img src="/src/assets/next.png" alt="next" />
          </S.PaginationButton>
        </>
      )}
      <S.Title>{currentPlace.name}</S.Title>
      <S.Subtitle>{currentPlace.animeName}</S.Subtitle>
      <S.Address>{currentPlace.address}</S.Address>

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
