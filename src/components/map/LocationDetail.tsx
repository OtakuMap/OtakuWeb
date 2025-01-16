import React from 'react';
import * as S from '../../styles/map/LocationDetail.styles';
import { LocationDetail as LocationDetailType } from '../../types/map/route';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

interface LocationDetailProps {
  location: LocationDetailType;
  onClose?: () => void;
}
console.log('Lucide X component:', X);

const LocationDetail: React.FC<LocationDetailProps> = ({ location, onClose }) => {
  const navigate = useNavigate();

  const handleReviewClick = () => {
    navigate('/review3'); // review3 페이지로 이동
  };

  const handleFavClick = () => {
    // 좋아요 기능 구현
    console.log('Favorite clicked');
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
      <S.LocationImage src={`/src/assets/locations/${location.id}.jpg`} alt={location.name} />
      <S.Title>{location.name}</S.Title>
      <S.Subtitle>{location.animeName}</S.Subtitle>
      <S.Address>{location.address}</S.Address>

      <S.TagContainer>
        {location.hashtags.map((tag, index) => (
          <S.Tag key={index}>#{tag}</S.Tag>
        ))}
      </S.TagContainer>

      <S.FavButton onClick={handleFavClick}>
        <img src="/src/assets/fav.png" alt="favorite" />
      </S.FavButton>

      <S.ReviewButton onClick={handleReviewClick}>명소 후기</S.ReviewButton>
    </S.Container>
  );
};

export default LocationDetail;
