export interface Animation {
  animationId: number;
  name: string;
}

export interface Hashtag {
  hashTagId: number;
  name: string;
}

export interface PlaceMapDetail {
  placeLikeId: number;
  placeId: number;
  placeName: string;
  animation: Animation;
  lat: number;
  lng: number;
  isLiked: boolean;
  hashtags: Hashtag[];
}

export interface PlaceMapResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: PlaceMapDetail;
}
