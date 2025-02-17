export interface HashTag {
  hashTagId: number;
  name: string;
}

export interface PlaceLikeDetail {
  placeLikeId: number;
  placeId: number;
  placeName: string;
  animationName: string;
  lat: number;
  lng: number;
  isFavorite: boolean;
  isLiked: boolean;
  hashtags: HashTag[];
}

export interface PlaceLikeDetailResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: PlaceLikeDetail;
}
